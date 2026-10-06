// inventory.js — SOLO LECTURA. Inventario de UNA página: másters (component sets y componentes
// sueltos) con sus dependencias, variantes, imágenes y una huella ligera (fp) para detectar cambios,
// más los frames de primer nivel que parecen page templates. Una página por llamada (si no, timeout).
// Para varias páginas: lanzar N llamadas EN PARALELO en el mismo mensaje.
// Claude guarda el resultado tal cual en .ai/figma/inventory/<pageId>.json → scripts/plan.mjs
//
// Parámetros:
const PAGE_ID = '__PAGE_ID__';

const page = await figma.getNodeByIdAsync(PAGE_ID);
if (!page || page.type !== 'PAGE') return { error: `${PAGE_ID} no es una página. Usa snippets/profile.js para listarlas.` };
await figma.setCurrentPageAsync(page);

function fnv(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); }
const r = (n) => Math.round(n || 0);
const mainCache = new Map();
async function mainName(inst) {
  const m = await inst.getMainComponentAsync();
  if (!m) return null;
  if (mainCache.has(m.id)) return mainCache.get(m.id);
  const n = m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name : m.name;
  mainCache.set(m.id, n);
  return n;
}
function lightSig(node) {
  const parts = [];
  const all = 'findAll' in node ? node.findAll(() => true) : [];
  for (const n of [node, ...all]) {
    // la posición del raíz en el canvas no cuenta (mover el máster no es un cambio)
    let s = `${n.type}|${n.name}|${r(n.width)}x${r(n.height)}|${n === node ? '' : `${r(n.x)},${r(n.y)}`}|${n.visible ? 1 : 0}`;
    if (n.type === 'TEXT') s += '|' + n.characters.slice(0, 80);
    if ('fills' in n && Array.isArray(n.fills)) s += '|' + n.fills.map((f) => f.type === 'IMAGE' ? f.imageHash : f.type === 'SOLID' ? `${f.boundVariables?.color?.id || ''}${r(f.color.r * 255)},${r(f.color.g * 255)},${r(f.color.b * 255)}` : f.type).join(',');
    if (n.layoutMode) s += `|${n.layoutMode}${n.paddingLeft},${n.paddingTop},${n.itemSpacing}`;
    parts.push(s);
  }
  return fnv(parts.join('\n'));
}
const sectionOf = (n) => { let p = n.parent; let last = null; while (p && p.type !== 'PAGE') { if (p.type === 'FRAME' || p.type === 'SECTION') last = p.name; p = p.parent; } return last; };

const masters = [];
const nodes = page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] })
  .filter((n) => n.type === 'COMPONENT_SET' || n.parent.type !== 'COMPONENT_SET');
for (const m of nodes) {
  const deps = new Set();
  let images = 0;
  for (const i of m.findAllWithCriteria({ types: ['INSTANCE'] })) { const n = await mainName(i); if (n && n !== m.name) deps.add(n); }
  for (const n of m.findAll((n) => 'fills' in n && Array.isArray(n.fills) && n.fills.some((f) => f.type === 'IMAGE'))) images++;
  let props = {};
  try { for (const [k, v] of Object.entries(m.componentPropertyDefinitions)) props[k.split('#')[0]] = v.type === 'VARIANT' ? v.variantOptions : v.type; } catch (e) {}
  const variants = m.type === 'COMPONENT_SET' ? m.children : [m];
  masters.push({
    id: m.id, name: m.name, kind: m.type === 'COMPONENT_SET' ? 'set' : 'component', section: sectionOf(m),
    w: r(variants[0].width), h: r(variants[0].height), variants: variants.length, props,
    autolayout: variants.filter((v) => v.layoutMode && v.layoutMode !== 'NONE').length,
    vectorsOnly: m.findAll((n) => n.type === 'TEXT').length === 0 && m.findAll((n) => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION').length > 0,
    images, deps: [...deps].sort(), description: (m.description || '').slice(0, 200) || undefined,
    fp: fnv(variants.map(lightSig).join('|')),
  });
}

// Frames de primer nivel con instancias de módulos → candidatos a page template
const frames = [];
for (const f of page.children.filter((c) => c.type === 'FRAME' && c.width >= 320)) {
  // Instancias hijas directas o dentro de un wrapper (frame/grupo/sección) de primer nivel
  const kids = [];
  for (const c of f.children) {
    if (c.type === 'INSTANCE') kids.push(await mainName(c));
    else if (['FRAME', 'GROUP', 'SECTION'].includes(c.type) && 'children' in c) for (const g of c.children) if (g.type === 'INSTANCE') kids.push(await mainName(g));
  }
  if (kids.length >= 2) frames.push({ id: f.id, name: f.name, w: r(f.width), h: r(f.height), modules: kids, fp: lightSig(f), hasReactions: f.findAll((n) => (n.reactions || []).length > 0).length > 0 });
}

return { pageId: page.id, page: page.name, readAt: new Date().toISOString(), masters, frames };
