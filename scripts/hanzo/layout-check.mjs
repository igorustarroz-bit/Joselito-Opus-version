#!/usr/bin/env node
/**
 * layout-check.mjs — Verifica el layout de los módulos en el Storybook COMPILADO (Playwright).
 *
 *   --measure   Mide en varios anchos en qué columna empieza y acaba cada pieza declarada en
 *               meta.layout.columns (con "story" y "selector") y lo compara con lo declarado. Esperado:
 *               números ENTEROS que coinciden en TODOS los anchos, no solo en el del frame de Figma.
 *   --overflow  Barrido de desbordes: todas las stories de módulos en todos los rangos; avisa si
 *               scrollWidth > clientWidth e indica el primer elemento que se sale.
 *
 * Uso (tras npm run build-storybook):
 *   node scripts/layout-check.mjs --measure src/modules/M07…/M07….meta.json   (o --all)
 *   node scripts/layout-check.mjs --overflow [--widths 390,600,960,1100,1280,1440]
 *   [--dir storybook-static] [--json]
 *
 * Para que una pieza se mida, su entrada en meta.layout.columns lleva:
 *   { "variant": "Left · Vertical", "story": "LeftVertical", "piece": "Imagen", "selector": ".m07-content__media", "columns": "1–5" }
 *   (selector relativo a la story; usa clases propias del módulo, no de subcomponentes)
 *
 * Requisitos: devDependency "playwright" y el navegador: npx playwright install chromium
 * Exit 0 = todo cuadra · 2 = diferencias o desbordes.
 */

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs, readJson, walk, loadConfig, profilePaths, exists, die } from './lib.mjs';

const args = parseArgs();
const cfg = await loadConfig();
const DIR = path.resolve(args.dir || 'storybook-static');
if (!args.measure && !args.overflow) die('Uso: layout-check.mjs --measure <meta.json…>|--all  ·  --overflow [--widths …]');
if (!(await exists(path.join(DIR, 'index.json')))) die(`No encuentro ${DIR}/index.json. Compila antes: npm run build-storybook`);
let chromium;
try { ({ chromium } = await import('playwright')); } catch { die('Falta Playwright: npm i -D playwright && npx playwright install chromium'); }

const GUT = cfg.grid?.gutter || '--layout-grids-gutter';
const MAR = cfg.grid?.wrapper || '--layout-grids-wrapper-default';
const tmeta = await readJson(path.join(profilePaths(cfg).tokens, 'tokens.meta.json'), { breakpoints: [], grids: [] });
const bps = (tmeta.breakpoints || []).map((b) => ({ ...b, min: b.min ?? b.width }));
const colsFor = (w) => (tmeta.grids || []).filter((g) => (g.min ?? g.width) <= w).at(-1)?.columns ?? 12;

// ---------- servidor estático del Storybook compilado ----------
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };
const server = http.createServer(async (req, res) => {
  const p = path.join(DIR, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try { const f = (await fs.stat(p)).isDirectory() ? path.join(p, 'index.html') : p; res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); res.end(await fs.readFile(f)); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;
const index = await readJson(path.join(DIR, 'index.json'));
const stories = Object.values(index.entries || index.stories || {}).filter((e) => e.type === 'story' || !e.type);
const startCase = (s) => String(s).replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Za-z])(\d)/g, '$1 $2');
const sanitize = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const findStory = (metaPath, exportName) => {
  const base = path.basename(metaPath).replace(/\.meta\.json$/, '');
  return stories.find((e) => String(e.importPath || '').includes(`/${base}.stories`) &&
    (e.exportName === exportName || e.id.endsWith(`--${sanitize(startCase(exportName))}`)));
};

const browser = await chromium.launch();
const page = await browser.newPage();
async function open(id, w) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(`${BASE}/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#storybook-root *', { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready);
}
let fail = 0;
const out = { measure: [], overflow: [] };

// ---------- 1. Medir columnas ----------
if (args.measure) {
  const metas = args._.length ? args._ : await walk('.', (p) => p.endsWith('.meta.json') && !p.endsWith('tokens.meta.json'));
  const widths = args.widths ? String(args.widths).split(',').map(Number)
    : [...new Set([...bps.filter((b) => colsFor(b.min) >= 12).flatMap((b) => [b.min, b.width]), 1100, 1700])].sort((a, b) => a - b);
  for (const mp of metas) {
    const m = await readJson(mp);
    const pieces = (m.layout?.columns || []).filter((c) => c.story && c.selector);
    if (!pieces.length) { if (m.kind === 'module' && args._.length) console.log(`· ${m.name}: sin piezas con story+selector en meta.layout.columns (no se mide)`); continue; }
    console.log(`\n${m.name} — anchos ${widths.join(', ')}`);
    for (const c of pieces) {
      const st = findStory(mp, c.story);
      if (!st) { console.log(`  ✗ ${c.variant} · ${c.piece}: no encuentro la story ${c.story}`); fail++; continue; }
      const [e0, e1] = (String(c.columns).match(/\d+/g) || []).map(Number);
      const row = [];
      for (const w of widths) {
        await open(st.id, w);
        const r = await page.evaluate(({ sel, GUT, MAR }) => {
          const scope = document.querySelector('[data-grid-scope]') || document.body;
          const probe = (expr) => { const d = document.createElement('div'); d.style.cssText = `position:absolute;visibility:hidden;height:0;width:${expr}`; scope.appendChild(d); const v = d.getBoundingClientRect().width; d.remove(); return v; };
          const g = probe(`var(${GUT})`), mg = probe(`var(${MAR})`), cols = Math.round(probe('calc(var(--grid-columns, 12) * 1px)'));
          const S = scope.getBoundingClientRect();
          const col = (S.width - 2 * mg - (cols - 1) * g) / cols;
          const el = scope.querySelector(sel);
          if (!el) return { missing: true, cols };
          const b = el.getBoundingClientRect();
          const at = (x) => (x - S.left - mg) / (col + g) + 1;
          return { cols, start: at(b.left), end: at(b.right + g) - 1 };
        }, { sel: c.selector, GUT, MAR });
        if (r.missing) { row.push(`${w}: ✗ selector`); fail++; continue; }
        const round = (x) => Math.round(x * 100) / 100;
        const okInt = Math.abs(r.start - Math.round(r.start)) < 0.05 && Math.abs(r.end - Math.round(r.end)) < 0.05;
        const okDecl = r.cols < 12 || e0 == null || (Math.round(r.start) === e0 && Math.round(r.end) === (e1 ?? e0));
        if (r.cols >= 12 && (!okInt || !okDecl)) fail++;
        row.push(`${w}: ${round(r.start)}–${round(r.end)}${r.cols < 12 ? ` (${r.cols} col)` : okInt && okDecl ? ' ✓' : ' ✗'}`);
        out.measure.push({ element: m.name, variant: c.variant, piece: c.piece, width: w, ...r, declared: c.columns, ok: r.cols < 12 || (okInt && okDecl) });
      }
      console.log(`  ${c.variant} · ${c.piece} (declarado ${c.columns})\n    ${row.join(' · ')}`);
    }
  }
}

// ---------- 2. Barrido de desbordes ----------
if (args.overflow) {
  const widths = args.widths ? String(args.widths).split(',').map(Number)
    : [...new Set([...bps.flatMap((b) => [b.min || 360, b.width]), 600, 1100])].filter((w) => w >= 320).sort((a, b) => a - b);
  const mods = stories.filter((e) => /\/modules\//i.test(e.importPath || '') || /^modul/i.test(e.title || ''));
  console.log(`\nDesbordes — ${mods.length} stories de módulos × ${widths.length} anchos (${widths.join(', ')})`);
  for (const st of mods) {
    for (const w of widths) {
      await open(st.id, w);
      const r = await page.evaluate(() => {
        const de = document.documentElement, vw = de.clientWidth;
        if (de.scrollWidth <= vw + 1) return null;
        const off = [...document.querySelectorAll('#storybook-root *')].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.right > vw + 1; });
        const leaf = off.find((e) => !off.some((o) => o !== e && e.contains(o))) || off[0];
        const name = leaf ? `${leaf.tagName.toLowerCase()}${leaf.className && typeof leaf.className === 'string' ? '.' + leaf.className.trim().split(/\s+/).join('.') : ''}` : '?';
        return { scrollWidth: de.scrollWidth, clientWidth: vw, first: name, right: leaf ? Math.round(leaf.getBoundingClientRect().right) : null };
      });
      if (r) { fail++; out.overflow.push({ story: st.id, width: w, ...r }); console.log(`  ✗ ${st.title} / ${st.name} @ ${w}px: +${r.scrollWidth - r.clientWidth}px — primero que se sale: ${r.first} (right ${r.right})`); }
    }
  }
  if (!out.overflow.length) console.log('  ✓ sin desbordes');
}

await browser.close();
server.close();
if (args.json) console.log(JSON.stringify(out, null, 2));
console.log(`\n${fail ? `✗ ${fail} problema(s) de layout` : '✓ Layout OK'}`);
process.exitCode = fail ? 2 : 0;
