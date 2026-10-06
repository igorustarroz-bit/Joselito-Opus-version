#!/usr/bin/env node
/**
 * grid-columns.mjs — Traduce geometría de Figma a columnas de grid (módulos sin autolayout o con
 * anchos "raros"). Implementa las reglas R-AL12/13/14 del Stream A:
 *   - calcula para cada bloque cuántas columnas ocupa y en cuál empieza,
 *   - tolera imprecisión del diseñador (±tolerancia px → se asume comportamiento de grid),
 *   - un margen lateral "raro" suele ser N columnas enteras + wrapper, no un padding arbitrario.
 *
 * Entrada: uno o varios JSON de snippets/layout-boxes.js (p. ej. la variante Desktop y la Mobile).
 * Parámetros del grid (por prioridad): flags → layoutGrids del frame → variables.json (modo de la
 * colección responsive cuyo ancho coincide con el frame: *Gutter*, *Wrapper-Default*) → 12/24/80.
 *
 * Uso:
 *   node scripts/grid-columns.mjs .ai/layout/m07--desktop.json [.ai/layout/m07--mobile.json]
 *        [--cols 12] [--gutter 32] [--margin 80] [--tolerance 10] [--level 1] [--json]
 *
 * Salida: tabla por bloque (col-start, span, error en px, si es full-bleed u overlay) y una
 * sugerencia de clases (Tailwind) / CSS grid-column combinando breakpoints de móvil a escritorio.
 */

import { parseArgs, readJson, modeWidth, slug, die } from './lib.mjs';

const args = parseArgs();
if (!args._.length) die('Uso: grid-columns.mjs <layout.json> [<layout-mobile.json>] [--cols 12 --gutter 32 --margin 80]');
const TOL = Number(args.tolerance || 10);
const LEVEL = Number(args.level || 1);
const vars = await readJson('.ai/figma/variables.json', null);

function gridFor(layout) {
  const W = layout.w;
  let cols = Number(args.cols || 0), gutter = args.gutter != null ? Number(args.gutter) : null, margin = args.margin != null ? Number(args.margin) : null;
  const g = (layout.layoutGrids || []).find((x) => x.pattern === 'COLUMNS');
  if (g) { cols ||= g.count; gutter ??= g.gutter; margin ??= g.offset; }
  // Grid styles del fichero (p. ej. "Layout/XS (390)": 6 col) — el número de columnas cambia por breakpoint
  const gs = (vars?.gridStyles || []).map((x) => ({ w: modeWidth(x.name), c: (x.layoutGrids || []).find((l) => l.pattern === 'COLUMNS') })).filter((x) => x.w && x.c);
  if (gs.length) {
    const best = gs.sort((a, b) => Math.abs(a.w - W) - Math.abs(b.w - W))[0];
    if (Math.abs(best.w - W) <= 40) { cols ||= best.c.count; gutter ??= best.c.gutter; margin ??= best.c.offset; }
  }
  if (vars && (gutter == null || margin == null)) {
    const resp = vars.collections.find((c) => c.modes.length > 1 && c.modes.every((m) => modeWidth(m)));
    if (resp) {
      const idx = resp.modes.map((m, i) => [Math.abs(modeWidth(m) - W), i]).sort((a, b) => a[0] - b[0])[0][1];
      const val = (re) => { const v = resp.vars.find((x) => re.test(x[0])); if (!v) return null; const n = Array.isArray(v[2]) ? v[2][idx] : v[2]; return typeof n === 'number' ? n : null; };
      gutter ??= val(/gutter$/i); margin ??= val(/wrapper-default$/i);
    }
  }
  cols ||= 12; gutter ??= 24; margin ??= 80;
  const colW = (W - 2 * margin - (cols - 1) * gutter) / cols;
  return { W, cols, gutter, margin, colW };
}

function blocksOf(layout) {
  // Nivel 1 = hijos directos. Si el raíz tiene un único hijo contenedor, bajamos un nivel.
  let nodes = layout.tree.children || [];
  if (nodes.length === 1 && nodes[0].children?.length) nodes = nodes[0].children;
  if (LEVEL > 1) nodes = nodes.flatMap((n) => (n.children?.length ? n.children : [n]));
  return nodes;
}

function analyse(layout) {
  const G = gridFor(layout);
  const step = G.colW + G.gutter;
  const rows = [];
  const res = blocksOf(layout).map((b) => {
    const fullBleed = b.x <= 1 && b.w >= G.W - 2;
    const start = Math.round((b.x - G.margin) / step) + 1;
    const span = Math.max(1, Math.round((b.w + G.gutter) / step));
    const predX = G.margin + (start - 1) * step;
    const predW = span * G.colW + (span - 1) * G.gutter;
    const errX = Math.round(Math.abs(predX - b.x)), errW = Math.round(Math.abs(predW - b.w));
    const err = Math.max(errX, errW);
    const fits = !fullBleed && start >= 1 && start + span - 1 <= G.cols && err <= TOL;
    let row = rows.findIndex((r) => b.y < r.y2 && b.y + b.h > r.y1);
    if (row === -1) { rows.push({ y1: b.y, y2: b.y + b.h }); row = rows.length - 1; }
    else { rows[row].y1 = Math.min(rows[row].y1, b.y); rows[row].y2 = Math.max(rows[row].y2, b.y + b.h); }
    return { name: b.name, type: b.type, x: b.x, y: b.y, w: b.w, h: b.h, row: row + 1, start, span, err, errX, errW, fits, fullBleed, overlay: Boolean(b.absolute), autolayout: b.layout?.mode || null };
  });
  return { name: layout.name, grid: G, blocks: res };
}

const results = [];
for (const f of args._) results.push(analyse(await readJson(f)));
results.sort((a, b) => a.grid.W - b.grid.W); // móvil primero

if (args.json) { console.log(JSON.stringify(results, null, 2)); process.exit(0); }

for (const r of results) {
  const G = r.grid;
  console.log(`\n${r.name} — ${G.W}px · ${G.cols} col · gutter ${G.gutter} · margen ${G.margin} · col ${G.colW.toFixed(1)}px`);
  console.log('  fila | bloque                         | col-start | span | error | nota');
  for (const b of r.blocks) {
    const why = b.errW <= TOL ? `ancho = ${b.span} col exactas; posición desplazada ${b.errX}px (¿gap ≠ gutter?)` : b.errX <= TOL ? `empieza en col ${b.start}; ancho difiere ${b.errW}px` : `posición ±${b.errX}px, ancho ±${b.errW}px`;
    const note = b.fullBleed ? 'full-bleed (fuera del grid)' : b.overlay ? 'overlay absoluto' : b.fits ? '' : `⚠ no encaja: ${why} → medir/preguntar`;
    console.log(`  ${String(b.row).padStart(4)} | ${b.name.slice(0, 30).padEnd(30)} | ${String(b.start).padStart(9)} | ${String(b.span).padStart(4)} | ${String(b.err).padStart(5)} | ${note}`);
  }
}

// Sugerencia combinada por nombre de bloque (móvil → escritorio)
if (results.length > 1) {
  console.log('\nSugerencia (mobile-first) por bloque:');
  const names = [...new Set(results.flatMap((r) => r.blocks.map((b) => b.name)))];
  for (const n of names) {
    const parts = [];
    results.forEach((r, i) => {
      const b = r.blocks.find((x) => x.name === n); if (!b || !b.fits) return;
      const bp = i === 0 ? '' : `${slug(String(r.grid.W))}px:`;
      parts.push(b.start === 1 && b.span === r.grid.cols ? `${bp}col-span-full` : `${bp}col-start-${b.start} ${bp}col-span-${b.span}`);
    });
    if (parts.length) console.log(`  ${n.slice(0, 30).padEnd(30)} → ${parts.join('  ')}`);
  }
  console.log('  (sustituye "NNNpx:" por el prefijo del breakpoint de tokens.meta.json, p. ej. lg:, xl:)');
}
