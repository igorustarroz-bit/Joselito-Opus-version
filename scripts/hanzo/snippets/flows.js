// flows.js — SOLO LECTURA. Flujos de prototipo de UNA página: puntos de inicio y conexiones entre
// pantallas (reactions). Alimenta los flujos entre templates (references/templates-flows.md).
// Claude guarda el resultado en .ai/figma/flows/<pageId>.json
//
// Parámetros:
const PAGE_ID = '__PAGE_ID__';

const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
const topOf = (n) => { let p = n; while (p.parent && p.parent.type !== 'PAGE') p = p.parent; return p; };
const nameCache = {};
async function frameName(id) {
  if (!id) return null;
  if (!(id in nameCache)) { const n = await figma.getNodeByIdAsync(id); nameCache[id] = n ? { id, name: n.name, top: topOf(n).name } : { id, name: '?' }; }
  return nameCache[id];
}
const edges = [];
for (const n of page.findAll((n) => Array.isArray(n.reactions) && n.reactions.length > 0)) {
  for (const re of n.reactions) {
    const actions = re.actions || (re.action ? [re.action] : []);
    for (const a of actions) {
      if (!a) continue;
      edges.push({ fromFrame: topOf(n).name, fromFrameId: topOf(n).id, layer: n.name, trigger: re.trigger?.type, action: a.type,
        navigation: a.navigation, to: a.destinationId ? await frameName(a.destinationId) : null, url: a.url || undefined });
    }
  }
}
return {
  pageId: page.id, page: page.name,
  starts: (page.flowStartingPoints || []).map((s) => ({ name: s.name, nodeId: s.nodeId })),
  screens: page.children.filter((c) => c.type === 'FRAME').map((c) => ({ id: c.id, name: c.name, w: Math.round(c.width), h: Math.round(c.height) })),
  edges,
};
