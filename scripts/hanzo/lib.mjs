// lib.mjs — utilidades compartidas por los scripts de hanzo-design-to-code.
// Sin dependencias externas: solo Node >= 20.

import fs from 'node:fs/promises';
import path from 'node:path';

// Flags booleanos: nunca consumen el siguiente argumento
// [parche Joselito] 'meta' NO es booleano: figma-diff usa --meta <ruta> (grid-columns lo trata aparte)
const BOOL = new Set(['build', 'all', 'fp', 'drift', 'next', 'keys', 'force', 'json', 'strict', 'dry-run', 'no-tailwind', 'no-fluid', 'measure', 'overflow', 'write',
  'update-scripts', 'status', 'rest', 'webp', 'no-optimize', 'help']);

/** Parsea argv en { _: [posicionales], flag: valor|true }. Soporta --k=v y --k v. */
export function parseArgs(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { out._.push(a); continue; }
    const [k, v] = a.slice(2).split(/=(.*)/s);
    if (v !== undefined) out[k] = v;
    else if (!BOOL.has(k) && argv[i + 1] && !argv[i + 1].startsWith('--')) out[k] = argv[++i];
    else out[k] = true;
  }
  return out;
}

/** "Backgrounds/Base" -> "backgrounds-base"; "Title 8/SZ" -> "title-8-sz". */
export function slug(s) {
  return String(s)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "M07-Content-Text+Image" -> "M07ContentTextImage" (nombre de componente). */
export function pascal(s) {
  return slug(s).split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join('');
}

export async function readJson(p, fallback) {
  try { return JSON.parse(await fs.readFile(p, 'utf8')); }
  catch (e) { if (fallback !== undefined) return fallback; throw new Error(`No puedo leer ${p}: ${e.message}`); }
}

export async function writeFile(p, content) {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, content);
  return p;
}

export async function writeJson(p, data) {
  return writeFile(p, JSON.stringify(data, null, 2) + '\n');
}

export async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

/** Lista ficheros recursivamente (ignora node_modules, .git, storybook-static, dist). */
export async function walk(dir, filter = () => true) {
  const skip = new Set(['node_modules', '.git', 'storybook-static', 'dist', '.ai']);
  const res = [];
  try { if ((await fs.stat(dir)).isFile()) return filter(dir) ? [dir] : []; } catch { return res; }
  async function rec(d) {
    let entries = [];
    try { entries = await fs.readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (skip.has(e.name)) continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) await rec(p);
      else if (filter(p)) res.push(p);
    }
  }
  await rec(dir);
  return res;
}

/** Lee hanzo.config.json desde la raíz del proyecto (o devuelve {}). */
export async function loadConfig(root = process.cwd()) {
  return readJson(path.join(root, 'hanzo.config.json'), {});
}

/** Rutas por perfil de salida (sobrescribibles con hanzo.config.json → paths). */
export function profilePaths(cfg = {}) {
  const def = {
    'react-storybook': { tokens: 'src/tokens', fonts: 'public/fonts', fontsCss: 'src/tokens/fonts.css', fontsGoogleCss: 'src/tokens/fonts-google.css', fontsUrl: '/fonts', images: 'src/assets/images', themesJs: null },
    'html-static': { tokens: 'css/tokens', fonts: 'fonts', fontsCss: 'css/tokens/fonts.css', fontsGoogleCss: 'css/tokens/fonts-google.css', fontsUrl: '../../fonts', images: 'assets/images', themesJs: 'js/themes.js' },
    shopify: { tokens: 'assets', fonts: 'assets', fontsCss: 'assets/fonts.css.liquid', fontsGoogleCss: 'assets/fonts-google.css', fontsUrl: 'shopify', images: 'assets', themesJs: null },
  }[cfg.output || 'react-storybook'] || {};
  return { ...def, ...(cfg.paths || {}) };
}

export function die(msg, code = 1) {
  console.error('✗ ' + msg);
  process.exit(code);
}

/** Número de breakpoint a partir del nombre de modo: "XL - 1440" -> 1440. */
export function modeWidth(name) {
  const m = String(name).match(/(\d{3,4})/);
  return m ? Number(m[1]) : null;
}
