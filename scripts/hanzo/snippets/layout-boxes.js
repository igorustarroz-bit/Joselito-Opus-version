// layout-boxes.js — SOLO LECTURA. Geometría de UNA variante (normalmente un módulo sin autolayout
// o con anchos "raros") para scripts/grid-columns.mjs: cajas de los hijos hasta DEPTH niveles,
// relativas al frame raíz. Claude guarda el resultado en .ai/layout/<slug>--<variante>.json
//
// Parámetros:
const NODE_ID = '__NODE_ID__';
const DEPTH = 2;

const root = await figma.getNodeByIdAsync(NODE_ID);
if (!root) return { error: `No existe ${NODE_ID}` };
const r = (n) => Math.round((n || 0) * 10) / 10;
const abs = (n) => n.absoluteBoundingBox || { x: n.x, y: n.y, width: n.width, height: n.height };
const R = abs(root);
function box(n, d) {
  const b = abs(n);
  const o = { id: n.id, name: n.name, type: n.type, x: r(b.x - R.x), y: r(b.y - R.y), w: r(b.width), h: r(b.height) };
  if (n.rotation) o.rot = r(n.rotation);
  if (n.layoutMode && n.layoutMode !== 'NONE') o.layout = { mode: n.layoutMode, padding: [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft].map(r), gap: r(n.itemSpacing), wrap: n.layoutWrap };
  if (n.layoutPositioning === 'ABSOLUTE') o.absolute = true;
  if (n.constraints) o.constraints = n.constraints;
  if (n.layoutSizingHorizontal) o.sizing = [n.layoutSizingHorizontal, n.layoutSizingVertical];
  if (d < DEPTH && 'children' in n && n.type !== 'INSTANCE') o.children = n.children.filter((c) => c.visible).map((c) => box(c, d + 1));
  return o;
}
let gridParams = null;
if (Array.isArray(root.layoutGrids) && root.layoutGrids.length) gridParams = root.layoutGrids.map((g) => ({ pattern: g.pattern, count: g.count, gutter: g.gutterSize, offset: g.offset, alignment: g.alignment }));
return { id: root.id, name: root.name, w: r(root.width), h: r(root.height), layoutGrids: gridParams, tree: box(root, 0) };
