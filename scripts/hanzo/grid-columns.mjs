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
 * INTERPRETACIÓN VISUAL (módulos sin autolayout, sin constraints y con capas sin nombre): cada pieza
 * de primer nivel recibe un ROL deducido de la geometría y de las pistas de layout-boxes.js, en este
 * orden (la primera regla que encaja gana; references/figma-contract.md §Lectura):
 *   nav (M01 dentro → no se programa) · sliver (1–2 px en un borde → insinuación de slide) ·
 *   carousel (desborda el frame con hijos repetidos) · art (desborda/solapa sin repetirse) ·
 *   background (cubre el frame con imagen/vídeo) · overlay (velo/degradado a sangre sobre la imagen) ·
 *   bleed (toca el borde: 100 / 50 / 33 %) · columns (empieza en columna y mide N) ·
 *   centered (centrado en el eje del frame: N columnas centradas) · start / end (empieza o termina en una
 *   columna con ancho propio: botones, etiquetas) · anchor (pegado a esquina/borde con
 *   margen constante) · ask (nada encaja → preguntar con la medida, nunca cuadrarlo a ojo).
 * El orden de lectura (HTML y apilado en móvil) sale de la posición visual, no del panel de capas.
 * Las constraints de Figma, si existen y no son las de por defecto, se muestran como confirmación.
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
  if (nodes.length === 1 && nodes[0].children?.length && !nodes[0].repeat) nodes = nodes[0].children;
  if (LEVEL > 1) nodes = nodes.flatMap((n) => (n.children?.length ? n.children : [n]));
  return nodes;
}

const NAV = /^m0?1\b|navigation|navbar|header-nav/i;
const MEDIA = /aspect|ratio|image|imagen|foto|photo|video|v[ií]deo|picture/i;
function roleOf(b, G, H, ctx) {
  const T = TOL;
  const out = (role, extra = {}) => ({ role, ...extra });
  const right = G.W - (b.x + b.w), bottom = H - (b.y + b.h);
  const covers = b.x <= T && right <= T;
  if (b.type === 'INSTANCE' && NAV.test(`${b.comp || ''} ${b.name}`) && b.y <= T && b.w >= G.W * 0.9) return out('nav');
  if ((b.w <= 2 || b.h <= 2) && (b.x >= G.W - 3 || b.x <= 1 || b.y <= 1 || b.y >= H - 3)) return out('sliver');
  if (b.x < -T || b.x + b.w > G.W + T) return out(b.repeat || b.kids >= 3 || b.layout?.mode === 'HORIZONTAL' || /carousel|slider|track|slot|marquee/i.test(b.name) ? 'carousel' : 'art');
  const isMedia = (b.fill || []).some((f) => f === 'IMAGE' || f === 'VIDEO') || MEDIA.test(`${b.comp || ''} ${b.name}`);
  if (covers && b.h >= H * 0.9 && isMedia) return out('background');
  if (covers && (b.type === 'RECTANGLE' || b.type === 'VECTOR' || (b.fill || []).includes('GRADIENT') || b.opacity < 1) && !isMedia && ctx.hasBackground) return out('overlay');
  if (covers && b.h >= H * 0.9 && (b.type === 'RECTANGLE' || b.type === 'VECTOR')) return out('background');
  // a sangre: toca un borde lateral y mide 100 / 50 / 33 % (±TOL)
  const touches = b.x <= T || right <= T;
  if (touches && b.w >= G.W * 0.25) {
    const pct = [100, 50, 33.333, 66.667].find((p) => Math.abs(b.w - G.W * p / 100) <= T);
    if (pct) return out('bleed', { pct: Math.round(pct), side: covers ? 'full' : b.x <= T ? 'left' : 'right' });
  }
  if (b.fits) return out('columns');
  const step = G.colW + G.gutter;
  const span = Math.max(1, Math.round((b.w + G.gutter) / step));
  const spanErr = Math.abs(span * G.colW + (span - 1) * G.gutter - b.w);
  if (Math.abs(b.x + b.w / 2 - G.W / 2) <= T) return out('centered', { span: spanErr <= T ? span : null });
  // empieza en una columna pero con ancho propio (botón, etiqueta, texto corto) → en flujo, fit-content
  const startCol = Math.round((b.x - G.margin) / step) + 1;
  const startErr = Math.abs(G.margin + (startCol - 1) * step - b.x);
  const endCol = Math.round((b.x + b.w - G.margin + G.gutter) / step);
  const endErr = Math.abs(G.margin + endCol * step - G.gutter - (b.x + b.w));
  if (startCol >= 1 && startCol <= G.cols && startErr <= T && b.w < G.W * 0.5) return out('start', { col: startCol });
  if (endCol >= 1 && endCol <= G.cols && endErr <= T && b.w < G.W * 0.5 && !(G.W - (b.x + b.w) <= T)) return out('end', { col: endCol });
  // anclaje: pegado a un borde con el margen de la rejilla (o el mismo margen en las dos direcciones)
  const sides = [];
  if (Math.abs(b.x - G.margin) <= T || b.x <= T) sides.push(`left ${Math.round(b.x)}`);
  if (Math.abs(right - G.margin) <= T || right <= T || (bottom >= 0 && Math.abs(right - bottom) <= T && right <= 2 * G.margin)) sides.push(`right ${Math.round(right)}`);
  if (bottom >= 0 && bottom <= 2 * G.margin && (sides.some((s) => s.startsWith('right')) || Math.abs(bottom - b.x) <= T)) sides.push(`bottom ${Math.round(bottom)}`);
  if (b.y >= 0 && b.y <= T) sides.push('top 0');
  if (sides.some((x) => x.startsWith('right') || x.startsWith('bottom'))) return out('anchor', { sides });
  return out('ask');
}

function analyse(layout) {
  const G = gridFor(layout);
  const H = layout.h;
  const step = G.colW + G.gutter;
  const rows = [];
  const raw = blocksOf(layout);
  const rootMedia = (layout.tree.fill || []).some((f) => f === 'IMAGE' || f === 'VIDEO');
  const hasBackground = rootMedia || raw.some((b) => b.x <= TOL && G.W - (b.x + b.w) <= TOL && b.h >= H * 0.9 && ((b.fill || []).some((f) => f === 'IMAGE' || f === 'VIDEO') || MEDIA.test(`${b.comp || ''} ${b.name}`)));
  const res = raw.map((b) => {
    const fullBleed = b.x <= 1 && b.w >= G.W - 2;
    const start = Math.round((b.x - G.margin) / step) + 1;
    const span = Math.max(1, Math.round((b.w + G.gutter) / step));
    const predX = G.margin + (start - 1) * step;
    const predW = span * G.colW + (span - 1) * G.gutter;
    const errX = Math.round(Math.abs(predX - b.x)), errW = Math.round(Math.abs(predW - b.w));
    const err = Math.max(errX, errW);
    const fits = !fullBleed && start >= 1 && start + span - 1 <= G.cols && err <= TOL && b.x >= -TOL && b.x + b.w <= G.W + TOL;
    const R = roleOf({ ...b, fits, small: b.w < G.W * 0.35 }, G, H, { hasBackground });
    const hint = b.bind ? Object.entries(b.bind).map(([k, v]) => `${k}=${String(v).split('/').at(-1)}`).join(' ') : '';
    const spanFromVar = /width/.test(Object.keys(b.bind || {}).join()) ? Number((String(b.bind.width || '').match(/(\d+)\s*cols?$/i) || [])[1]) || null : null;
    const cons = b.constraints && !(b.constraints.horizontal === 'MIN' && b.constraints.vertical === 'MIN') ? `${b.constraints.horizontal}/${b.constraints.vertical}` : '';
    return { name: b.name, type: b.type, comp: b.comp, x: b.x, y: b.y, w: b.w, h: b.h, start, span, end: start + span - 1, err, errX, errW, fits: R.role === 'columns', fullBleed, overlay: Boolean(b.absolute), autolayout: b.layout?.mode || null, hint, spanFromVar, cons, ...R };
  });
  // Filas y columnas libres solo con piezas de contenido en columnas
  for (const b of res) {
    if (!b.fits) { b.row = 0; continue; }
    let row = rows.findIndex((r) => b.y < r.y2 && b.y + b.h > r.y1);
    if (row === -1) { rows.push({ y1: b.y, y2: b.y + b.h }); row = rows.length - 1; }
    else { rows[row].y1 = Math.min(rows[row].y1, b.y); rows[row].y2 = Math.max(rows[row].y2, b.y + b.h); }
    b.row = row + 1;
  }
  const free = rows.map((_, i) => {
    const used = new Set(res.filter((b) => b.row === i + 1).flatMap((b) => Array.from({ length: b.span }, (_, k) => b.start + k)));
    return used.size ? Array.from({ length: G.cols }, (_, k) => k + 1).filter((c) => !used.has(c)) : [];
  });
  // Solapes entre piezas de contenido (no fondo/velo/nav) → composición artística
  const content = res.filter((b) => !['background', 'overlay', 'nav', 'sliver'].includes(b.role));
  let overlaps = 0;
  for (let i = 0; i < content.length; i++) for (let j = i + 1; j < content.length; j++) { const a = content[i], c = content[j]; if (a.x < c.x + c.w - 2 && c.x < a.x + a.w - 2 && a.y < c.y + c.h - 2 && c.y < a.y + a.h - 2) overlaps++; }
  // Solapes entre piezas que NO están en columnas = collage; entre piezas en columnas = capas a propósito
  const loose = content.filter((b) => b.role !== 'columns');
  let looseOverlaps = 0;
  for (let i = 0; i < loose.length; i++) for (let j = i + 1; j < loose.length; j++) { const a = loose[i], c = loose[j]; if (a.x < c.x + c.w - 2 && c.x < a.x + a.w - 2 && a.y < c.y + c.h - 2 && c.y < a.y + a.h - 2) looseOverlaps++; }
  const art = looseOverlaps >= 3 || res.filter((b) => b.role === 'art').length >= 3;
  if (art) for (const b of content) b.role = 'art';
  // Orden de lectura = orden visual (arriba-abajo, izquierda-derecha)
  const reading = content.filter((b) => b.role !== 'art').sort((a, c) => a.y - c.y || a.x - c.x).map((b) => b.name);
  const layerOrder = content.filter((b) => b.role !== 'art').map((b) => b.name);
  const orderDiffers = reading.join('|') !== layerOrder.join('|') && reading.join('|') !== [...layerOrder].reverse().join('|');
  const container = layout.tree.children?.length === 1 && layout.tree.children[0].children?.length ? layout.tree.children[0] : layout.tree;
  const containerHint = [...new Set([layout.tree, container])].map((n) => n.bind ? Object.entries(n.bind).map(([k, v]) => `${k}=${String(v).split('/').at(-1)}`).join(' ') : '').filter(Boolean).join(' · ');
  const spaceBetween = [layout.tree, container].some((n) => n.layout?.align === 'SPACE_BETWEEN');
  const nFit = res.filter((b) => b.fits).length;
  const nBleed = res.filter((b) => b.role === 'bleed' || b.role === 'background').length + (rootMedia ? 1 : 0);
  const type = art ? 'Composición artística' : nBleed && nFit ? 'Mezcla' : nBleed ? 'A sangre' : res.some((b) => b.role === 'centered') && !nFit ? 'Columnas (centrado)' : 'Columnas';
  const variant = (layout.variant ? Object.entries(layout.variant).filter(([k]) => !/device/i.test(k)).map(([, v]) => v).join(' · ') : '') ||
    (layout.variant ? Object.values(layout.variant).join(' · ') : '') || layout.name;
  const notMaster = layout.type && !/COMPONENT/.test(layout.type);
  return { name: layout.name, variant, grid: G, bp: rangeFor(G.W, G.cols), blocks: res, free, containerHint, spaceBetween, type, reading, orderDiffers, overlaps, art, rootMedia, notMaster };
}

const ROLE_TXT = {
  nav: () => 'navegación dentro del módulo → NO se programa; anotar «va bajo la navegación»',
  sliver: () => 'tira de 1–2 px en el borde → insinuación del siguiente slide, no es contenido',
  carousel: (b) => `desborda el frame${b.repeat ? ` con ${b.repeat} elementos repetidos` : ''} → carrusel con scroll horizontal`,
  art: () => 'composición artística → bloque único; proponer cómo escala (proporcional / recorte centrado)',
  background: () => 'fondo a sangre (imagen/vídeo que cubre el frame)',
  overlay: () => 'velo/degradado sobre el fondo → capa a sangre con el token más cercano',
  bleed: (b) => `a sangre ${b.pct} %${b.side !== 'full' ? ` (${b.side === 'left' ? 'izquierda' : 'derecha'})` : ''}`,
  columns: () => '',
  centered: (b) => b.span ? `centrado: ${b.span} columnas centradas` : 'centrado en el eje del frame (ancho libre)',
  start: (b) => `empieza en la columna ${b.col} con ancho propio (fit-content)`,
  end: (b) => `termina en la columna ${b.col} con ancho propio (alineado a la derecha)`,
  anchor: (b) => `anclado: ${b.sides.join(' · ')} px`,
  ask: (b) => `⚠ no encaja (posición ±${b.errX}px, ancho ±${b.errW}px): mirar la captura; si sigue sin estar claro, preguntar con la medida`,
};

const results = [];
for (const f of args._) results.push(analyse(await readJson(f)));
results.sort((a, b) => a.grid.W - b.grid.W); // móvil primero

if (args.json) { console.log(JSON.stringify(results, null, 2)); process.exit(0); }

for (const r of results) {
  const G = r.grid;
  console.log(`\n${r.name} — ${G.W}px · ${G.cols} col · gutter ${G.gutter} · margen ${G.margin} · col ${G.colW.toFixed(1)}px · rango ${r.bp.label} desde ${r.bp.min}px · tipología sugerida: ${r.type}`);
  if (r.notMaster) console.log('  ⚠ no es un máster (componente/component set): pedir a diseño que lo convierta (único acuerdo obligatorio)');
  if (r.containerHint) console.log(`  pistas del contenedor: ${r.containerHint}`);
  if (r.spaceBetween) console.log('  contenedor con SPACE_BETWEEN: las columnas restantes quedan LIBRES (no es un gap)');
  console.log('  fila | bloque                         | rol        | columnas | span | error | nota');
  for (const b of r.blocks) {
    const note = [ROLE_TXT[b.role](b),
      b.spanFromVar && b.spanFromVar !== b.span ? `⚠ ancho ligado a ${b.spanFromVar}cols pero mide ${b.span}` : '', b.hint ? `Figma: ${b.hint}` : '', b.cons ? `constraints ${b.cons}` : ''].filter(Boolean).join(' · ');
    const cols = b.fits ? `${b.start}–${b.end}` : '—';
    const span = b.fits ? b.span : b.role === 'centered' && b.span ? b.span : '—';
    const err = b.fits || b.role === 'ask' ? b.err : '—';
    console.log(`  ${String(b.row || '').padStart(4)} | ${b.name.slice(0, 30).padEnd(30)} | ${b.role.padEnd(10)} | ${cols.padStart(8)} | ${String(span).padStart(4)} | ${String(err).padStart(5)} | ${note}`);
  }
  r.free.forEach((f, i) => { if (f.length && f.length < G.cols) console.log(`  fila ${i + 1}: columnas libres ${f.join(', ')}`); });
  if (r.reading.length > 1) console.log(`  orden de lectura (HTML y apilado en móvil): ${r.reading.join(' → ')}${r.orderDiffers ? '  (≠ orden de capas: manda el visual)' : ''}`);
  if (r.art) console.log(`  piezas sueltas que se solapan o desbordan: composición artística (bloque único, proponer escalado)`);
  else if (r.overlaps) console.log(`  ${r.overlaps} solape(s) entre piezas en columnas: capas a propósito (misma grid-row; z-index según la captura)`);
  if (r.rootMedia) console.log('  el propio frame tiene imagen/vídeo de relleno: fondo a sangre del módulo');
  const asks = r.blocks.filter((b) => b.role === 'ask');
  if (asks.length) console.log(`  → ${asks.length} pieza(s) sin interpretar: compáralas con la captura (get_screenshot) antes de preguntar`);
}

// CSS sugerido: grid-column sobre la rejilla del sistema, @media en el inicio de rango
console.log('\nCSS sugerido (rejilla del sistema; las columnas libres salen solas de grid-column):');
for (const r of results) {
  const fit = r.blocks.filter((b) => b.fits);
  if (!fit.length) {
    const why = r.art ? 'bloque único (contenedor relative con aspect-ratio y piezas absolutas en %, o imagen exportada); confirmar el escalado'
      : r.type.startsWith('Columnas') ? 'piezas centradas (ver «Piezas fuera de columnas»)' : 'flex 50 % / 33 %, texto centrado';
    console.log(`  /* ${r.variant}: ${r.type} — sin piezas alineadas a columnas: ${why} */`); continue;
  }
  const full = fit.every((b) => b.start === 1 && b.span === r.grid.cols);
  const base = !r.bp.min;
  const ind = base ? '  ' : '    ';
  console.log(base ? `  /* base mobile-first · ${r.bp.label} · ${r.variant} */` : `  @media (min-width: ${r.bp.min}px) { /* ${r.bp.label} · ${r.variant} */`);
  for (const b of fit) console.log(`${ind}.<pieza "${b.name.slice(0, 24)}"> { grid-column: ${full ? '1 / -1' : `${b.start} / ${b.end + 1}`}; grid-row: ${b.row}; }`);
  if (!base) console.log('  }');
}
console.log('  (12 columnas aplican desde el primer rango con 12; en móvil/tablet, spans ≤ --grid-columns de ese rango)');
// Piezas fuera de columnas: cómo se traducen
const extra = results.flatMap((r) => r.blocks.filter((b) => ['centered', 'start', 'end', 'anchor', 'bleed', 'background', 'overlay', 'carousel'].includes(b.role)).map((b) => [r, b]));
if (extra.length) {
  console.log('\nPiezas fuera de columnas (traducción sugerida):');
  for (const [r, b] of extra) {
    const css = b.role === 'centered' ? (b.span && (r.grid.cols - b.span) % 2 === 0 ? `grid-column: ${(r.grid.cols - b.span) / 2 + 1} / span ${b.span}` : b.span ? `justify-self: center; width: <${b.span} columnas> (span impar en rejilla par: centrado entre columnas)` : 'justify-self: center (o margin-inline: auto)')
      : b.role === 'start' ? `grid-column: ${b.col} / -1; justify-self: start (fit-content)`
      : b.role === 'end' ? `grid-column: 1 / ${b.col + 1}; justify-self: end (fit-content)`
      : b.role === 'anchor' ? `position: absolute; ${b.sides.map((s) => { const [k, v] = s.split(' '); return `${k}: ${Number(v) === r.grid.margin ? 'var(--layout-grids-wrapper-default)' : `<token ≈ ${v}px>`}`; }).join('; ')}`
      : b.role === 'bleed' ? (b.pct === 100 ? 'ancho completo (fuera del padding del wrapper)' : `flex: 0 0 ${b.pct}%; ${b.side === 'right' ? 'order: 2 (a la derecha)' : ''}`)
      : b.role === 'background' ? 'position: absolute; inset: 0; object-fit: cover (detrás del contenido)'
      : b.role === 'overlay' ? 'position: absolute; inset: 0 (o franja inferior); background: <token de degradado/velo>'
      : 'overflow-x: auto; scroll-snap-type: x mandatory (carrusel)';
    console.log(`  ${r.variant} (${r.grid.W}) · ${b.name.slice(0, 28)} → ${css}`);
  }
}

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
      // Interpretación pieza a pieza (todas las variantes): rol + colocación. Revisar contra la captura.
      pieces: results.flatMap((r) => r.blocks.filter((b) => b.role !== 'columns').map((b) => ({
        variant: r.variant, width: r.grid.W, piece: b.name, role: b.role,
        placement: b.role === 'bleed' ? `${b.pct} % ${b.side}` : b.role === 'centered' ? (b.span ? `${b.span} col centradas` : 'centrado') : b.role === 'anchor' ? b.sides.join(' · ') : b.role === 'start' ? `desde col ${b.col}, fit-content` : b.role === 'end' ? `hasta col ${b.col}, fit-content` : ROLE_TXT[b.role](b),
      }))),
      order: Object.fromEntries(results.filter((r) => r.reading.length > 1).map((r) => [`${r.variant} (${r.grid.W})`, r.reading])),
    },
  };
  console.log('\nBorrador meta.layout (revisa nombres de pieza y variante antes de pegarlo en el meta.json):');
  console.log(JSON.stringify(meta.layout, null, 2));
}
