#!/usr/bin/env node
/**
 * tokens-from-figma.mjs — Convierte el volcado de variables/estilos de Figma en tokens de código.
 *
 * Entrada: el JSON que devuelve el snippet "Volcado de variables" (references/figma-read.md §3),
 * guardado por Claude en .ai/figma/variables.json. Formato:
 *   { collections: [{ name, modes: [..], vars: [[path, "C|F|S|B", valor | [valor por modo]]] }],
 *     textStyles: [{ name, family, style, size, lineHeight, letterSpacing, bound: { fontSize: "Col::Path" } }],
 *     effectStyles: [{ name, effects: [{ type, color, x, y, blur, spread, radius }] }] }
 *   Un alias se escribe como "{Coleccion::Ruta/De/La/Variable}".
 *
 * Salida (en --out, por defecto src/tokens):
 *   tokens.css           custom properties: primitivas en :root, responsive mobile-first con
 *                        @media (min-width), subtemas como [data-theme="slug"] (el 1er modo también en :root)
 *   typography.css       una clase .ts-<estilo> por estilo de texto (usa los tokens)
 *   effects.css          una clase .fx-<estilo> por estilo de efecto
 *   tailwind-theme.css   @theme inline para Tailwind v4 (solo colores SEMÁNTICOS, spacing, radius, fuentes, breakpoints)
 *   tokens.json          formato W3C Design Tokens (DTCG), con los modos en $extensions
 *   tokens.meta.json     breakpoints, subtemas y estilos (lo usan scaffold, Storybook y docs)
 *
 * Uso:
 *   node scripts/tokens-from-figma.mjs [--in .ai/figma/variables.json] [--out src/tokens]
 *        [--theme "Semantic-Color"] [--responsive "Responsive"] [--no-tailwind]
 *
 * Detección automática (sobrescribible con flags o con hanzo.config.json → figma.collections):
 *   - responsive = colección cuyos modos llevan un ancho (p. ej. "XL - 1440")
 *   - theme      = colección multi-modo restante con mayoría de colores
 */

import path from 'node:path';
import { parseArgs, slug, readJson, writeFile, writeJson, loadConfig, modeWidth, die, profilePaths, exists } from './lib.mjs';

const args = parseArgs();
const cfg = await loadConfig();
const IN = args.in || '.ai/figma/variables.json';
const P = profilePaths(cfg);
const OUT = args.out || P.tokens;
const dump = await readJson(IN);
if (!Array.isArray(dump.collections)) die(`${IN} no tiene "collections". ¿Es el volcado correcto?`);

const warnings = [];
const WEIGHTS = { thin: 100, hairline: 100, extralight: 200, ultralight: 200, light: 300, regular: 400, normal: 400, book: 400, roman: 400, medium: 500, semibold: 600, demibold: 600, bold: 700, extrabold: 800, ultrabold: 800, black: 900, heavy: 900 };
const weightOf = (s) => {
  const k = String(s).toLowerCase().replace(/italic|oblique/g, '').replace(/[\s_-]+/g, '');
  return WEIGHTS[k] ?? (/^\d{3}$/.test(k) ? Number(k) : null);
};
const isItalic = (s) => /italic|oblique/i.test(String(s));
const SERIF = /serif|georgia|times|garamond|bodoni|didot|caslon|baskerville|sangbleu|playfair|merriweather|lora|freight|tiempos|canela/i;
const fontStack = (f) => `"${f}", ${SERIF.test(f) && !/sans/i.test(f) ? 'serif' : 'sans-serif'}`;

// ---------- 1. Clasificar colecciones ----------
const cols = dump.collections.map((c) => ({ ...c, slug: slug(c.name) }));
const byName = Object.fromEntries(cols.map((c) => [c.name, c]));
const pick = (flag, cfgKey, test) => {
  const name = args[flag] || cfg.figma?.collections?.[cfgKey];
  if (name) return byName[name] || die(`No existe la colección "${name}"`);
  return cols.find(test);
};
const responsive = pick('responsive', 'responsive', (c) => c.modes.length > 1 && c.modes.every((m) => modeWidth(m)));
const theme = pick('theme', 'theme', (c) => c !== responsive && c.modes.length > 1 &&
  c.vars.filter((v) => v[1] === 'C').length > c.vars.length / 2);
for (const c of cols) c.role = c === responsive ? 'responsive' : c === theme ? 'theme' : c.modes.length > 1 ? 'modes' : 'base';

// ---------- 2. Nombres CSS (con prefijo de colección solo si hay colisión) ----------
const seen = {};
for (const c of cols) for (const [p] of c.vars) (seen[slug(p)] ||= new Set()).add(c.name);
const cssName = {}; // "Col::Path" -> "--x"
for (const c of cols) for (const [p] of c.vars) {
  const s = slug(p);
  cssName[`${c.name}::${p}`] = `--${seen[s].size > 1 ? c.slug + '-' : ''}${s}`;
}
const ref = (alias) => {
  const key = alias.slice(1, -1);
  const v = cssName[key];
  if (!v) { warnings.push(`Alias sin resolver: ${alias}`); return `/* ${alias} */ initial`; }
  return `var(${v})`;
};

// ---------- 3. Formateo de valores ----------
const UNITLESS = /(weight|opacity|ratio|scale|z-?index|count|columns?$|flex)/i;
function fmt(type, p, v) {
  if (typeof v === 'string' && /^\{.+::.+\}$/.test(v)) return ref(v);
  if (v === null || v === undefined) return 'initial';
  switch (type) {
    case 'C': return String(v);
    case 'F': return UNITLESS.test(p) ? String(+Number(v).toFixed(3)) : `${+Number(v).toFixed(2)}px`;
    case 'B': return v ? '1' : '0';
    case 'S': {
      if (/weight/i.test(p)) { const w = weightOf(v); if (w) return String(w); }
      if (/famil/i.test(p)) return fontStack(v);
      return JSON.stringify(String(v));
    }
    default: return String(v);
  }
}
const valuesFor = (c, v) => (Array.isArray(v[2]) ? v[2] : c.modes.map(() => v[2]));

// ---------- 4. tokens.css ----------
const L = [];
const block = (sel, lines, indent = '') => {
  if (!lines.length) return;
  L.push(`${indent}${sel} {`, ...lines.map((l) => `${indent}  ${l}`), `${indent}}`, '');
};
L.push('/* Generado por tokens-from-figma.mjs desde Figma. No editar a mano: regenerar. */', '');

for (const c of cols.filter((c) => c.role === 'base')) {
  L.push(`/* ${c.name} */`);
  block(':root', c.vars.map((v) => `${cssName[`${c.name}::${v[0]}`]}: ${fmt(v[1], v[0], valuesFor(c, v)[0])};`));
}

const breakpoints = [];
if (responsive) {
  const order = responsive.modes.map((m, i) => ({ m, i, w: modeWidth(m) })).sort((a, b) => a.w - b.w);
  for (const o of order) breakpoints.push({ name: slug(String(o.m).split(/\s*-\s*/)[0]) || `bp${o.w}`, label: o.m, width: o.w });
  L.push(`/* ${responsive.name} — mobile-first. Base: ${order[0].m}. */`);
  order.forEach((o, k) => {
    const lines = [];
    for (const v of responsive.vars) {
      const vals = valuesFor(responsive, v);
      const cur = fmt(v[1], v[0], vals[o.i]);
      if (k === 0 || cur !== fmt(v[1], v[0], vals[order[k - 1].i])) lines.push(`${cssName[`${responsive.name}::${v[0]}`]}: ${cur};`);
    }
    if (k === 0) block(':root', lines);
    else if (lines.length) { L.push(`@media (min-width: ${o.w}px) {`); block(':root', lines, '  '); L.push('}', ''); }
  });
}

// Grids de columnas por breakpoint (grid styles cuyo nombre lleva el ancho: "Layout/XS (390)")
const grids = (dump.gridStyles || []).map((g) => ({ name: g.name, w: modeWidth(g.name), col: (g.layoutGrids || []).find((l) => l.pattern === 'COLUMNS') }))
  .filter((g) => g.w && g.col).sort((a, b) => a.w - b.w);
if (grids.length) {
  L.push('/* Grid de columnas por breakpoint (grid styles de Figma) */');
  grids.forEach((g, k) => {
    const lines = [`--grid-columns: ${g.col.count};`, `--grid-gutter: ${g.col.gutter}px;`, `--grid-margin: ${g.col.offset || 0}px;`];
    if (k === 0) block(':root', lines);
    else { L.push(`@media (min-width: ${g.w}px) {`); block(':root', lines, '  '); L.push('}', ''); }
  });
}

const themes = [];
for (const c of cols.filter((c) => c.role === 'theme' || c.role === 'modes')) {
  const attr = c.role === 'theme' ? 'data-theme' : `data-${c.slug}`;
  L.push(`/* ${c.name} — ${c.modes.length} modos vía [${attr}] (el primero también en :root) */`);
  c.modes.forEach((m, i) => {
    const s = slug(m);
    if (c.role === 'theme') themes.push({ slug: s, name: m, default: i === 0 });
    const sel = i === 0 ? `:root, [${attr}="${s}"]` : `[${attr}="${s}"]`;
    block(sel, c.vars.map((v) => `${cssName[`${c.name}::${v[0]}`]}: ${fmt(v[1], v[0], valuesFor(c, v)[i])};`));
  });
}

// Efectos como variables
const effects = dump.effectStyles || [];
const fxLines = [];
for (const e of effects) {
  const shadows = e.effects.filter((x) => /SHADOW/.test(x.type) && x.visible !== false)
    .map((x) => `${x.type === 'INNER_SHADOW' ? 'inset ' : ''}${x.x || 0}px ${x.y || 0}px ${x.blur || 0}px ${x.spread || 0}px ${x.color}`);
  const blur = e.effects.find((x) => /BLUR/.test(x.type));
  if (shadows.length) fxLines.push(`--fx-${slug(e.name)}: ${shadows.join(', ')};`);
  if (blur) fxLines.push(`--fx-${slug(e.name)}${shadows.length ? '-blur' : ''}: blur(${blur.radius}px);`);
}
if (fxLines.length) { L.push('/* Estilos de efecto */'); block(':root', fxLines); }
await writeFile(path.join(OUT, 'tokens.css'), L.join('\n'));

// ---------- 5. typography.css ----------
const resolveBound = (b) => (b && cssName[b] ? `var(${cssName[b]})` : null);
const T = ['/* Estilos de texto de Figma → clases .ts-*. Generado: no editar a mano. */', ''];
const textClasses = [];
for (const s of dump.textStyles || []) {
  const b = s.bound || {};
  const cls = `ts-${slug(s.name)}`;
  textClasses.push({ class: cls, name: s.name });
  const lh = s.lineHeight === 'auto' || s.lineHeight == null ? 'normal'
    : String(s.lineHeight).endsWith('%') ? String(parseFloat(s.lineHeight) / 100) : `${s.lineHeight}px`;
  const ls = s.letterSpacing == null ? '0' : String(s.letterSpacing).endsWith('%')
    ? `${parseFloat(s.letterSpacing) / 100}em` : `${parseFloat(s.letterSpacing)}px`;
  const w = weightOf(s.style) || 400;
  T.push(`.${cls} {`,
    `  font-family: ${resolveBound(b.fontFamily) || fontStack(s.family)};`,
    `  font-weight: ${resolveBound(b.fontWeight) || resolveBound(b.fontStyle) || w};`,
    ...(isItalic(s.style) ? ['  font-style: italic;'] : []),
    `  font-size: ${resolveBound(b.fontSize) || `${s.size}px`};`,
    `  line-height: ${resolveBound(b.lineHeight) || lh};`,
    `  letter-spacing: ${resolveBound(b.letterSpacing) || ls};`,
    ...(s.textCase && s.textCase !== 'ORIGINAL' ? [`  text-transform: ${{ UPPER: 'uppercase', LOWER: 'lowercase', TITLE: 'capitalize' }[s.textCase] || 'none'};`] : []),
    ...(s.textDecoration && s.textDecoration !== 'NONE' ? [`  text-decoration: ${s.textDecoration === 'UNDERLINE' ? 'underline' : 'line-through'};`] : []),
    '}', '');
  for (const [k, v] of Object.entries(b)) if (!cssName[v]) warnings.push(`Estilo "${s.name}": ${k} ligado a "${v}" que no está en el volcado`);
}
await writeFile(path.join(OUT, 'typography.css'), T.join('\n'));

const E = ['/* Estilos de efecto de Figma → clases .fx-*. Generado: no editar a mano. */', ''];
for (const e of effects) {
  const hasShadow = e.effects.some((x) => /SHADOW/.test(x.type));
  const blur = e.effects.find((x) => /BLUR/.test(x.type));
  E.push(`.fx-${slug(e.name)} {`,
    ...(hasShadow ? [`  box-shadow: var(--fx-${slug(e.name)});`] : []),
    ...(blur ? [`  ${blur.type === 'LAYER_BLUR' ? 'filter' : 'backdrop-filter'}: var(--fx-${slug(e.name)}${hasShadow ? '-blur' : ''});`] : []),
    '}', '');
}
await writeFile(path.join(OUT, 'effects.css'), E.join('\n'));

// ---------- 6. tailwind-theme.css ----------
if (!args['no-tailwind']) {
  const W = ['/* Tema Tailwind v4 mapeado a los tokens. Importar DESPUÉS de tokens.css. Generado. */',
    '/* Solo colores semánticos: los colores se aplican siempre vía tokens semánticos. */', '', '@theme inline {'];
  if (breakpoints.length) {
    W.push('  --breakpoint-*: initial;');
    for (const b of breakpoints.slice(1)) W.push(`  --breakpoint-${b.name}: ${b.width}px;`);
  }
  for (const c of cols) for (const [p, t] of c.vars) {
    const n = cssName[`${c.name}::${p}`];
    const s = n.slice(2);
    if (t === 'C' && c.role === 'theme') W.push(`  --color-${s}: var(${n});`);
    else if (t === 'F' && /spac|gap|padding|wrapper|gutter|margin/i.test(p) && !/letter|typograph|tipograph/i.test(p)) W.push(`  --spacing-${s}: var(${n});`);
    else if (t === 'F' && /corner|radius/i.test(p)) W.push(`  --radius-${s}: var(${n});`);
    else if (t === 'S' && /famil/i.test(p)) W.push(`  --font-${slug(p.split('/').at(-1))}: var(${n});`);
  }
  W.push('}', '');
  await writeFile(path.join(OUT, 'tailwind-theme.css'), W.join('\n'));
}

// ---------- 7. tokens.json (DTCG) ----------
const dtcgType = (t, p) => (t === 'C' ? 'color' : t === 'F' ? (UNITLESS.test(p) ? 'number' : 'dimension')
  : t === 'S' ? (/famil/i.test(p) ? 'fontFamily' : /weight/i.test(p) ? 'fontWeight' : 'string') : 'boolean');
const dtcgVal = (t, p, v) => {
  if (typeof v === 'string' && /^\{.+::.+\}$/.test(v)) return '{' + v.slice(1, -1).replace('::', '.').split('/').join('.') + '}';
  if (t === 'F' && !UNITLESS.test(p)) return { value: v, unit: 'px' };
  if (t === 'S' && /weight/i.test(p)) return weightOf(v) ?? v;
  return v;
};
const dtcg = {};
for (const c of cols) {
  const root = (dtcg[c.name] = {});
  for (const v of c.vars) {
    const parts = v[0].split('/');
    let o = root;
    for (const k of parts.slice(0, -1)) o = o[k] ||= {};
    const vals = valuesFor(c, v);
    const leaf = { $type: dtcgType(v[1], v[0]), $value: dtcgVal(v[1], v[0], vals[0]) };
    if (c.modes.length > 1) leaf.$extensions = { 'com.figma': { modes: Object.fromEntries(c.modes.map((m, i) => [m, dtcgVal(v[1], v[0], vals[i])])) } };
    o[parts.at(-1)] = leaf;
  }
}
await writeJson(path.join(OUT, 'tokens.json'), dtcg);

// ---------- 8. tokens.meta.json ----------
await writeJson(path.join(OUT, 'tokens.meta.json'), {
  generatedFrom: IN,
  collections: cols.map((c) => ({ name: c.name, role: c.role, modes: c.modes, vars: c.vars.length })),
  breakpoints, themes, defaultTheme: themes.find((t) => t.default)?.slug ?? null,
  grids: grids.map((g) => ({ name: g.name, width: g.w, columns: g.col.count, gutter: g.col.gutter, margin: g.col.offset || 0 })),
  textStyles: textClasses, effectStyles: effects.map((e) => `fx-${slug(e.name)}`), warnings,
  // Familias y cortes que piden los estilos de texto (lo usa webfonts.mjs)
  fontFamilies: Object.values((dump.textStyles || []).reduce((acc, s) => {
    const f = (acc[s.family] ||= { family: s.family, cuts: [] });
    const c = { weight: weightOf(s.style) || 400, italic: isItalic(s.style) };
    if (!f.cuts.some((x) => x.weight === c.weight && x.italic === c.italic)) f.cuts.push(c);
    return acc;
  }, {})),
  // Mapa variable CSS → origen (lo usan token-audit y docs-generator)
  cssVars: Object.fromEntries(cols.flatMap((c) => c.vars.map((v) => [cssName[`${c.name}::${v[0]}`], { figma: `${c.name}::${v[0]}`, role: c.role, type: v[1] }]))),
});

// fonts.css vacío si aún no se han generado las webfonts (los imports del perfil lo esperan)
if (P.fontsCss && !(await exists(P.fontsCss))) await writeFile(P.fontsCss, '/* Pendiente: npm run fonts (webfonts.mjs) generará aquí los @font-face. */\n');
if (P.fontsGoogleCss && !(await exists(P.fontsGoogleCss))) await writeFile(P.fontsGoogleCss, '/* Pendiente: npm run fonts (webfonts.mjs). */\n');

// html-static: lista de subtemas para el selector del catálogo (js/themes.js)
if (P.themesJs && !args['no-themes-js']) await writeFile(P.themesJs, `// Generado por tokens-from-figma.mjs\nwindow.HANZO_THEMES = ${JSON.stringify(themes.map((t) => ({ slug: t.slug, name: t.name })))};\n`);

const n = cols.reduce((a, c) => a + c.vars.length, 0);
console.log(`✓ ${n} variables · ${cols.length} colecciones · ${breakpoints.length} breakpoints · ${themes.length} subtemas · ${textClasses.length} estilos de texto · ${effects.length} efectos → ${OUT}/`);
if (warnings.length) { console.warn(`⚠ ${warnings.length} avisos:`); for (const w of warnings.slice(0, 30)) console.warn('  - ' + w); }
