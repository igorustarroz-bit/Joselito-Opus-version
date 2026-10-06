// variables.js — SOLO LECTURA. Volcado de variables locales + estilos de texto y efecto en el
// formato que consume scripts/tokens-from-figma.mjs. Claude guarda el resultado TAL CUAL en
// .ai/figma/variables.json (si no cabe en una respuesta, usar ONLY para trocear por colección
// y unir los trozos en el array "collections").
// En plan Enterprise no hace falta: scripts/fetch-variables.mjs lo hace por REST sin transcribir.
//
// Parámetros:
const ONLY = null;            // null = todas; o ['Semantic-Color'] para trocear
const INCLUDE_STYLES = true;  // false en los trozos que no sean el primero

const cols = await figma.variables.getLocalVariableCollectionsAsync();
const colName = {}; for (const c of cols) colName[c.id] = c.name;
const hex = (c) => { const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0'); return '#' + h(c.r) + h(c.g) + h(c.b) + (c.a !== undefined && c.a < 1 ? h(c.a) : ''); };
const nameCache = {};
async function aliasName(id) {
  if (!(id in nameCache)) { const t = await figma.variables.getVariableByIdAsync(id); nameCache[id] = t ? `${colName[t.variableCollectionId] || 'lib'}::${t.name}` : `?${id}`; }
  return nameCache[id];
}
async function val(v) {
  if (v && typeof v === 'object' && v.type === 'VARIABLE_ALIAS') return '{' + (await aliasName(v.id)) + '}';
  if (v && typeof v === 'object' && 'r' in v) return hex(v);
  return v;
}
const out = { fileName: figma.root.name, readAt: new Date().toISOString(), collections: [] };
for (const c of cols.filter((c) => !ONLY || ONLY.includes(c.name))) {
  const vars = [];
  for (const id of c.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    const vals = [];
    for (const m of c.modes) vals.push(await val(v.valuesByMode[m.modeId]));
    const same = new Set(vals.map((x) => JSON.stringify(x))).size === 1;
    vars.push([v.name, v.resolvedType[0], same ? vals[0] : vals]);
  }
  out.collections.push({ name: c.name, modes: c.modes.map((m) => m.name), vars });
}
if (INCLUDE_STYLES) {
  out.textStyles = [];
  for (const s of await figma.getLocalTextStylesAsync()) {
    const bound = {};
    for (const [k, b] of Object.entries(s.boundVariables || {})) bound[k] = await aliasName(b.id);
    out.textStyles.push({
      name: s.name, family: s.fontName.family, style: s.fontName.style, size: s.fontSize,
      lineHeight: s.lineHeight.unit === 'PIXELS' ? s.lineHeight.value : s.lineHeight.unit === 'PERCENT' ? `${s.lineHeight.value}%` : 'auto',
      letterSpacing: s.letterSpacing.unit === 'PERCENT' ? `${s.letterSpacing.value}%` : `${s.letterSpacing.value}px`,
      textCase: s.textCase, textDecoration: s.textDecoration, bound,
    });
  }
  out.effectStyles = (await figma.getLocalEffectStylesAsync()).map((s) => ({
    name: s.name,
    effects: s.effects.map((e) => (/SHADOW/.test(e.type)
      ? { type: e.type, color: hex({ ...e.color }), x: e.offset.x, y: e.offset.y, blur: e.radius, spread: e.spread || 0, visible: e.visible }
      : { type: e.type, radius: e.radius, visible: e.visible })),
  }));
  out.gridStyles = (await figma.getLocalGridStylesAsync()).map((g) => ({ name: g.name, layoutGrids: g.layoutGrids.map((l) => ({ pattern: l.pattern, count: l.count, gutter: l.gutterSize, offset: l.offset, alignment: l.alignment, size: l.sectionSize })) }));
}
return out;
