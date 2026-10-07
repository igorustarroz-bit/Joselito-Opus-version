#!/usr/bin/env node
/**
 * scaffold.mjs — Crea la estructura del proyecto para un perfil de salida y copia las herramientas.
 *
 * Uso (desde la carpeta del proyecto = repo local):
 *   node <skill>/scripts/scaffold.mjs [--profile react-storybook|html-static|shopify] [--force] [--update-scripts]
 *
 * - Lee hanzo.config.json (si no existe, copia la plantilla y PARA: hay que rellenarla primero).
 * - Copia assets/scaffold/<perfil>/ sin sobrescribir lo que ya exista (salvo --force).
 * - Copia los scripts de la skill a scripts/hanzo/ (así el equipo y CI pueden ejecutarlos con npm run …).
 *   --update-scripts: solo actualiza scripts/hanzo/ con la versión actual de la skill.
 * - Crea CONTEXT.md y CHANGELOG.md si no existen. PLAN.md lo genera plan.mjs.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs, readJson, exists, writeFile, writeJson, profilePaths } from './lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.resolve(HERE, '..');
const args = parseArgs();

if (!(await exists('hanzo.config.json'))) {
  await fs.copyFile(path.join(SKILL, 'assets/common/hanzo.config.json'), 'hanzo.config.json');
  console.log('✓ Creado hanzo.config.json desde la plantilla. Rellénalo (cliente, Figma, repo, perfil) y vuelve a ejecutar.');
  process.exit(0);
}
const cfg = await readJson('hanzo.config.json');
const profile = args.profile || cfg.output || 'react-storybook';
const src = path.join(SKILL, 'assets/scaffold', profile);
if (!(await exists(src))) { console.error(`✗ Perfil desconocido: ${profile}`); process.exit(1); }

// Fija output y rutas del perfil en la config (todos los scripts las leen de ahí)
const P = profilePaths({ ...cfg, output: profile });
if (cfg.output !== profile || JSON.stringify(cfg.paths || {}) !== JSON.stringify(P)) {
  cfg.output = profile; cfg.paths = P;
  await writeJson('hanzo.config.json', cfg);
  console.log(`✓ hanzo.config.json: output=${profile}, paths del perfil fijadas`);
}
const tokMeta = await readJson(`${P.tokens}/tokens.meta.json`, { themes: [] });
const vars = {
  PROJECT: cfg.project || path.basename(process.cwd()), CLIENT: cfg.client || 'Proyecto', LANG: cfg.docsLang || 'es', OUTPUT: profile,
  REPO: cfg.github?.repo || '', PAGES_URL: cfg.github?.pages || '', SKILL_SCRIPTS: 'scripts/hanzo',
  GRID_GUTTER: cfg.grid?.gutter || '--layout-grids-gutter', GRID_WRAPPER: cfg.grid?.wrapper || '--layout-grids-wrapper-default',
  THEMES_JSON: JSON.stringify((tokMeta.themes || []).map((t) => ({ slug: t.slug, name: t.name }))),
};
const fill = (s) => s.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));
const rename = (p) => p.split(path.sep).map((s) => s.replace(/^_dot_/, '.')).join(path.sep);
const created = [], skipped = [];

async function copyTree(from, to) {
  for (const e of await fs.readdir(from, { withFileTypes: true })) {
    const s = path.join(from, e.name), d = path.join(to, rename(e.name));
    if (e.isDirectory()) { await fs.mkdir(d, { recursive: true }); await copyTree(s, d); continue; }
    if ((await exists(d)) && !args.force) { skipped.push(d); continue; }
    const buf = await fs.readFile(s);
    const text = /\.(json|js|jsx|mjs|css|html|liquid|md|mdx|yml|yaml)$|^_dot_gitignore$/.test(e.name);
    await writeFile(d, text ? fill(buf.toString('utf8')) : buf);
    created.push(d);
  }
}

// Scripts de la skill → scripts/hanzo/
await fs.mkdir('scripts/hanzo', { recursive: true });
for (const f of await fs.readdir(HERE)) if (f.endsWith('.mjs')) await fs.copyFile(path.join(HERE, f), path.join('scripts/hanzo', f));
await fs.mkdir('scripts/hanzo/snippets', { recursive: true });
for (const f of await fs.readdir(path.join(SKILL, 'snippets'))) await fs.copyFile(path.join(SKILL, 'snippets', f), path.join('scripts/hanzo/snippets', f));
console.log('✓ scripts/hanzo/ actualizado (herramientas + snippets de Figma)');
if (args['update-scripts']) process.exit(0);

await copyTree(src, '.');
for (const f of ['CONTEXT.md', 'CHANGELOG.md']) {
  if (await exists(f)) { skipped.push(f); continue; }
  await writeFile(f, fill(await fs.readFile(path.join(SKILL, 'assets/common', f), 'utf8'))); created.push(f);
}
// Carpetas obligatorias del perfil, creadas explícitamente: al instalar la skill los .gitkeep
// pueden perderse y, p. ej., Storybook falla si no existe public/
const DIRS = {
  'react-storybook': ['public/fonts', 'src/tokens', 'src/components', 'src/modules', 'src/templates', 'src/assets/icons', 'src/assets/logos', 'src/assets/illustrations', 'src/assets/images', 'maps'],
  'html-static': ['css/tokens', 'css/components', 'components', 'pages', 'docs', 'meta', 'js', 'assets/icons', 'assets/images', 'fonts', 'maps'],
  shopify: ['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'blocks', 'templates', 'docs', 'meta', 'maps'],
}[profile] || [];
for (const d of [...DIRS, '.ai/masters', '.ai/figma/inventory', '.ai/layout']) {
  await fs.mkdir(d, { recursive: true });
  if (!d.startsWith('.ai') && !(await fs.readdir(d)).length) await fs.writeFile(path.join(d, '.gitkeep'), '');
}

console.log(`✓ Scaffold ${profile}: ${created.length} ficheros creados${skipped.length ? `, ${skipped.length} ya existían (no tocados${args.force ? '' : '; --force para sobrescribir'})` : ''}`);
for (const c of created) console.log(`  + ${c}`);
console.log('\nSiguiente: npm install · npm run fonts · (tokens tras el volcado de variables) · git add/commit/push');
