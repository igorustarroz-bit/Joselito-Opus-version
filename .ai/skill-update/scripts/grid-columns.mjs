#!/usr/bin/env node
/**
 * grid-columns.mjs — Traduce geometría de Figma a COLUMNAS de la rejilla. Se usa en TODOS los módulos
 * (de aquí sale meta.layout: en qué columna empieza cada pieza, cuántas ocupa y qué columnas quedan
 * libres). Implementa las reglas R-AL12/13/14 del Stream A:
 *   - calcula para cada bloque cuántas columnas ocupa y en cuál empieza,
 *   - tolera imprecisión del diseñador (±tolerancia px → se asume comportamiento de grid),
 *   - un margen lateral "raro" suele ser N columnas enteras + wrapper, no un padding arbitrario.
 *
 * Entrada: uno o varios JSON de snippets/layout-boxes.js (p. ej. la variante Desktop y la Mobile).
 * Parámetros del grid (por prioridad): flags → layoutGrids del frame → variables.json (modo de la
 * colección responsive cuyo ancho coincide con el frame: *Gutter*, *Wrapper-Default*) → 12/24/80.
 *
 * Uso:
 *   node scripts/grid-columns.mjs .ai/layout/m07--left-horizontal.json [.ai/layout/m07--mobile.json …]
 *        [--cols 12] [--gutter 32] [--margin 80] [--tolerance 10] [--level 1] [--json] [--meta]
 *
 * Salida: tabla por bloque (columnas inicio–fin, span, error en px, full-bleed/overlay, pistas de
 * variables de Figma), columnas LIBRES por fila, tipología sugerida (Columnas / A sangre / Mezcla) y
 * CSS grid-column por variante con el @media en el INICIO DE RANGO (tokens.meta.json → breakpoints[].min).
 * --meta imprime un borrador de meta.layout (tipología + columnas por variante) para el <Nombre>.meta.json.
 */

import path from 'node:path';
import { parseArgs, readJson, modeWidth, die, loadConfig, profilePaths } from './lib.mjs';

const args = parseArgs();
// --meta es un flag aquí pero en figma-diff lleva valor: si se ha comido un posicional, devolverlo
if (typeof args.meta === 'string') { args._.push(args.meta); args.meta = true; }
if (!args._.length) die('Uso: grid-columns.mjs <layout.json> [<layout-mobile.json>] [--cols 12 --gutter 32 --margin 80]');
const TOL = Number(args.tolerance || 10);
const LEVEL = Number(args.level || 1);
const vars = await readJson('.ai/figma/variables.json', null);
const cfg = await loadConfig();
const tmeta = await readJson(path.join(profilePaths(cfg).tokens, 'tokens.meta.json'), { breakpoints: [] });
// Breakpoint de tokens cuyo frame es el más cercano al ancho de la variante → inicio de rango y nombre
const bpFor = (W) => {
  const b = [...(tmeta.breakpoints || [])].sort((a, c) => Math.abs(a.width - W) - Math.abs(c.width - W))[0];
  const min = b ? b.min ?? Number(cfg.breakpoints?.[String(b.width)] ?? b.width) : Number(cfg.breakpoints?.[String(W)] ?? W);
  return { name: b?.name || `${W}`, min, label: b?.label || `${W}px` };
};
// Una colocación de N columnas aplica desde el PRIMER rango con N columnas (12 col: desde L = 960, no desde 1440)
const rangeFor = (W, cols) => {
  const g = (tmeta.grids || []).find((x) => x.columns === cols);
  const own = bpFor(W);
  if (!g) return own;
  const first = bpFor(g.width);
  return { ...own, min: Math.min(own.min, first.min), label: first.label === own.label ? own.label : `${first.label} → ${own.label}` };
};

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
    const hint = b.bind ? Object.entries(b.bind).map(([k, v]) => `${k}=${String(v).split('/').at(-1)}`).join(' ') : '';
    const spanFromVar = /width/.test(Object.keys(b.bind || {}).join()) ? Number((String(b.bind.width || '').match(/(\d+)\s*cols?$/i) || [])[1]) || null : null;
    return { name: b.name, type: b.type, x: b.x, y: b.y, w: b.w, h: b.h, row: row + 1, start, span, end: start + span - 1, err, errX, errW, fits, fullBleed, overlay: Boolean(b.absolute), autolayout: b.layout?.mode || null, hint, spanFromVar };
  });
  // Columnas libres por fila (las que no ocupa ninguna pieza alineada)
  const free = rows.map((_, i) => {
    const used = new Set(res.filter((b) => b.row === i + 1 && b.fits).flatMap((b) => Array.from({ length: b.span }, (_, k) => b.start + k)));
    return used.size ? Array.from({ length: G.cols }, (_, k) => k + 1).filter((c) => !used.has(c)) : [];
  });
  // Pistas del contenedor: paddings ligados a WrapperNCol = margen + N columnas libres en ese lado
  const container = layout.tree.children?.length === 1 && layout.tree.children[0].children?.length ? layout.tree.children[0] : layout.tree;
  const containerHint = [...new Set([layout.tree, container])].map((n) => n.bind ? Object.entries(n.bind).map(([k, v]) => `${k}=${String(v).split('/').at(-1)}`).join(' ') : '').filter(Boolean).join(' · ');
  const spaceBetween = [layout.tree, container].some((n) => n.layout?.align === 'SPACE_BETWEEN');
  const nFit = res.filter((b) => b.fits).length, nBleed = res.filter((b) => b.fullBleed || (b.w >= G.W * 0.3 && (b.x <= 1 || b.x + b.w >= G.W - 1) && !b.fits)).length;
  const type = nBleed && nFit ? 'Mezcla' : nBleed ? 'A sangre' : 'Columnas';
  const variant = (layout.variant ? Object.entries(layout.variant).filter(([k]) => !/device/i.test(k)).map(([, v]) => v).join(' · ') : '') ||
    (layout.variant ? Object.values(layout.variant).join(' · ') : '') || layout.name;
  return { name: layout.name, variant, grid: G, bp: rangeFor(G.W, G.cols), blocks: res, free, containerHint, spaceBetween, type };
}

const results = [];
for (const f of args._) results.push(analyse(await readJson(f)));
results.sort((a, b) => a.grid.W - b.grid.W); // móvil primero

if (args.json) { console.log(JSON.stringify(results, null, 2)); process.exit(0); }

for (const r of results) {
  const G = r.grid;
  console.log(`\n${r.name} — ${G.W}px · ${G.cols} col · gutter ${G.gutter} · margen ${G.margin} · col ${G.colW.toFixed(1)}px · rango ${r.bp.label} desde ${r.bp.min}px · tipología sugerida: ${r.type}`);
  if (r.containerHint) console.log(`  pistas del contenedor: ${r.containerHint}`);
  if (r.spaceBetween) console.log('  contenedor con SPACE_BETWEEN: las columnas restantes quedan LIBRES (no es un gap)');
  console.log('  fila | bloque                         | columnas | span | error | nota');
  for (const b of r.blocks) {
    const why = b.errW <= TOL ? `ancho = ${b.span} col exactas; posición desplazada ${b.errX}px (¿gap ≠ gutter?)` : b.errX <= TOL ? `empieza en col ${b.start}; ancho difiere ${b.errW}px` : `posición ±${b.errX}px, ancho ±${b.errW}px`;
    const note = [b.fullBleed ? 'a sangre (fuera de la rejilla)' : b.overlay ? 'overlay absoluto' : b.fits ? '' : `⚠ no encaja: ${why} → medir/preguntar`,
      b.spanFromVar && b.spanFromVar !== b.span ? `⚠ ancho ligado a ${b.spanFromVar}cols pero mide ${b.span}` : '', b.hint ? `Figma: ${b.hint}` : ''].filter(Boolean).join(' · ');
    const cols = b.fits ? `${b.start}–${b.end}` : '—';
    console.log(`  ${String(b.row).padStart(4)} | ${b.name.slice(0, 30).padEnd(30)} | ${cols.padStart(8)} | ${String(b.span).padStart(4)} | ${String(b.err).padStart(5)} | ${note}`);
  }
  r.free.forEach((f, i) => { if (f.length && f.length < G.cols) console.log(`  fila ${i + 1}: columnas libres ${f.join(', ')}`); });
}

// CSS sugerido: grid-column sobre la rejilla del sistema, @media en el inicio de rango
console.log('\nCSS sugerido (rejilla del sistema; las columnas libres salen solas de grid-column):');
for (const r of results) {
  const fit = r.blocks.filter((b) => b.fits);
  if (!fit.length) { console.log(`  /* ${r.variant}: ${r.type} — sin piezas alineadas a columnas (flex 50 % / 33 %, texto centrado) */`); continue; }
  const full = fit.every((b) => b.start === 1 && b.span === r.grid.cols);
  const base = !r.bp.min;
  const ind = base ? '  ' : '    ';
  console.log(base ? `  /* base mobile-first · ${r.bp.label} · ${r.variant} */` : `  @media (min-width: ${r.bp.min}px) { /* ${r.bp.label} · ${r.variant} */`);
  for (const b of fit) console.log(`${ind}.<pieza "${b.name.slice(0, 24)}"> { grid-column: ${full ? '1 / -1' : `${b.start} / ${b.end + 1}`}; grid-row: ${b.row}; }`);
  if (!base) console.log('  }');
}
console.log('  (12 columnas aplican desde el primer rango con 12; en móvil/tablet, spans ≤ --grid-columns de ese rango)');

if (args.meta) {
  const types = [...new Set(results.map((r) => r.type))];
  const desk = results.filter((r) => r.grid.cols >= 12);
  const small = results.filter((r) => r.grid.cols < 12);
  const meta = {
    layout: {
      type: types.join(' · '),
      grid: `${desk[0]?.grid.cols || 12} columnas desde ${desk[0]?.bp.min ?? '?'} px (${desk[0]?.bp.label || '—'})` +
        (small.length ? `; ${small.map((r) => `${r.grid.cols} col en ${r.bp.label}: ${r.blocks.every((b) => !b.fits || (b.start === 1 && b.span === r.grid.cols)) ? 'apilado a ancho completo' : 'spans propios'}`).join('; ')}` : ''),
      columns: desk.flatMap((r) => r.blocks.filter((b) => b.fits).map((b) => {
        const free = r.free[b.row - 1] || [];
        return { variant: r.variant, piece: b.name, columns: `${b.start}–${b.end}${free.length && free.length < r.grid.cols ? ` (libres ${free.join(', ')})` : ''}` };
      })),
      noColumns: desk.filter((r) => !r.blocks.some((b) => b.fits)).map((r) => r.variant),
    },
  };
  console.log('\nBorrador meta.layout (revisa nombres de pieza y variante antes de pegarlo en el meta.json):');
  console.log(JSON.stringify(meta.layout, null, 2));
}
