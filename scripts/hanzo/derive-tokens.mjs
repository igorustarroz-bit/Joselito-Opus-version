#!/usr/bin/env node
/**
 * derive-tokens.mjs — Para Figma EXTERNOS sin variables (nivel B/C): propone un sistema de tokens a
 * partir de los valores realmente usados (snippets/values-inventory.js). Es una PROPUESTA: hay que
 * revisarla con el usuario antes de usarla.
 *
 * Entrada: .ai/figma/values/*.json
 * Salida:
 *   .ai/figma/variables.proposed.json  mismo formato que variables.json → tokens-from-figma.mjs
 *   .ai/figma/value-map.json           valor crudo → token (para traducir el código de get_design_context)
 *   .ai/figma/tokens-proposal.md       informe para aprobar (qué se agrupó, qué se descartó)
 *
 * Uso:
 *   node scripts/derive-tokens.mjs [--min-uses 2] [--color-distance 6] [--spacing-step 4]
 *   Tras aprobar:  mv .ai/figma/variables.proposed.json .ai/figma/variables.json
 *
 * Si el fichero tiene ESTILOS locales (paint/text) pero no variables, conviene leerlos además con
 * snippets/variables.js (exporta los text styles) y usar sus nombres: este script solo cubre lo que falte.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs, readJson, writeJson, writeFile, exists, die } from './lib.mjs';

const args = parseArgs();
const MIN = Number(args['min-uses'] || 2);
const DIST = Number(args['color-distance'] || 6);
const STEP = Number(args['spacing-step'] || 4);
const dir = '.ai/figma/values';
if (!(await exists(dir))) die(`No existe ${dir}. Ejecuta snippets/values-inventory.js por página.`);
const pages = [];
for (const f of (await fs.readdir(dir)).filter((f) => f.endsWith('.json'))) pages.push(await readJson(path.join(dir, f)));

const merge = (key, sub) => { const o = {}; for (const p of pages) for (const [k, v] of Object.entries(sub ? p[key][sub] || {} : p[key] || {})) o[k] = (o[k] || 0) + v; return o; };
const report = ['# Propuesta de tokens (Figma externo)', '', `Páginas analizadas: ${pages.map((p) => p.page).join(', ')}`, ''];

// ---------- Colores ----------
const toRgb = (h) => { const x = h.replace('#', ''); return [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16)).concat(x.length > 6 ? parseInt(x.slice(6, 8), 16) / 255 : 1); };
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) + (Math.abs(a[3] - b[3]) * 255);
function hsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); const l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l]; const d = mx - mn; const s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [h * 60, s, l];
}
const HUES = [[15, 'Red'], [45, 'Orange'], [70, 'Yellow'], [160, 'Green'], [200, 'Teal'], [255, 'Blue'], [290, 'Purple'], [335, 'Pink'], [361, 'Red']];
const colorUse = { fill: merge('colors', 'fill'), text: merge('colors', 'text'), stroke: merge('colors', 'stroke') };
const all = {};
for (const k of Object.keys(colorUse)) for (const [h, n] of Object.entries(colorUse[k])) all[h] = (all[h] || 0) + n;
const clusters = [];
for (const [h, n] of Object.entries(all).sort((a, b) => b[1] - a[1])) {
  const rgb = toRgb(h);
  const c = clusters.find((c) => dist(c.rgb, rgb) <= DIST);
  if (c) { c.members.push(h); c.uses += n; } else clusters.push({ hex: h, rgb, members: [h], uses: n });
}
const kept = clusters.filter((c) => c.uses >= MIN);
const prim = []; const valueMap = { colors: {}, spacing: {}, radius: {}, textStyles: {} };
const usedNames = new Set();
for (const c of kept) {
  const [hh, s, l] = hsl(c.rgb);
  const fam = s < 0.12 ? 'Neutral' : HUES.find(([lim]) => hh < lim)[1];
  let name = `Color/${fam}/${Math.round(l * 100)}${c.rgb[3] < 1 ? `-a${Math.round(c.rgb[3] * 100)}` : ''}`;
  let i = 2; while (usedNames.has(name)) name = `${name}-${i++}`; usedNames.add(name);
  c.name = name; prim.push([name, 'C', c.hex]);
  for (const m of c.members) valueMap.colors[m] = name;
}
const dropped = clusters.filter((c) => c.uses < MIN);
report.push('## Colores', '', `${Object.keys(all).length} colores distintos → ${kept.length} primitivas (agrupando a distancia ≤ ${DIST}; descartados ${dropped.length} con < ${MIN} usos).`, '');
report.push('| Primitiva | Valor | Usos | Variantes agrupadas |', '|---|---|---|---|', ...kept.map((c) => `| ${c.name} | ${c.hex} | ${c.uses} | ${c.members.length > 1 ? c.members.slice(1, 6).join(', ') : ''} |`), '');
if (dropped.length) report.push(`Descartados (posibles errores del diseño): ${dropped.slice(0, 20).map((d) => `${d.hex}×${d.uses}`).join(', ')}`, '');

// Semánticos mínimos por uso
const top = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]).map(([h]) => valueMap.colors[h]).filter(Boolean);
const uniq = (xs) => [...new Set(xs)];
const sem = [];
const bg = uniq(top(colorUse.fill)), tx = uniq(top(colorUse.text)), st = uniq(top(colorUse.stroke));
if (bg[0]) sem.push(['Backgrounds/Base', 'C', `{Primitives::${bg[0]}}`]);
const isNeutral = (n) => n && n.startsWith('Color/Neutral/');
bg.filter(isNeutral).filter((n) => n !== bg[0]).slice(0, 3).forEach((n, i) => sem.push([`Backgrounds/Neutral-${i + 1}`, 'C', `{Primitives::${n}}`]));
if (tx[0]) sem.push(['Texts/Base', 'C', `{Primitives::${tx[0]}}`]);
tx.filter(isNeutral).filter((n) => n !== tx[0]).slice(0, 3).forEach((n, i) => sem.push([`Texts/Neutral-${i + 1}`, 'C', `{Primitives::${n}}`]));
if (st[0]) sem.push(['Strokes-Icons/Base', 'C', `{Primitives::${st[0]}}`]);
const accent = kept.find((c) => hsl(c.rgb)[1] > 0.4);
if (accent) sem.push(['Backgrounds/Accent-Base', 'C', `{Primitives::${accent.name}}`], ['Texts/Accent-Base', 'C', `{Primitives::${accent.name}}`]);
report.push('## Semánticos propuestos (modo único "Default")', '', ...sem.map((s) => `- ${s[0]} → ${s[2]}`), '', '> Revisar con el usuario: el uso real (fondo/texto/acento) manda sobre la frecuencia.', '');

// ---------- Espaciados y radios ----------
function scale(obj, prefix) {
  const snapped = {};
  for (const [v, n] of Object.entries(obj)) { const x = Number(v); const s = x <= 128 && Math.abs(x - Math.round(x / STEP) * STEP) <= 1 ? Math.round(x / STEP) * STEP : x; snapped[s] = (snapped[s] || 0) + n; }
  const vals = Object.entries(snapped).filter(([, n]) => n >= MIN).map(([v]) => Number(v)).sort((a, b) => a - b);
  return vals.map((v, i) => [`${prefix}/${i + 1}`, 'F', v]);
}
const spacing = scale(merge('spacing'), 'Spacers');
for (const [n, , v] of spacing) valueMap.spacing[v] = n;
const radius = scale(merge('radius'), 'Corners');
for (const [n, , v] of radius) valueMap.radius[v] = n;
report.push('## Espaciados', '', spacing.map((s) => `${s[0]}=${s[2]}`).join(' · ') || '—', '', '## Radios', '', radius.map((s) => `${s[0]}=${s[2]}`).join(' · ') || '—', '');

// ---------- Breakpoints (anchos de frame de primer nivel) ----------
const widths = Object.entries(merge('widths')).map(([w, n]) => [Number(w), n]).filter(([w, n]) => w >= 320 && w <= 2560 && n >= 1).sort((a, b) => b[1] - a[1]);
const bps = [...new Set(widths.map(([w]) => w))].filter((w, i, arr) => arr.findIndex((x) => Math.abs(x - w) < 40) === i).slice(0, 5).sort((a, b) => a - b);
report.push('## Breakpoints candidatos', '', bps.map((w) => `${w}px`).join(' · ') || '—', '', '> Confirmar con el usuario. Con un solo ancho, el responsive se infiere en código.', '');

// ---------- Tipografía ----------
const fonts = Object.entries(merge('fonts')).map(([k, n]) => { const [family, style, size, lh] = k.split('|'); return { family, style, size: Number(size), lh, n }; }).filter((f) => f.n >= MIN).sort((a, b) => b.size - a.size);
const textStyles = []; let t = 0, b = 0;
for (const f of fonts) {
  const isTitle = f.size >= 28 || /bold|black|semi/i.test(f.style) && f.size >= 20;
  const name = isTitle ? `Title/${String(++t).padStart(2, '0')}` : `Body/${String(++b).padStart(2, '0')}`;
  textStyles.push({ name, family: f.family, style: f.style, size: f.size, lineHeight: f.lh === 'auto' || f.lh === 'mixed' ? 'auto' : /%$/.test(f.lh) ? f.lh : Number(f.lh), letterSpacing: '0px', bound: {} });
  valueMap.textStyles[`${f.family}|${f.style}|${f.size}`] = name;
}
// renumerar títulos de mayor a menor como en la plantilla Hanzo (Title/0N mayor = más grande)
const titles = textStyles.filter((x) => x.name.startsWith('Title'));
titles.forEach((x, i) => { const nn = `Title/${String(titles.length - i).padStart(2, '0')}`; for (const k of Object.keys(valueMap.textStyles)) if (valueMap.textStyles[k] === x.name) valueMap.textStyles[k] = nn; x.name = nn; });
const bodies = textStyles.filter((x) => x.name.startsWith('Body'));
bodies.forEach((x, i) => { const nn = `Body/${String(bodies.length - i).padStart(2, '0')}`; for (const k of Object.keys(valueMap.textStyles)) if (valueMap.textStyles[k] === x.name) valueMap.textStyles[k] = nn; x.name = nn; });
report.push('## Estilos de texto', '', '| Estilo | Fuente | Tamaño / interlineado |', '|---|---|---|', ...textStyles.map((x) => `| ${x.name} | ${x.family} ${x.style} | ${x.size} / ${x.lineHeight} |`), '');

const famUse = {}; for (const f of fonts) famUse[f.family] = (famUse[f.family] || 0) + f.n;
const fam = Object.keys(famUse).sort((a, b) => famUse[b] - famUse[a]);
const collections = [
  { name: 'Primitives', modes: ['Default'], vars: [...prim, ...spacing, ...radius, ...fam.map((f, i) => [`Typography/Font-Family/${i === 0 ? 'Body' : `Family-${i + 1}`}`, 'S', f])] },
  { name: 'Semantic-Color', modes: ['Default'], vars: sem },
];
if (bps.length > 1) collections.push({ name: 'Responsive', modes: bps.map((w) => `BP - ${w}`), vars: [['Layout/Viewport-width/Size', 'F', bps]] });

await writeJson('.ai/figma/variables.proposed.json', { proposed: true, collections, textStyles, effectStyles: [] });
await writeJson('.ai/figma/value-map.json', valueMap);
await writeFile('.ai/figma/tokens-proposal.md', report.join('\n'));
console.log(`✓ Propuesta: ${prim.length} colores · ${sem.length} semánticos · ${spacing.length} espaciados · ${radius.length} radios · ${textStyles.length} estilos de texto · breakpoints ${bps.join('/') || '—'}`);
console.log('  Revisa .ai/figma/tokens-proposal.md con el usuario. Aprobada → mv .ai/figma/variables.proposed.json .ai/figma/variables.json');
