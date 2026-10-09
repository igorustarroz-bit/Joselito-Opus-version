// layout-boxes.js — SOLO LECTURA. Geometría de UNA variante de un módulo para scripts/grid-columns.mjs:
// cajas de los hijos hasta DEPTH niveles, relativas al frame raíz, las PISTAS DE COLUMNAS de Figma
// (variables ligadas a anchos y paddings, SPACE_BETWEEN) y las PISTAS VISUALES que permiten interpretar
// un módulo SIN autolayout, sin constraints y con capas sin nombre (references/figma-contract.md §Lectura):
// tipo de relleno (imagen/degradado/sólido), componente de las instancias, recorte y elementos repetidos.
// Se usa en TODOS los módulos: de aquí sale meta.layout. Claude guarda el resultado en
// .ai/layout/<slug>--<variante>.json (una por variante de escritorio y una de móvil).
//
// Pistas que devuelve:
//   bind.width             ligado a "Cols Size/Ncols"      = la pieza ocupa N columnas
//   bind.paddingLeft/Right ligado a "Cols Size/WrapperNCol" = margen + N columnas libres en ese lado
//   layout.align SPACE_BETWEEN entre piezas con anchos de columna = las columnas restantes quedan libres
//   fill  ['IMAGE'|'GRADIENT'|'SOLID'|'VIDEO']  (fondos, velos)    comp  componente de una instancia
//   repeat  nº de hijos iguales (mismo componente o mismo tamaño)  → carrusel / lista
//   kids    nº de hijos visibles                              clip    recorta su contenido                                      constraints (si diseño las puso)
//
// Parámetros:
const NODE_ID = '__NODE_ID__';
const DEPTH = 2;

const root = await figma.getNodeByIdAsync(NODE_ID);
if (!root) return { error: `No existe ${NODE_ID}` };
const r = (n) => Math.round((n || 0) * 10) / 10;
const abs = (n) => n.absoluteBoundingBox || { x: n.x, y: n.y, width: n.width, height: n.height };
const R = abs(root);
const varName = {};
async function nameOf(id) {
  if (!(id in varName)) { const v = await figma.variables.getVariableByIdAsync(id); varName[id] = v ? v.name : id; }
  return varName[id];
}
const BIND_KEYS = ['width', 'minWidth', 'maxWidth', 'paddingLeft', 'paddingRight', 'itemSpacing', 'counterAxisSpacing'];
async function binds(n) {
  const bv = n.boundVariables || {};
  const out = {};
  for (const k of BIND_KEYS) if (bv[k]?.id) out[k] = await nameOf(bv[k].id);
  return Object.keys(out).length ? out : undefined;
}
function fillKinds(n) {
  if (!('fills' in n) || !Array.isArray(n.fills)) return undefined;
  const k = [...new Set(n.fills.filter((f) => f.visible !== false).map((f) => (/GRADIENT/.test(f.type) ? 'GRADIENT' : f.type)))];
  return k.length ? k : undefined;
}
async function compOf(n) {
  if (n.type !== 'INSTANCE') return undefined;
  const m = await n.getMainComponentAsync();
  return m ? (m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name : m.name) : undefined;
}
async function repeatOf(n) {
  if (!('children' in n)) return undefined;
  const kids = n.children.filter((c) => c.visible);
  if (kids.length < 3) return undefined;
  const keys = [];
  for (const c of kids) keys.push(c.type === 'INSTANCE' ? `i:${await compOf(c)}` : `${c.type}:${Math.round(c.width)}x${Math.round(c.height)}`);
  const count = {}; for (const k of keys) count[k] = (count[k] || 0) + 1;
  const max = Math.max(...Object.values(count));
  return max >= 3 ? max : undefined;
}
async function box(n, d) {
  const b = abs(n);
  const o = { id: n.id, name: n.name, type: n.type, x: r(b.x - R.x), y: r(b.y - R.y), w: r(b.width), h: r(b.height) };
  if (n.rotation) o.rot = r(n.rotation);
  if (n.layoutMode && n.layoutMode !== 'NONE') o.layout = { mode: n.layoutMode, padding: [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft].map(r), gap: r(n.itemSpacing), wrap: n.layoutWrap, align: n.primaryAxisAlignItems };
  if (n.layoutPositioning === 'ABSOLUTE') o.absolute = true;
  if (n.constraints) o.constraints = n.constraints;
  if (n.layoutSizingHorizontal) o.sizing = [n.layoutSizingHorizontal, n.layoutSizingVertical];
  const fill = fillKinds(n); if (fill) o.fill = fill;
  if ('opacity' in n && n.opacity < 1) o.opacity = r(n.opacity);
  if (n.clipsContent) o.clip = true;
  const comp = await compOf(n); if (comp) o.comp = comp;
  const rep = await repeatOf(n); if (rep) o.repeat = rep;
  if ('children' in n && n.type !== 'INSTANCE') o.kids = n.children.filter((c) => c.visible).length;
  if (n.type === 'TEXT') o.text = n.characters.slice(0, 40);
  const bind = await binds(n);
  if (bind) o.bind = bind;
  if (d < DEPTH && 'children' in n && n.type !== 'INSTANCE') {
    o.children = [];
    for (const c of n.children) if (c.visible) o.children.push(await box(c, d + 1));
  }
  return o;
}
let gridParams = null;
if (Array.isArray(root.layoutGrids) && root.layoutGrids.length) gridParams = root.layoutGrids.map((g) => ({ pattern: g.pattern, count: g.count, gutter: g.gutterSize, offset: g.offset, alignment: g.alignment }));
return { id: root.id, name: root.name, type: root.type, variant: root.variantProperties || null, w: r(root.width), h: r(root.height), layoutGrids: gridParams, tree: await box(root, 0) };
