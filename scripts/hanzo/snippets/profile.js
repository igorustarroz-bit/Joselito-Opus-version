// profile.js — SOLO LECTURA. Primera llamada a un fichero de Figma: páginas, colecciones de
// variables, estilos locales y librerías. Sirve para rellenar .ai/figma-profile.json y decidir
// si el fichero es "plantilla Hanzo" o "externo" (y su nivel A/B/C). Gasta 1 llamada.
// No necesita parámetros.

const pages = figma.root.children.map((p) => ({ id: p.id, name: p.name, children: p.children.length }));
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const collections = [];
for (const c of cols) {
  const types = {};
  for (const id of c.variableIds.slice(0, 400)) { const v = await figma.variables.getVariableByIdAsync(id); if (v) types[v.resolvedType] = (types[v.resolvedType] || 0) + 1; }
  collections.push({ id: c.id, name: c.name, modes: c.modes.map((m) => m.name), vars: c.variableIds.length, types, remote: c.remote || false });
}
const text = await figma.getLocalTextStylesAsync();
const paint = await figma.getLocalPaintStylesAsync();
const effect = await figma.getLocalEffectStylesAsync();
const grid = await figma.getLocalGridStylesAsync();
let libraries = [];
try { libraries = (await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()).map((l) => ({ library: l.libraryName, collection: l.name })); } catch (e) { libraries = ['(no disponible)']; }

// Pista de convenciones de la plantilla Hanzo
const names = pages.map((p) => p.name).join(' | ');
const hanzoHints = {
  pages: ['Foundations', 'Brand Assets', 'Components', 'Raw Modules', 'DS Notation'].filter((k) => names.includes(k)),
  collections: ['Primitives', 'Responsive', 'Semantic-Color'].filter((k) => cols.some((c) => c.name === k)),
};

return {
  fileName: figma.root.name, pages, collections,
  styles: { text: text.length, paint: paint.length, effect: effect.length, grid: grid.map((g) => g.name) },
  textFamilies: [...new Set(text.map((s) => s.fontName.family))],
  libraries, hanzoHints,
  looksLikeHanzoTemplate: hanzoHints.pages.length >= 3 && hanzoHints.collections.length === 3,
};
