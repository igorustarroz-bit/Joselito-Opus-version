// layout-doc.js — SOLO LECTURA. Busca la DOCUMENTACIÓN DE LAYOUT del Figma (rangos de cada breakpoint,
// p. ej. "960px – 1279px") para proponer hanzo.config.json → breakpoints con scripts/breakpoints.mjs.
// En la plantilla Hanzo está en 📐 Foundations (frame de layout, p. ej. 51284:8588).
// Claude guarda el resultado en .ai/figma/layout-doc.json
//
// Parámetros: la página (o el frame, más barato) donde está la doc de layout.
const NODE_ID = '__FOUNDATIONS_PAGE_OR_FRAME_ID__';
const MAX = 300;

let root = await figma.getNodeByIdAsync(NODE_ID);
if (!root) return { error: `No existe ${NODE_ID}` };
if (root.type === 'PAGE') await root.loadAsync();
const RANGE = /(\d{3,4})\s*(?:px)?\s*(?:[–—-]|to|a|hasta)\s*(\d{3,4})\s*(?:px)?|(\d{3,4})\s*(?:px)?\s*\+|(?:[<≤]|hasta|up to|max\.?|(?:^|\s)[–—-])\s*(\d{3,4})\s*(?:px)?|(?:[>≥]|desde|from|min\.?)\s*(\d{3,4})\s*(?:px)?/i;
const texts = root.findAllWithCriteria ? root.findAllWithCriteria({ types: ['TEXT'] }) : [];
const out = [];
const frameOf = (n) => { let p = n.parent, last = null; while (p && p.type !== 'PAGE') { if (p.type === 'FRAME' || p.type === 'SECTION' || p.type === 'COMPONENT') last = p; p = p.parent; } return last; };
for (const t of texts) {
  if (out.length >= MAX) break;
  const s = t.characters || '';
  if (!RANGE.test(s) || s.length > 200) continue;
  const parent = t.parent;
  // Etiquetas cercanas (hermanos de texto cortos: "XL", "Desktop", "1440"…) para asociar el rango a su modo
  const near = parent && 'children' in parent ? parent.children.filter((c) => c.type === 'TEXT' && c !== t && (c.characters || '').length <= 40).map((c) => c.characters).slice(0, 6) : [];
  const f = frameOf(t);
  out.push({ id: t.id, text: s, near, parent: parent?.name, frame: f?.name, frameId: f?.id });
}
return { root: { id: root.id, name: root.name }, count: out.length, ranges: out };
