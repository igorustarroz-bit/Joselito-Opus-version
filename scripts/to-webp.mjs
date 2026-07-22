#!/usr/bin/env node
/**
 * to-webp.mjs — Convierte imágenes raster (PNG/JPG/GIF) a WebP.
 * Útil para fotos exportadas a mano desde Figma o desde un plugin.
 *
 * Requisitos: devDep `sharp`  ->  npm i -D sharp
 *
 * Uso:
 *   node scripts/to-webp.mjs <archivo-o-carpeta> [--quality=82] [--out=<dir>] [--keep]
 *
 *   <archivo-o-carpeta>  Un fichero, o una carpeta (convierte todos los png/jpg/jpeg/gif).
 *   --quality=<n>        Calidad WebP 1-100. Default: 82.
 *   --out=<dir>          Carpeta destino. Default: misma ubicación del original.
 *   --keep               No borrar los originales tras convertir. Default: se borran.
 *
 * Ejemplos:
 *   node scripts/to-webp.mjs src/assets/images/hero.png
 *   node scripts/to-webp.mjs src/assets/images --quality=80 --keep
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const argv = process.argv.slice(2);
const input = argv.find((a) => !a.startsWith('--'));
const flags = Object.fromEntries(
  argv.filter((a) => a.startsWith('--')).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v === undefined ? true : v];
  })
);

if (!input) {
  console.error('Falta la ruta. Uso: node scripts/to-webp.mjs <archivo-o-carpeta> [--opciones]');
  process.exit(1);
}

const quality = Number(flags.quality || 82);
const keep = Boolean(flags.keep);
const EXT = new Set(['.png', '.jpg', '.jpeg', '.gif']);

async function listTargets(p) {
  const st = await fs.stat(p);
  if (st.isFile()) return [p];
  const entries = await fs.readdir(p);
  return entries.map((e) => path.join(p, e)).filter((f) => EXT.has(path.extname(f).toLowerCase()));
}

(async () => {
  const sharp = (await import('sharp')).default;
  const targets = await listTargets(path.resolve(input));
  if (targets.length === 0) {
    console.warn('No hay imágenes raster que convertir.');
    return;
  }
  for (const file of targets) {
    const dir = flags.out ? path.resolve(flags.out) : path.dirname(file);
    await fs.mkdir(dir, { recursive: true });
    const out = path.join(dir, path.basename(file, path.extname(file)) + '.webp');
    const buf = await sharp(file).webp({ quality }).toBuffer();
    await fs.writeFile(out, buf);
    if (!keep) await fs.unlink(file);
    console.log(`✓ ${path.relative(process.cwd(), out)}  (${(buf.length / 1024).toFixed(1)} KB)`);
  }
})().catch((err) => {
  console.error('✗', err.message);
  process.exit(1);
});
