#!/usr/bin/env node
/**
 * figma-assets.mjs — Extrae assets de Figma vía REST API y los deja listos para el repo.
 *
 * Requisitos:
 *   - Node 18+ (usa fetch global). En el proyecto usamos Node 22.
 *   - Token personal de Figma en `figma-token.txt` (gitignored) o en la env FIGMA_TOKEN.
 *   - devDeps: sharp (WebP) y svgo (optimizar SVG).  ->  npm i -D sharp svgo
 *
 * Uso:
 *   node scripts/figma-assets.mjs <nodeId> [opciones]
 *
 * Opciones:
 *   --file=<fileKey>     Clave del fichero Figma. Default: FIGMA_FILE_KEY o el del proyecto.
 *   --mode=render|fill   render = exporta el NODO (svg/png). fill = baja las imágenes
 *                        RASTER originales (fills) del subárbol, sin recomprimir. Default: render.
 *   --format=svg|png|jpg|pdf   Formato de export en modo render. Default: svg.
 *   --scale=<n>          Escala del render raster (1-4). Default: 2. (Ignorado en svg.)
 *   --out=<dir>          Carpeta destino. Default según formato:
 *                          svg -> src/assets/icons | png/jpg/fill -> src/assets/images
 *   --name=<base>        Nombre base del fichero (sin extensión). Default: el nodeId.
 *   --webp               En modo render png/jpg o modo fill: convierte a WebP (recomendado para fotos).
 *   --no-optimize        No pasar SVGO a los SVG.
 *   --quality=<n>        Calidad WebP 1-100. Default: 82.
 *
 * Ejemplos:
 *   # Icono vectorial -> SVG optimizado en src/assets/icons
 *   node scripts/figma-assets.mjs 49026:6525 --format=svg --name=ArrowRight
 *
 *   # Ilustración del footer (fill raster) -> WebP en src/assets/illustrations
 *   node scripts/figma-assets.mjs 58182:4402 --mode=fill --webp \
 *        --out=src/assets/illustrations --name=footer-illustration
 *
 * Notas de rate limit (Nov 2025): el endpoint GET images es Tier 1. Con asiento Full en plan
 * Pro/Org/Enterprise son 10-20/min; en Starter (View/Collab) solo ~6/mes. Para uso intensivo,
 * el fichero debe vivir en un team de pago. El script respeta Retry-After ante 429.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://api.figma.com/v1';
const DEFAULT_FILE_KEY = 'xtL6cbqN94yw7pAlr8k1NK'; // Joselito-Library

// ---------- args ----------
const argv = process.argv.slice(2);
const nodeIdArg = argv.find((a) => !a.startsWith('--'));
const flags = Object.fromEntries(
  argv.filter((a) => a.startsWith('--')).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v === undefined ? true : v];
  })
);

if (!nodeIdArg) {
  console.error('Falta el nodeId. Uso: node scripts/figma-assets.mjs <nodeId> [--opciones]');
  process.exit(1);
}
const nodeId = nodeIdArg.replace('-', ':');
const fileKey = flags.file || process.env.FIGMA_FILE_KEY || DEFAULT_FILE_KEY;
const mode = flags.mode || 'render';
const format = (flags.format || 'svg').toLowerCase();
const scale = Number(flags.scale || 2);
const toWebp = Boolean(flags.webp);
const optimizeSvg = flags.optimize !== false && flags['no-optimize'] !== true;
const quality = Number(flags.quality || 82);
const baseName = (flags.name || nodeId.replace(':', '-')).toString();

const outDir = path.resolve(
  ROOT,
  flags.out ||
    (mode === 'fill' || ['png', 'jpg', 'jpeg'].includes(format)
      ? 'src/assets/images'
      : 'src/assets/icons')
);

// ---------- token ----------
async function getToken() {
  if (process.env.FIGMA_TOKEN) return process.env.FIGMA_TOKEN.trim();
  try {
    return (await fs.readFile(path.join(ROOT, 'figma-token.txt'), 'utf8')).trim();
  } catch {
    console.error(
      'No hay token. Crea figma-token.txt (gitignored) con tu token personal de Figma ' +
        'o exporta FIGMA_TOKEN.'
    );
    process.exit(1);
  }
}

// ---------- fetch con manejo de 429 ----------
async function figmaFetch(url, token, { asBuffer = false } = {}) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
    if (res.status === 429) {
      const wait = Number(res.headers.get('retry-after')) || 5;
      console.warn(`Rate-limited (429). Reintentando en ${wait}s…`);
      await new Promise((r) => setTimeout(r, wait * 1000));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} — ${url}`);
    return asBuffer ? Buffer.from(await res.arrayBuffer()) : res.json();
  }
  throw new Error('Agotados los reintentos por rate limit (429).');
}

// descarga una URL cualquiera (S3 de Figma) a Buffer
async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} descargando ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// ---------- optimizadores (import perezoso para no exigirlos si no se usan) ----------
async function optimize(buf, ext) {
  if (ext === 'svg' && optimizeSvg) {
    const { optimize: svgo } = await import('svgo');
    // SVGO 4: preset-default ya conserva el viewBox por defecto.
    const { data } = svgo(buf.toString('utf8'), {
      multipass: true,
      plugins: ['preset-default', 'removeDimensions'],
    });
    return Buffer.from(data, 'utf8');
  }
  if (toWebp && ['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
    const sharp = (await import('sharp')).default;
    return sharp(buf).webp({ quality }).toBuffer();
  }
  return buf;
}

async function save(buf, ext) {
  await fs.mkdir(outDir, { recursive: true });
  const finalExt = toWebp && ['png', 'jpg', 'jpeg', 'gif'].includes(ext) ? 'webp' : ext;
  const out = path.join(outDir, `${baseName}.${finalExt}`);
  const final = await optimize(buf, ext);
  await fs.writeFile(out, final);
  const rel = path.relative(ROOT, out);
  console.log(`✓ ${rel}  (${(final.length / 1024).toFixed(1)} KB)`);
  return out;
}

// ---------- modos ----------
async function runRender(token) {
  const url = `${API}/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=${format}${
    format === 'svg' ? '' : `&scale=${scale}`
  }`;
  const data = await figmaFetch(url, token);
  const assetUrl = data.images?.[nodeId];
  if (!assetUrl) throw new Error(`Figma no devolvió render para ${nodeId} (¿nodo sin contenido renderizable?).`);
  const buf = await downloadBuffer(assetUrl);
  await save(buf, format === 'jpeg' ? 'jpg' : format);
}

async function runFill(token) {
  // 1) estructura del nodo para localizar imageRef en los fills
  const nodesData = await figmaFetch(
    `${API}/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`,
    token
  );
  const refs = new Set();
  const walk = (n) => {
    for (const f of n.fills || []) if (f.type === 'IMAGE' && f.imageRef) refs.add(f.imageRef);
    for (const c of n.children || []) walk(c);
  };
  const doc = nodesData.nodes?.[nodeId]?.document;
  if (!doc) throw new Error(`Nodo ${nodeId} no encontrado.`);
  walk(doc);
  if (refs.size === 0) {
    console.warn('No hay image fills en el subárbol. ¿Es un vector? Prueba --mode=render --format=svg.');
    return;
  }
  // 2) mapa imageRef -> URL del ORIGINAL subido
  const fillsMap = (await figmaFetch(`${API}/files/${fileKey}/images`, token)).meta?.images || {};
  let i = 0;
  for (const ref of refs) {
    const url = fillsMap[ref];
    if (!url) {
      console.warn(`Sin URL para imageRef ${ref}`);
      continue;
    }
    const buf = await downloadBuffer(url);
    // deducir extensión por magic bytes
    let ext = 'png';
    if (buf.slice(0, 3).toString('hex') === 'ffd8ff') ext = 'jpg';
    else if (buf[0] === 0x89 && buf.slice(1, 4).toString('ascii') === 'PNG') ext = 'png';
    else if (buf.slice(0, 4).toString('ascii') === 'RIFF' && buf.slice(8, 12).toString('ascii') === 'WEBP') ext = 'webp';
    else if (buf.slice(0, 3).toString('ascii') === 'GIF') ext = 'gif';
    const suffix = refs.size > 1 ? `-${++i}` : '';
    const savedName = `${baseName}${suffix}`;
    // reusar save() con nombre ajustado
    await fs.mkdir(outDir, { recursive: true });
    const finalExt = toWebp && ['png', 'jpg', 'jpeg', 'gif'].includes(ext) ? 'webp' : ext;
    const outPath = path.join(outDir, `${savedName}.${finalExt}`);
    const final = await optimize(buf, ext);
    await fs.writeFile(outPath, final);
    console.log(`✓ ${path.relative(ROOT, outPath)}  (${(final.length / 1024).toFixed(1)} KB)`);
  }
}

// ---------- main ----------
(async () => {
  const token = await getToken();
  console.log(`Figma → file=${fileKey} node=${nodeId} mode=${mode} ${mode === 'render' ? `format=${format}` : ''}`);
  if (mode === 'fill') await runFill(token);
  else await runRender(token);
})().catch((err) => {
  console.error('✗', err.message);
  process.exit(1);
});
