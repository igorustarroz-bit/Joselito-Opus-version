// images.js — SOLO LECTURA. Inventario de imágenes RASTER (fills de tipo IMAGE) de UNA página,
// deduplicadas por imageHash, con el máster que las usa. Alimenta scripts/fetch-raster.mjs.
// Claude une los resultados de cada página en .ai/figma/images.json (array).
// Los SVG/vectores NO van por aquí.
//
// Parámetros:
const PAGE_ID = '__PAGE_ID__';

const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
const masterOf = (n) => { let p = n; let best = null; while (p && p.type !== 'PAGE') { if (p.type === 'COMPONENT_SET' || (p.type === 'COMPONENT' && p.parent.type !== 'COMPONENT_SET')) best = p.name; p = p.parent; } return best; };
const topOf = (n) => { let p = n; while (p.parent && p.parent.type !== 'PAGE') p = p.parent; return p.name; };
const byHash = new Map();
for (const n of page.findAll((n) => 'fills' in n && Array.isArray(n.fills) && n.fills.some((f) => f.type === 'IMAGE'))) {
  for (const f of n.fills) {
    if (f.type !== 'IMAGE' || !f.imageHash) continue;
    const e = byHash.get(f.imageHash) || { hash: f.imageHash, name: null, masters: new Set(), layers: new Set(), maxW: 0 };
    const m = masterOf(n) || topOf(n);
    e.masters.add(m); e.layers.add(n.name); e.maxW = Math.max(e.maxW, Math.round(n.width));
    if (!e.name) e.name = `${m} ${/^(Rectangle|Frame|Image|Aspect Ratio)\b/i.test(n.name) ? '' : n.name}`.trim();
    byHash.set(f.imageHash, e);
  }
}
return [...byHash.values()].map((e) => ({ hash: e.hash, name: e.name, masters: [...e.masters], layers: [...e.layers].slice(0, 5), maxW: e.maxW, page: page.name }));
