#!/usr/bin/env node
/**
 * fetch-raster.mjs — Hito de imágenes raster: baja/recoge las imágenes de Figma, verifica que son
 * las correctas (SHA-1 == imageHash de Figma), las pasa a WebP y escribe el mapa hash → fichero.
 * NO aplica a SVG (iconos/vectores van por SVGO/SVGR, ver references/images.md).
 *
 * Entrada: .ai/figma/images.json — inventario que devuelve el snippet "Inventario de imágenes"
 *   [{ hash, name?, masters: ["M07-Content-Text+Image", ...] }]
 *
 * Tres vías para conseguir los bytes (elige la que funcione en el entorno, por este orden):
 *   --rest            REST de Figma: UNA llamada a GET /v1/files/:key/images da las URLs de TODAS
 *                     las imágenes del fichero. Necesita figma-token.txt (o FIGMA_TOKEN) con
 *                     "File content: read" y que el fichero esté en un team de pago (Pro/Org/Ent).
 *   --urls <json>     JSON { hash: url } construido con las rawImages de download_assets (MCP).
 *                     Las URLs caducan en minutos: ejecutar en cuanto se obtienen.
 *   --from <carpeta>  Ficheros ya descargados (p. ej. ~/Downloads tras navegar a las URLs con el
 *                     navegador, o export manual). Se emparejan por SHA-1; los que no casan se listan.
 *
 * Uso:
 *   node scripts/fetch-raster.mjs --rest [--file <fileKey>]
 *   node scripts/fetch-raster.mjs --from ~/Downloads
 *   node scripts/fetch-raster.mjs --urls .ai/figma/raw-urls.json
 *   Opciones: --in .ai/figma/images.json  --out src/assets/images  --map maps/images.json
 *             --quality 82  --max-width 2880  --dry-run
 *
 * Requisito: npm i -D sharp
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { parseArgs, slug, readJson, writeJson, writeFile, walk, loadConfig, die, exists, profilePaths } from './lib.mjs';

const args = parseArgs();
const cfg = await loadConfig();
const IN = args.in || '.ai/figma/images.json';
const OUT = args.out || profilePaths(cfg).images;
const MAP = args.map || 'maps/images.json';
const Q = Number(args.quality || 82);
const MAXW = Number(args['max-width'] || 2880);
const DRY = Boolean(args['dry-run']);

const inventory = await readJson(IN);
if (!Array.isArray(inventory) || !inventory.length) die(`${IN} vacío. Ejecuta antes el snippet de inventario de imágenes.`);
const wanted = new Map(inventory.map((x) => [x.hash, x]));
const map = await readJson(MAP, {});

let sharp;
try { sharp = (await import('sharp')).default; } catch { die('Falta sharp: npm i -D sharp'); }

const sha1 = (buf) => crypto.createHash('sha1').update(buf).digest('hex');
const usedNames = new Set(Object.values(map).map((m) => m.file));
function nameFor(item) {
  const base = slug(item.name || (item.masters?.[0] ? `${item.masters[0]}` : 'img')) || 'img';
  let n = `${base}.webp`, i = 2;
  while (usedNames.has(n)) n = `${base}-${i++}.webp`;
  usedNames.add(n);
  return n;
}

const results = { ok: [], skipped: [], mismatch: [], missing: [], failed: [] };

async function place(hash, buf, origin) {
  const item = wanted.get(hash);
  if (map[hash] && await exists(path.join(OUT, map[hash].file))) { results.skipped.push(hash); return; }
  const real = sha1(buf);
  if (real !== hash) { results.mismatch.push({ hash, real, origin }); return; }
  const file = map[hash]?.file || nameFor(item);
  const img = sharp(buf, { animated: true });
  const meta = await img.metadata();
  const pipeline = meta.width > MAXW ? img.resize({ width: MAXW }) : img;
  const out = await pipeline.webp({ quality: Q }).toBuffer();
  if (!DRY) await writeFile(path.join(OUT, file), out);
  map[hash] = { file, width: Math.min(meta.width, MAXW), height: Math.round(meta.height * Math.min(1, MAXW / meta.width)),
    sourceFormat: meta.format, kb: Math.round(out.length / 1024), masters: item.masters || [] };
  results.ok.push(hash);
}

async function download(url) {
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url);
    if (res.status === 429) { await new Promise((r) => setTimeout(r, (Number(res.headers.get('retry-after')) || 5) * 1000)); continue; }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
  throw new Error('429 persistente');
}

if (args.rest) {
  const key = args.file || cfg.figma?.files?.[0]?.key || die('Falta --file <fileKey> (o figma.files[0].key en hanzo.config.json)');
  let token = process.env.FIGMA_TOKEN;
  if (!token) try { token = (await fs.readFile('figma-token.txt', 'utf8')).trim(); } catch { die('No hay figma-token.txt ni FIGMA_TOKEN.'); }
  const res = await fetch(`https://api.figma.com/v1/files/${key}/images`, { headers: { 'X-Figma-Token': token } });
  if (res.status === 403) die('403: el token no tiene acceso o el fichero no está en un team de pago. Usa --from o --urls.');
  if (res.status === 429) die('429: límite de la API REST. Espera o usa --from / --urls.');
  if (!res.ok) die(`REST ${res.status} ${res.statusText}`);
  const urls = (await res.json()).meta?.images || {};
  for (const [hash] of wanted) {
    if (!urls[hash]) { results.missing.push(hash); continue; }
    try { await place(hash, await download(urls[hash]), 'rest'); } catch (e) { results.failed.push({ hash, error: e.message }); }
  }
} else if (args.urls) {
  const urls = await readJson(args.urls);
  for (const [hash] of wanted) {
    if (!urls[hash]) { results.missing.push(hash); continue; }
    try { await place(hash, await download(urls[hash]), 'urls'); } catch (e) { results.failed.push({ hash, error: e.message }); }
  }
} else if (args.from) {
  const dir = String(args.from).replace(/^~(?=$|\/)/, process.env.HOME);
  const files = await walk(dir, (p) => /\.(png|jpe?g|gif|webp|avif|heic|bin)$|^[^.]+$/i.test(path.basename(p)));
  const found = new Set();
  for (const f of files) {
    const buf = await fs.readFile(f);
    const h = sha1(buf);
    if (wanted.has(h) && !found.has(h)) { found.add(h); await place(h, buf, f); }
  }
  for (const [hash] of wanted) if (!found.has(hash) && !map[hash]) results.missing.push(hash);
} else {
  die('Indica la vía: --rest | --urls <json> | --from <carpeta>');
}

if (!DRY) await writeJson(MAP, map);
const total = Object.values(map).reduce((a, m) => a + (m.kb || 0), 0);
console.log(`✓ ${results.ok.length} nuevas · ${results.skipped.length} ya estaban · ${Object.keys(map).length} en ${MAP} (${(total / 1024).toFixed(1)} MB WebP)`);
if (results.mismatch.length) console.warn(`⚠ ${results.mismatch.length} con SHA-1 distinto al imageHash (fichero equivocado o recomprimido):`, results.mismatch.slice(0, 10));
if (results.missing.length) console.warn(`⚠ ${results.missing.length} sin conseguir: ${results.missing.slice(0, 15).join(', ')}${results.missing.length > 15 ? '…' : ''}`);
if (results.failed.length) console.warn(`⚠ ${results.failed.length} fallos de descarga:`, results.failed.slice(0, 10));
process.exitCode = results.mismatch.length || results.failed.length ? 2 : 0;
