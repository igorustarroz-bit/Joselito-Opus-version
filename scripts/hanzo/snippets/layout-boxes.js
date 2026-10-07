// layout-boxes.js — SOLO LECTURA. Geometría de UNA variante de un módulo para scripts/grid-columns.mjs:
// cajas de los hijos hasta DEPTH niveles, relativas al frame raíz, y las PISTAS DE COLUMNAS de Figma
// (variables ligadas a anchos y paddings, SPACE_BETWEEN). Se usa en TODOS los módulos (no solo en los
// que no tienen autolayout): de aquí sale meta.layout. Claude guarda el resultado en
// .ai/layout/<slug>--<variante>.json (una por variante de escritorio y una de móvil).
//
// Pistas que devuelve (bind):
//   width            ligado a "Cols Size/Ncols"      = la pieza ocupa N columnas
//   paddingLeft/Right ligado a "Cols Size/WrapperNCol" = margen + N columnas libres en ese lado
//   align: SPACE_BETWEEN entre piezas con anchos de columna = las columnas restantes quedan libres
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
async function box(n, d) {
  const b = abs(n);
  const o = { id: n.id, name: n.name, type: n.type, x: r(b.x - R.x), y: r(b.y - R.y), w: r(b.width), h: r(b.height) };
  if (n.rotation) o.rot = r(n.rotation);
  if (n.layoutMode && n.layoutMode !== 'NONE') o.layout = { mode: n.layoutMode, padding: [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft].map(r), gap: r(n.itemSpacing), wrap: n.layoutWrap, align: n.primaryAxisAlignItems };
  if (n.layoutPositioning === 'ABSOLUTE') o.absolute = true;
  if (n.constraints) o.constraints = n.constraints;
  if (n.layoutSizingHorizontal) o.sizing = [n.layoutSizingHorizontal, n.layoutSizingVertical];
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
return { id: root.id, name: root.name, variant: root.variantProperties || null, w: r(root.width), h: r(root.height), layoutGrids: gridParams, tree: await box(root, 0) };
