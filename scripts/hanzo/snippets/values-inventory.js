// values-inventory.js — SOLO LECTURA. Para Figma EXTERNOS sin variables (nivel B/C): recuenta los
// valores que se usan de verdad en UNA página (colores, tipografías, espaciados, radios, anchos de
// frame). scripts/derive-tokens.mjs los agrupa y propone una escala de tokens para aprobar.
// Varias páginas → N llamadas en paralelo; Claude guarda cada una en .ai/figma/values/<pageId>.json
//
// Parámetros:
const PAGE_ID = '__PAGE_ID__';

const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
const hex = (c, o = 1) => { const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0'); return '#' + h(c.r) + h(c.g) + h(c.b) + (o < 1 ? h(o) : ''); };
const inc = (o, k) => { o[k] = (o[k] || 0) + 1; };
const colors = { fill: {}, text: {}, stroke: {} }, fonts = {}, spacing = {}, radius = {}, widths = {}, effects = {};
const styleNames = {};
for (const n of page.findAll(() => true)) {
  if (!n.visible) continue;
  if (n.type === 'TEXT') {
    const fn = n.fontName, fs = n.fontSize, lh = n.lineHeight;
    if (fn !== figma.mixed && fs !== figma.mixed) inc(fonts, `${fn.family}|${fn.style}|${fs}|${lh === figma.mixed ? 'mixed' : lh.unit === 'PIXELS' ? Math.round(lh.value) : lh.unit === 'PERCENT' ? Math.round(lh.value) + '%' : 'auto'}`);
    if (Array.isArray(n.fills)) for (const f of n.fills) if (f.type === 'SOLID' && f.visible !== false) inc(colors.text, hex(f.color, f.opacity ?? 1));
    continue;
  }
  if ('fills' in n && Array.isArray(n.fills)) for (const f of n.fills) if (f.type === 'SOLID' && f.visible !== false) inc(colors.fill, hex(f.color, f.opacity ?? 1));
  if ('strokes' in n && Array.isArray(n.strokes)) for (const f of n.strokes) if (f.type === 'SOLID' && f.visible !== false) inc(colors.stroke, hex(f.color, f.opacity ?? 1));
  if (n.layoutMode && n.layoutMode !== 'NONE') for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing']) if (n[k] > 0) inc(spacing, Math.round(n[k]));
  if ('cornerRadius' in n && typeof n.cornerRadius === 'number' && n.cornerRadius > 0) inc(radius, Math.round(n.cornerRadius));
  if ('effects' in n && n.effects?.length) inc(effects, JSON.stringify(n.effects.filter((e) => e.visible !== false).map((e) => [e.type, Math.round(e.radius || 0), e.offset ? [e.offset.x, e.offset.y] : null, e.color ? hex(e.color, e.color.a) : null])));
  if (n.parent === page && (n.type === 'FRAME' || n.type === 'COMPONENT_SET')) inc(widths, Math.round(n.width));
  if (n.textStyleId && typeof n.textStyleId === 'string') inc(styleNames, n.textStyleId);
}
// Espaciado medido entre hermanos en frames SIN autolayout (gaps implícitos)
for (const f of page.findAll((n) => 'children' in n && (!n.layoutMode || n.layoutMode === 'NONE') && n.children.length > 1).slice(0, 2000)) {
  const kids = f.children.filter((c) => c.visible).sort((a, b) => a.y - b.y);
  for (let i = 1; i < kids.length; i++) { const g = Math.round(kids[i].y - (kids[i - 1].y + kids[i - 1].height)); if (g > 0 && g <= 240) inc(spacing, g); }
}
return { pageId: page.id, page: page.name, colors, fonts, spacing, radius, widths, effects };
