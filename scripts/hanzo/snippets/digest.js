// digest.js — Snippet de SOLO LECTURA para use_figma. Lee UN máster (component set, componente o
// frame) y devuelve su "digest": resumen normalizado + huella (fp) + auditoría del contrato de Figma.
// Claude guarda el resultado TAL CUAL en .ai/masters/<slug>.json (references/figma-read.md §4).
//
// Parámetros (editar antes de enviar):
const NODE_ID = '__NODE_ID__';            // id del máster, p. ej. '53927:2200'
const EXCLUDED_TOKENS = /Always-(Black|White)/; // tokens que no deben usarse en contenido (perfil del Figma)
const MAX_TEXTS = 400;                     // límite de textos leídos (se deduplican al devolver)

const root = await figma.getNodeByIdAsync(NODE_ID);
if (!root) return { error: `No existe ${NODE_ID}. Relocaliza por nombre (snippets/inventory.js).` };
let page = root; while (page.parent && page.type !== 'PAGE') page = page.parent;

const varCache = {}; const colCache = {};
for (const c of await figma.variables.getLocalVariableCollectionsAsync()) colCache[c.id] = c;
async function vname(id) {
  if (!id) return null;
  if (!(id in varCache)) {
    const v = await figma.variables.getVariableByIdAsync(id);
    varCache[id] = v ? `${(colCache[v.variableCollectionId] || {}).name || 'lib'}::${v.name}` : null;
  }
  return varCache[id];
}
const styleCache = {};
async function sname(id) {
  if (!id || typeof id !== 'string') return null;
  if (!(id in styleCache)) { const s = await figma.getStyleByIdAsync(id); styleCache[id] = s ? s.name : null; }
  return styleCache[id];
}
const hex = (c, o = 1) => { const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0'); return '#' + h(c.r) + h(c.g) + h(c.b) + (o < 1 ? h(o) : ''); };
const r = (n) => Math.round((n || 0) * 10) / 10;
function fnv(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); }
const GENERIC = /^(Frame|Rectangle|Group|Ellipse|Vector|Line)\s?\d*$/;

const tokens = { colors: new Set(), spacing: new Set(), radius: new Set(), sizes: new Set(), textStyles: new Set(), effects: new Set() };
const deps = new Set(); const texts = []; const images = []; const vectors = new Set(); const slots = new Set();
const interactions = []; const audit = []; let hidden = 0; let generic = 0;
const issue = (sev, code, variant, node, msg) => audit.push({ sev, code, variant, layer: node.name, id: node.id, msg });

async function paints(list, boundList, kind, variant, node, sig) {
  if (!Array.isArray(list)) return;
  for (let i = 0; i < list.length; i++) {
    const p = list[i]; if (p.visible === false) continue;
    const bound = await vname(p.boundVariables?.color?.id || (boundList && boundList[i]?.id));
    if (p.type === 'SOLID') {
      if (bound) { tokens.colors.add(bound); if (EXCLUDED_TOKENS.test(bound)) issue('warn', 'EXCLUDED_TOKEN', variant, node, `${kind} usa ${bound}`); }
      else issue('error', 'HARD_COLOR', variant, node, `${kind} ${hex(p.color, p.opacity ?? 1)} sin variable`);
      sig.push(`${kind}:${bound || hex(p.color, p.opacity ?? 1)}`);
    } else if (p.type === 'IMAGE') {
      images.push({ hash: p.imageHash, layer: node.name, id: node.id, variant, scaleMode: p.scaleMode, w: r(node.width), h: r(node.height) });
      if (/logo|icon|ico\b|brand/i.test(node.name)) issue('warn', 'RASTER_LOGO', variant, node, 'Logo/icono como imagen raster: debería ser vector/componente');
      sig.push(`img:${p.imageHash}`);
    } else if (/GRADIENT/.test(p.type)) { issue('warn', 'GRADIENT', variant, node, `${kind} con degradado (revisar si es token o asset)`); sig.push(`${kind}:${p.type}`); }
  }
}

async function walk(node, variant, depth, sig, inInstance) {
  if (node.visible === false) { hidden++; return; }
  if (GENERIC.test(node.name) && !inInstance) generic++;
  const b = node.boundVariables || {};
  sig.push(`${node.type}|${node.name}|${r(node.width)}x${r(node.height)}|${depth ? `${r(node.x)},${r(node.y)}` : ''}|${r(node.rotation)}`);

  if (node.type === 'INSTANCE') {
    const main = await node.getMainComponentAsync();
    const set = main && main.parent && main.parent.type === 'COMPONENT_SET' ? main.parent.name : main && main.name;
    if (set) deps.add(set);
    const props = {}; for (const [k, v] of Object.entries(node.componentProperties || {})) props[k.split('#')[0]] = v.value;
    sig.push(`inst:${set}:${JSON.stringify(props)}`);
    if (/icon|ico|logo|brand|arrow|chevron|caret/i.test(set || '')) vectors.add(set);
    // Contenido real dentro de instancias: textos e imágenes (sin auditar: tienen sus propios tokens)
    if ('findAllWithCriteria' in node) {
      for (const t of node.findAllWithCriteria({ types: ['TEXT'] })) if (t.visible && texts.length < MAX_TEXTS) texts.push({ variant, layer: `${node.name} › ${t.name}`, chars: t.characters.slice(0, 300), inInstance: set });
      for (const n of node.findAll((n) => 'fills' in n && Array.isArray(n.fills) && n.fills.some((f) => f.type === 'IMAGE'))) for (const f of n.fills) if (f.type === 'IMAGE') images.push({ hash: f.imageHash, layer: `${node.name} › ${n.name}`, id: n.id, variant, scaleMode: f.scaleMode, w: r(n.width), h: r(n.height), inInstance: set });
    }
    // Overrides de relleno en la raíz de la instancia (p. ej. botón "Primary" con fill transparente)
    // Relleno propio de la instancia: imagen (p. ej. Aspect Ratio con foto) u override de color
    const ownImg = Array.isArray(node.fills) ? node.fills.filter((f) => f.type === 'IMAGE' && f.visible !== false) : [];
    for (const f of ownImg) images.push({ hash: f.imageHash, layer: node.name, id: node.id, variant, scaleMode: f.scaleMode, w: r(node.width), h: r(node.height), inInstance: set });
    if (main && !ownImg.length && JSON.stringify(node.fills) !== JSON.stringify(main.fills)) sig.push('override:fills'), issue('info', 'FILL_OVERRIDE', variant, node, `Instancia de ${set} con relleno sobrescrito: leer el render real, no el nombre de variante`);
    if (ownImg.length) sig.push('img:' + ownImg.map((f) => f.imageHash).join(','));
    return;
  }
  if (node.type === 'SLOT') slots.add(node.name);
  if (node.type === 'VECTOR' || node.type === 'BOOLEAN_OPERATION') { vectors.add(node.name); return; }

  if ('fills' in node) await paints(node.fills, b.fills, 'fill', variant, node, sig);
  if ('strokes' in node && node.strokes?.length) { await paints(node.strokes, b.strokes, 'stroke', variant, node, sig); sig.push(`sw:${String(node.strokeWeight)}`); }
  if ('effectStyleId' in node && node.effects?.length) {
    const es = await sname(node.effectStyleId); if (es) tokens.effects.add(es); else issue('warn', 'HARD_EFFECT', variant, node, 'Efecto sin estilo');
  }
  if ('cornerRadius' in node && node.type !== 'TEXT') {
    const rad = node.cornerRadius; const has = rad === figma.mixed || rad > 0;
    const bv = b.cornerRadius || b.topLeftRadius;
    if (has) { const n = await vname(bv?.id); if (n) tokens.radius.add(n); else issue('warn', 'HARD_RADIUS', variant, node, `Radio ${String(rad)} sin variable`); }
    sig.push(`rad:${String(rad)}`);
  }
  if (node.type === 'TEXT') {
    const st = await sname(node.textStyleId);
    if (st) tokens.textStyles.add(st); else issue('error', 'NO_TEXT_STYLE', variant, node, 'Texto sin estilo de texto');
    if (texts.length < MAX_TEXTS) texts.push({ variant, layer: node.name, chars: node.characters.slice(0, 300), style: st });
    sig.push(`txt:${st}:${node.characters.slice(0, 60)}`);
    return;
  }
  if ('layoutMode' in node) {
    if (node.layoutMode && node.layoutMode !== 'NONE') {
      sig.push(`al:${node.layoutMode}:${node.layoutWrap}:${node.primaryAxisAlignItems}:${node.counterAxisAlignItems}`);
      for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing', 'counterAxisSpacing']) {
        const v = node[k]; if (!v) continue;
        const n = await vname(b[k]?.id);
        if (n) tokens.spacing.add(n); else issue('warn', 'HARD_SPACING', variant, node, `${k} ${r(v)}px sin variable`);
        sig.push(`${k}:${n || r(v)}`);
      }
    } else if ('children' in node && node.children.filter((c) => c.visible).length > 1 && depth > 0) {
      issue('info', 'NO_AUTOLAYOUT', variant, node, 'Frame sin autolayout: usar análisis de geometría/columnas (grid-columns.mjs)');
    }
    for (const k of ['width', 'height', 'minWidth', 'maxWidth']) { const n = await vname(b[k]?.id); if (n) tokens.sizes.add(n); }
    if (node.layoutPositioning === 'ABSOLUTE') sig.push('abs');
  }
  // R-TK1: rectángulo que solo aporta el fondo
  if (node.type === 'RECTANGLE' && node.parent && node.parent.children[0] === node && node.parent.width > 0 &&
      node.width >= node.parent.width * 0.95 && node.height >= node.parent.height * 0.95 && node.fills?.some?.((f) => f.type === 'SOLID'))
    issue('warn', 'BG_RECT', variant, node, 'Rectángulo de fondo: el color debe ir en el frame contenedor (Backgrounds/Base)');
  for (const re of node.reactions || []) for (const a of re.actions || (re.action ? [re.action] : []))
    interactions.push({ variant, layer: node.name, trigger: re.trigger?.type, action: a?.type, navigation: a?.navigation, dest: a?.destinationId });
  if ('children' in node) for (const c of node.children) await walk(c, variant, depth + 1, sig, inInstance);
}

const modeName = (em) => {
  const out = {};
  for (const [cid, mid] of Object.entries(em || {})) { const c = colCache[cid]; if (c) out[c.name] = (c.modes.find((m) => m.modeId === mid) || {}).name; }
  return out;
};

const variantNodes = root.type === 'COMPONENT_SET' ? root.children : [root];
let props = {};
if (root.type === 'COMPONENT_SET' || (root.type === 'COMPONENT' && root.parent?.type !== 'COMPONENT_SET')) {
  for (const [k, v] of Object.entries(root.componentPropertyDefinitions)) props[k.split('#')[0]] = v.type === 'VARIANT' ? v.variantOptions : v.type;
}
const variants = [];
for (const v of variantNodes) {
  const sig = [];
  await walk(v, v.name, 0, sig, false);
  const b = v.boundVariables || {};
  variants.push({
    id: v.id, name: v.name, props: v.variantProperties || {}, fp: fnv(sig.join('\n')),
    w: r(v.width), h: r(v.height),
    layout: v.layoutMode && v.layoutMode !== 'NONE' ? { mode: v.layoutMode, wrap: v.layoutWrap, padding: [v.paddingTop, v.paddingRight, v.paddingBottom, v.paddingLeft].map(r), gap: r(v.itemSpacing),
      paddingVars: await Promise.all(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].map((k) => vname(b[k]?.id))), gapVar: await vname(b.itemSpacing?.id) } : { mode: 'NONE' },
    modes: modeName(v.explicitVariableModes), description: v.description || undefined,
  });
}

// Auditoría a nivel de máster
const devKey = Object.keys(props).find((k) => /device|breakpoint|viewport|dispositivo/i.test(k));
if (/^M\d+/i.test(root.name) || root.width >= 1200) {
  if (!devKey) issue('warn', 'NO_DEVICE_PROP', null, root, 'Módulo sin propiedad Device (Desktop/Mobile): habrá que inferir el responsive');
  else if (!props[devKey].some((o) => /mobile|xs|390/i.test(o))) issue('warn', 'NO_MOBILE', null, root, 'No hay variante Mobile: proponer adaptación al usuario');
  for (const v of variants) if (!Object.keys(v.modes).length) issue('info', 'NO_THEME_MODE', v.name, root, 'Variante sin modo explícito: hereda el subtema del contenedor');
}
if (generic) audit.push({ sev: 'info', code: 'GENERIC_NAMES', variant: null, layer: root.name, id: root.id, msg: `${generic} capas con nombre genérico (Frame 123…)` });
if (hidden) audit.push({ sev: 'info', code: 'HIDDEN_LAYERS', variant: null, layer: root.name, id: root.id, msg: `${hidden} capas ocultas (no se construyen)` });

// Deduplicar auditoría repetida entre variantes
function dedupeTexts(list) {
  const m = new Map();
  for (const t of list) { const k = `${t.layer}|${t.chars}|${t.style}`; if (m.has(k)) m.get(k).variants++; else m.set(k, { layer: t.layer, chars: t.chars, style: t.style, inInstance: t.inInstance, variants: 1, firstVariant: t.variant }); }
  return [...m.values()];
}
const seen = new Set(); const auditOut = [];
for (const a of audit) { const k = `${a.code}|${a.layer}|${a.msg}`; if (!seen.has(k)) { seen.add(k); auditOut.push(a); } }
const count = (s) => auditOut.filter((a) => a.sev === s).length;

return {
  id: root.id, name: root.name, type: root.type, page: page.name, pageId: page.id,
  fp: fnv(variants.map((v) => v.fp).join('|') + JSON.stringify(props)), readAt: new Date().toISOString(),
  description: root.description || undefined, props, variants,
  deps: [...deps].sort(), slots: [...slots], vectors: [...vectors].sort(),
  tokens: Object.fromEntries(Object.entries(tokens).map(([k, s]) => [k, [...s].sort()])),
  texts: dedupeTexts(texts), images: images.filter((x, i) => images.findIndex((y) => y.hash === x.hash && y.variant === x.variant) === i),
  interactions: interactions.slice(0, 40),
  audit: { errors: count('error'), warns: count('warn'), infos: count('info'), items: auditOut.slice(0, 120) },
};
