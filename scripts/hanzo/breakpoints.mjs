#!/usr/bin/env node
/**
 * breakpoints.mjs — Propone los RANGOS de breakpoints a partir de la documentación de layout de Figma.
 *
 * Los modos de la colección responsive se llaman por el ancho de su frame de ejemplo ("LG - 1024"),
 * pero cada frame es solo un punto dentro de su rango (L = 960–1279). Los @media deben empezar en el
 * INICIO DEL RANGO, no en el ancho del frame.
 *
 * Entrada:
 *   .ai/figma/layout-doc.json   (snippets/layout-doc.js sobre la doc de layout de Foundations)
 *   .ai/figma/variables.json    (modos de la colección responsive)
 *
 * Uso:
 *   node scripts/breakpoints.mjs [--doc .ai/figma/layout-doc.json] [--write]
 *   node scripts/breakpoints.mjs --set "390=0,480=401,768=481,1024=960,1440=1280,1620=1620,1920=1920" --write
 *
 * Salida: tabla Modo · Frame · Rango · Columnas, avisos de HUECOS y SOLAPES entre rangos (p. ej. la doc
 * dice "XL 1280–1599 / XXL 1620–1919" → hueco 1600–1619: ¿errata?) y de modos sin rango (→ preguntar).
 * --write guarda el mapa en hanzo.config.json → breakpoints (solo tras confirmarlo con el usuario).
 */

import { parseArgs, readJson, writeJson, loadConfig, modeWidth, die } from './lib.mjs';

const args = parseArgs();
const cfg = await loadConfig();
const vars = await readJson('.ai/figma/variables.json', null);
const resp = vars?.collections?.find((c) => c.modes.length > 1 && c.modes.every((m) => modeWidth(m)));
const modes = (resp?.modes || Object.keys(cfg.breakpoints || {}).filter((k) => /^\d+$/.test(k)))
  .map((m) => ({ label: String(m), w: modeWidth(m) })).filter((m) => m.w).sort((a, b) => a.w - b.w);
if (!modes.length) die('No encuentro los modos responsive (.ai/figma/variables.json). Haz antes el volcado de variables.');
const colsAt = (W) => {
  const gs = (vars?.gridStyles || []).map((g) => ({ w: modeWidth(g.name), c: (g.layoutGrids || []).find((l) => l.pattern === 'COLUMNS') })).filter((g) => g.w && g.c);
  const best = gs.sort((a, b) => Math.abs(a.w - W) - Math.abs(b.w - W))[0];
  return best && Math.abs(best.w - W) <= 40 ? best.c.count : '?';
};

// 1. Rangos: de --set, o de la doc de layout
let ranges = [];
if (args.set) {
  const starts = Object.fromEntries(String(args.set).split(',').map((p) => p.split('=').map(Number)));
  const sorted = modes.map((m) => ({ ...m, min: starts[m.w] })).filter((m) => m.min != null);
  ranges = sorted.map((m, i) => ({ min: m.min, max: i < sorted.length - 1 ? sorted[i + 1].min - 1 : Infinity, src: '--set', mode: m }));
} else {
  const doc = await readJson(args.doc || '.ai/figma/layout-doc.json', null);
  if (!doc) die('Falta .ai/figma/layout-doc.json (snippets/layout-doc.js). Si el Figma no tiene doc de layout, PREGUNTA los rangos al usuario y usa --set.');
  const RE = /(\d{3,4})\s*(?:px)?\s*(?:[–—-]|to|a|hasta)\s*(\d{3,4})|(\d{3,4})\s*(?:px)?\s*\+|(?:[<≤]|hasta|up to|max\.?|(?:^|\s)[–—-])\s*(\d{3,4})|(?:[>≥]|desde|from|min\.?)\s*(\d{3,4})/gi;
  for (const r of doc.ranges || []) {
    for (const m of String(r.text).matchAll(RE)) {
      const [, a, b, plus, upTo, from] = m;
      const rg = a ? { min: +a, max: +b } : plus ? { min: +plus, max: Infinity } : upTo ? { min: 0, max: +upTo } : { min: +from, max: Infinity };
      if (rg.max < rg.min) continue;
      ranges.push({ ...rg, src: `${r.frame || r.parent || ''}: "${String(r.text).trim().slice(0, 40)}"`, near: r.near || [] });
    }
  }
  // quitar duplicados exactos
  ranges = ranges.filter((r, i) => ranges.findIndex((x) => x.min === r.min && x.max === r.max) === i).sort((a, b) => a.min - b.min);
  // asociar cada modo al rango que contiene su ancho (si varios, el más estrecho)
  for (const m of modes) {
    const hit = ranges.filter((r) => r.min <= m.w && m.w <= r.max).sort((a, b) => (a.max - a.min) - (b.max - b.min))[0];
    if (hit && !hit.mode) hit.mode = m;
  }
  ranges = ranges.filter((r) => r.mode);
}

// 2. Tabla + huecos/solapes
const warn = [];
const byMode = new Map(ranges.map((r) => [r.mode.w, r]));
const fmt = (n) => (n === Infinity ? '+' : n);
console.log('\nModo                 | Frame | Rango          | Columnas | Fuente');
for (const m of modes) {
  const r = byMode.get(m.w);
  if (!r) warn.push(`Modo "${m.label}" sin rango en la doc → pregúntalo al usuario (no asumas "ancho del frame = inicio")`);
  console.log(`${m.label.padEnd(20)} | ${String(m.w).padStart(5)} | ${r ? `${r.min} – ${fmt(r.max)}`.padEnd(14) : '¿?'.padEnd(14)} | ${String(colsAt(m.w)).padStart(8)} | ${r?.src || ''}`);
}
const sorted = [...byMode.values()].sort((a, b) => a.min - b.min);
for (let i = 1; i < sorted.length; i++) {
  const p = sorted[i - 1], c = sorted[i];
  if (c.min > p.max + 1) warn.push(`HUECO ${p.max + 1}–${c.min - 1} px entre ${p.mode.label} (${p.min}–${fmt(p.max)}) y ${c.mode.label} (${c.min}–${fmt(c.max)}) → ¿errata? Confirma con el usuario (en Joselito XL iba de 1280 a 1619)`);
  if (c.min <= p.max) warn.push(`SOLAPE ${c.min}–${Math.min(p.max, c.max)} px entre ${p.mode.label} y ${c.mode.label} → confirma con el usuario`);
}
if (sorted[0] && sorted[0].min > 0 && sorted[0].mode === modes[0]) warn.push(`El rango más pequeño empieza en ${sorted[0].min}: el modo base (${modes[0].label}) se aplica desde 0 (mobile-first)`);

// 3. Propuesta: inicio de cada rango (el modo base siempre 0; un hueco se cierra alargando el rango anterior)
const proposal = { $comment: 'Inicio del rango de cada modo responsive (doc de layout de Figma).' };
modes.forEach((m, i) => { const r = byMode.get(m.w); proposal[String(m.w)] = i === 0 ? 0 : r ? r.min : m.w; });
console.log('\nPropuesta hanzo.config.json → breakpoints:\n' + JSON.stringify(proposal));
if (warn.length) { console.log(`\n⚠ ${warn.length} avisos:`); for (const w of warn) console.log('  - ' + w); }

if (args.write) {
  if (modes.some((m) => !byMode.get(m.w)) && !args.set) die('Hay modos sin rango: confírmalos con el usuario y usa --set antes de --write.');
  cfg.breakpoints = proposal;
  await writeJson('hanzo.config.json', cfg);
  console.log('\n✓ hanzo.config.json → breakpoints actualizado. Regenera tokens: npm run tokens');
} else console.log('\n(Confirma con el usuario y vuelve a ejecutar con --write)');
