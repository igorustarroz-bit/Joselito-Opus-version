#!/usr/bin/env node
/**
 * plan.mjs — Genera/actualiza el plan de trabajo a partir de los inventarios de Figma.
 *
 * Entradas:
 *   .ai/figma/inventory/*.json   salida de snippets/inventory.js (una por página)
 *   .ai/figma-profile.json       roles de página y convenciones (references/figma-profile.md)
 *   .ai/index.json  (opcional)   estado previo: se conserva (status, notas, codePath, builtFp)
 *   PLAN.md         (opcional)   si alguien marcó checkboxes a mano, se respetan (marcador <!-- k:... -->)
 *
 * Salidas:
 *   .ai/index.json   fuente de verdad del plan (un item por elemento, con nodeId re-resuelto por nombre)
 *   PLAN.md          vista legible, ordenada: Setup → Tokens → Foundations → Iconos/Brand →
 *                    HITO imágenes → Componentes (por dependencias) → Módulos → Templates → Flujos
 *
 * Uso:
 *   npm run plan --                     regenera
 *   npm run plan -- --set <key>=done    cambia estado (todo|doing|done|blocked|skip) y regenera
 *   npm run plan -- --set <key>=done --fp   además guarda builtFp = fp actual (tras construir)
 *   npm run plan -- --drift             solo informa de másters que cambiaron en Figma desde que se construyeron
 *   npm run plan -- --next              imprime el siguiente elemento pendiente
 *   npm run plan -- --status            resumen legible por fases ("dónde estamos"), para enseñar al usuario
 */

import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import { parseArgs, slug, readJson, writeJson, writeFile, loadConfig, exists } from './lib.mjs';

const args = parseArgs();
const cfg = await loadConfig();
const profile = await readJson('.ai/figma-profile.json', {});
const prev = await readJson('.ai/index.json', { items: [] });
const prevBy = Object.fromEntries(prev.items.map((i) => [i.key, i]));

// ---------- 1. Leer inventarios ----------
const invDir = '.ai/figma/inventory';
const invFiles = (await exists(invDir)) ? (await fs.readdir(invDir)).filter((f) => f.endsWith('.json')) : [];
const pages = [];
for (const f of invFiles) pages.push(await readJson(path.join(invDir, f)));

const roleOf = (page) => {
  const roles = profile.pages || {};
  for (const [role, v] of Object.entries(roles)) {
    const list = Array.isArray(v) ? v : [v];
    if (list.some((x) => x && (x === page.pageId || x === page.page || (x.id && x.id === page.pageId)))) return role;
  }
  // Heurística por nombre (plantilla Hanzo y ficheros parecidos)
  const n = page.page;
  if (/foundation/i.test(n)) return 'foundations';
  if (/brand|asset|icon/i.test(n)) return 'brandAssets';
  if (/raw module|m[oó]dulo|module|section/i.test(n)) return 'modules';
  if (/component/i.test(n)) return 'components';
  if (/notation|read me|cover|changelog|wip|deck|present|archive|old|deprecated/i.test(n)) return 'ignore';
  return 'templates';
};
const naming = profile.naming || {};
const RE = (s, d) => new RegExp(s || d, 'i');
const isModuleName = RE(naming.module, '^M\\d+');
const isPrivate = RE(naming.private, '^[._]|^z_|not to dev|wip');
const isFoundation = RE(naming.foundation, '^(aspect ratio|grid|icon sizer|spacer)$');

// ---------- 2. Clasificar ----------
const items = [];
const add = (it) => {
  let key = it.key || `${it.kind}:${slug(it.name)}`;
  // Nombres que solo difieren en mayúsculas (accordion / Accordion) darían la misma clave:
  // la segunda se desambigua con el nodeId para que cada máster tenga su propio estado.
  if (items.some((i) => i.key === key)) key = `${key}--${String(it.nodeId || items.length).replace(':', '-')}`;
  const p = prevBy[key] || {};
  items.push({ status: 'todo', ...p, ...it, key,
    status: p.status || it.status || 'todo', notes: p.notes, codePath: p.codePath, builtFp: p.builtFp });
};

// Setup y tokens: items fijos
const fixed = [
  ['setup', 'setup:config', 'Configuración del proyecto (hanzo.config.json, permisos, git, MCP, plan Figma)'],
  ['setup', 'setup:scaffold', `Scaffold del perfil de salida (${cfg.output || 'react-storybook'}) + despliegue`],
  ['setup', 'setup:webfonts', 'Tipografías: Google Fonts si existen, fonts-raw/ si no (npm run fonts)'],
  ['tokens', 'tokens:dump', 'Volcado de variables y estilos (.ai/figma/variables.json)'],
  ['tokens', 'tokens:generate', 'Generar tokens (npm run tokens) y documentarlos: primitivas, responsive/breakpoints, subtemas, tipografía, espaciados, grid, efectos'],
];
for (const [phase, key, name] of fixed) add({ phase, kind: phase, key, name });

const masters = [];
for (const pg of pages) {
  const role = roleOf(pg);
  if (role === 'ignore') continue;
  for (const m of pg.masters) {
    if (isPrivate.test(m.name) || isPrivate.test(m.section || '')) continue;
    let kind;
    // Brand Assets: TODO máster vectorial (iconos, logos, certificaciones, firmas…) va al paso de vectores
    if (role === 'brandAssets') kind = m.vectorsOnly && !m.images ? 'icon' : 'brand';
    else if (role === 'foundations' || isFoundation.test(m.name)) kind = 'foundation';
    else if (role === 'modules' || isModuleName.test(m.name)) kind = 'module';
    else kind = 'component';
    masters.push({ ...m, kind, pageId: pg.pageId, page: pg.page });
  }
}

const icons = masters.filter((m) => m.kind === 'icon');
const iconNames = new Set(icons.map((m) => m.name));
for (const m of masters.filter((m) => m.kind === 'foundation')) add({ phase: 'foundations', kind: 'foundation', name: m.name, nodeId: m.id, pageId: m.pageId, fp: m.fp, variants: m.variants, deps: m.deps, images: m.images });
if (icons.length) {
  const bySection = {};
  for (const i of icons) bySection[i.section || 'Sin sección'] = (bySection[i.section || 'Sin sección'] || 0) + 1;
  add({ phase: 'brand', kind: 'icons', key: 'icons:set',
    name: `Vectores de Brand Assets (${icons.length} másters) → SVG optimizado (SVGO/SVGR)`,
    note: Object.entries(bySection).map(([s, n]) => `${s}: ${n}`).join(' · '),
    count: icons.length, nodeIds: icons.map((i) => i.id), sections: bySection,
    fp: crypto.createHash('sha1').update(icons.map((i) => `${i.name}:${i.fp}`).join('|')).digest('hex').slice(0, 8) });
}
// Brand assets NO vectoriales (imagen raster o texto sin contornear): uno a uno
for (const m of masters.filter((m) => m.kind === 'brand')) add({ phase: 'brand', kind: 'brand', name: m.name, nodeId: m.id, pageId: m.pageId, fp: m.fp, variants: m.variants, images: m.images,
  note: m.images ? 'brand asset con imagen raster (su imagen va en el hito de imágenes)' : 'brand asset con texto sin contornear: pedir a diseño que lo vectorice o construirlo como componente' });
add({ phase: 'milestone', kind: 'milestone', key: 'milestone:images', name: 'HITO: descarga de imágenes raster → WebP + maps/images.json (npm run images)', images: masters.reduce((a, m) => a + (m.images || 0), 0) });

// Orden topológico por dependencias dentro de cada grupo
const known = new Map(masters.map((m) => [m.name, m]));
function topo(list) {
  const names = new Set(list.map((m) => m.name));
  const done = new Set(); const out = []; const visiting = new Set(); const cycles = [];
  const visit = (m) => {
    if (done.has(m.name)) return;
    if (visiting.has(m.name)) { cycles.push(m.name); return; }
    visiting.add(m.name);
    for (const d of m.deps || []) if (names.has(d)) visit(known.get(d));
    visiting.delete(m.name); done.add(m.name); out.push(m);
  };
  // primero los más usados (base de otros)
  const usedBy = (n) => masters.filter((x) => (x.deps || []).includes(n)).length;
  for (const m of [...list].sort((a, b) => usedBy(b.name) - usedBy(a.name) || a.name.localeCompare(b.name))) visit(m);
  return { out, cycles };
}
const comp = topo(masters.filter((m) => m.kind === 'component'));
for (const m of comp.out) add({ phase: 'components', kind: 'component', name: m.name, nodeId: m.id, pageId: m.pageId, fp: m.fp, variants: m.variants, deps: (m.deps || []).filter((d) => !iconNames.has(d)), images: m.images, autolayout: `${m.autolayout}/${m.variants}` });
const mods = topo(masters.filter((m) => m.kind === 'module'));
for (const m of mods.out) add({ phase: 'modules', kind: 'module', name: m.name, nodeId: m.id, pageId: m.pageId, fp: m.fp, variants: m.variants, deps: (m.deps || []).filter((d) => !iconNames.has(d)), images: m.images, autolayout: `${m.autolayout}/${m.variants}` });

// Templates: frames de páginas "templates" agrupados por nombre base (Home 1440px / Home 390px → Home)
const tpl = new Map();
for (const pg of pages.filter((p) => roleOf(p) === 'templates')) {
  for (const f of pg.frames || []) {
    const base = f.name.replace(/\s*[-–—]?\s*\d{3,4}\s*(px)?\s*$/i, '').trim() || f.name;
    const pgName = pg.page.replace(/^[\s↳]+/, '').replace(/[🟢🟡🔴]/gu, '').trim();
    const k = pgName.toLowerCase().includes(base.toLowerCase()) ? pgName : `${pgName} / ${base}`;
    const t = tpl.get(k) || { name: k, frames: [], pageId: pg.pageId, modules: new Set(), reactions: false };
    t.frames.push({ id: f.id, w: f.w }); f.modules.forEach((x) => t.modules.add(x)); t.reactions ||= f.hasReactions;
    (t.fpParts ||= []).push(f.fp || `${f.w}x${f.h}:${f.modules.join(',')}`);
    tpl.set(k, t);
  }
}
for (const t of tpl.values()) add({ phase: 'templates', kind: 'template', name: t.name, pageId: t.pageId, nodeId: t.frames[0]?.id, frames: t.frames,
  deps: [...t.modules].filter(Boolean), reactions: t.reactions, fp: t.fpParts?.length ? crypto.createHash('sha1').update(t.fpParts.join('|')).digest('hex').slice(0, 8) : undefined });
if ([...tpl.values()].some((t) => t.reactions)) add({ phase: 'flows', kind: 'flows', key: 'flows:prototype', name: 'Flujos entre pantallas (prototipo de Figma → navegación en código)' });

// PLAN.md editado a mano: respetar checkboxes
const planTxt = (await exists('PLAN.md')) ? await fs.readFile('PLAN.md', 'utf8') : '';
const MARK = { ' ': 'todo', '~': 'doing', x: 'done', X: 'done', '!': 'blocked', '-': 'skip' };
for (const line of planTxt.split('\n')) {
  const m = line.match(/^- \[(.)\].*<!-- k:(.+?) -->/);
  if (!m) continue;
  const it = items.find((i) => i.key === m[2]);
  const st = MARK[m[1]];
  if (it && st && st !== it.status && !(prevBy[it.key] && prevBy[it.key].status === st)) it.status = st;
}

// --set key=status
if (args.set) {
  for (const s of [].concat(args.set)) {
    const [k, st] = String(s).split('=');
    const it = items.find((i) => i.key === k || i.name === k);
    if (!it) { console.error(`✗ No existe "${k}". Claves: npm run plan -- --keys`); process.exit(1); }
    it.status = st;
    if (args.fp && st === 'done') it.builtFp = it.fp;
  }
}

// Removed: estaban en el plan y ya no están en Figma
const nowKeys = new Set(items.map((i) => i.key));
const removed = prev.items.filter((i) => !nowKeys.has(i.key) && i.nodeId);

// Drift: construidos con una huella distinta de la actual
const drift = items.filter((i) => i.status === 'done' && i.builtFp && i.fp && i.builtFp !== i.fp);

if (args.keys) { for (const i of items) console.log(`${i.key}\t${i.status}\t${i.name}`); process.exit(0); }
if (args.drift) {
  console.log(drift.length ? `⚠ ${drift.length} elementos cambiaron en Figma desde que se construyeron:` : '✓ Sin cambios en Figma respecto a lo construido.');
  for (const i of drift) console.log(`  - ${i.name} (${i.key}) built=${i.builtFp} now=${i.fp} → releer digest y npm run diff --`);
  if (removed.length) console.log(`⚠ Ya no existen en Figma: ${removed.map((r) => r.name).join(', ')}`);
  process.exit(drift.length || removed.length ? 2 : 0);
}

// ---------- 3. Escribir ----------
await writeJson('.ai/index.json', { generatedAt: new Date().toISOString(), output: cfg.output || 'react-storybook', items, removed, cycles: [...comp.cycles, ...mods.cycles] });

const BOX = { todo: ' ', doing: '~', done: 'x', blocked: '!', skip: '-' };
const PH = [
  ['setup', 'Fase 0 — Setup'], ['tokens', 'Fase 1 — Tokens (antes que cualquier componente)'],
  ['foundations', 'Fase 2 — Foundations'], ['brand', 'Fase 2b — Vectores de Brand Assets (iconos, logos, certificaciones, firmas…)'],
  ['milestone', 'Fase 2.5 — HITO de imágenes (justo después de los iconos; no se salta)'],
  ['components', 'Fase 3 — Componentes (ordenados: primero los que son base de otros)'],
  ['modules', 'Fase 4 — Módulos (100% ancho, grid de columnas del sistema, por breakpoint)'],
  ['templates', 'Fase 5 — Page templates'], ['flows', 'Fase 6 — Flujos entre pantallas'],
];
const out = [`# PLAN.md — ${cfg.client || cfg.project || 'Proyecto'}`, '',
  'Estados: `[ ]` pendiente · `[~]` en progreso · `[x]` hecho · `[!]` bloqueado · `[-]` fuera de alcance.',
  'Nada se marca hecho sin cumplir la **Definition of Done** (CONTEXT.md / references/dod.md).',
  'Generado por `scripts/plan.mjs` desde `.ai/index.json`: para cambiar estados usa `npm run plan -- --set <clave>=done --fp` o marca el checkbox (se respeta al regenerar).', ''];
const counts = Object.fromEntries(Object.keys(BOX).map((s) => [s, items.filter((i) => i.status === s).length]));
out.push(`**Progreso:** ${counts.done}/${items.length - counts.skip} hechos · ${counts.doing} en curso · ${counts.blocked} bloqueados${drift.length ? ` · ⚠ ${drift.length} cambiados en Figma` : ''}`, '');
for (const [ph, title] of PH) {
  const list = items.filter((i) => i.phase === ph);
  if (!list.length) continue;
  out.push(`## ${title}`, '');
  for (const i of list) {
    const extra = [i.variants > 1 ? `${i.variants} variantes` : null, i.images ? `${i.images} img` : null,
      i.deps?.length ? `usa: ${i.deps.slice(0, 6).join(', ')}${i.deps.length > 6 ? '…' : ''}` : null,
      i.autolayout && !i.autolayout.startsWith(String(i.variants)) ? `autolayout ${i.autolayout} → análisis de geometría` : null,
      i.note || null, i.notes || null,
      drift.includes(i) ? '⚠ CAMBIÓ EN FIGMA' : null].filter(Boolean).join(' · ');
    out.push(`- [${BOX[i.status] || ' '}] ${i.name}${i.nodeId ? ` \`${i.nodeId}\`` : ''}${extra ? ` — ${extra}` : ''} <!-- k:${i.key} -->`);
  }
  out.push('');
}
if (removed.length) out.push('## ⚠ Ya no existen en Figma', '', ...removed.map((r) => `- ${r.name} (${r.key}) — decidir: borrar del código o mantener`), '');
await writeFile('PLAN.md', out.join('\n'));

const next = items.find((i) => i.status === 'doing') || items.find((i) => i.status === 'todo');
if (args.status) {
  // Vista para el usuario: las 6 etapas que se explican en la intro (references/communication.md)
  const STAGES = [
    ['1. Preparación', ['setup']],
    ['2. Análisis del Figma y plan', []],
    ['3. Estilos base (tokens y foundations)', ['tokens', 'foundations']],
    ['4. Iconos, logos e imágenes', ['brand', 'milestone']],
    ['5. Componentes y módulos', ['components', 'modules']],
    ['6. Páginas y flujos', ['templates', 'flows']],
  ];
  const live = items.filter((i) => i.status !== 'skip');
  const done = live.filter((i) => i.status === 'done').length;
  console.log(`Progreso de ${cfg.client || cfg.project || 'el proyecto'}: ${done}/${live.length} elementos (${Math.round((done / Math.max(1, live.length)) * 100)}%)`);
  for (const [title, phases] of STAGES) {
    const l = live.filter((i) => phases.includes(i.phase));
    if (!phases.length) { console.log(`✅ ${title} — hecho (PLAN.md)`); continue; }
    if (!l.length) continue;
    const d = l.filter((i) => i.status === 'done').length;
    const here = next && phases.includes(next.phase);
    const sub = phases.length > 1 ? ' · ' + phases.map((ph) => { const x = l.filter((i) => i.phase === ph); return x.length ? `${PH.find((p) => p[0] === ph)[1].replace(/^Fase [\d.b]+ — /, '').replace(/\s*\(.*\)$/, '')} ${x.filter((i) => i.status === 'done').length}/${x.length}` : null; }).filter(Boolean).join(', ') : '';
    const icon = d === l.length ? '✅' : here ? '👉' : d ? '🟡' : '⬜';
    console.log(`${icon} ${title} — ${d}/${l.length}${sub}${here ? '   ← estamos aquí' : ''}`);
  }
  console.log(next ? `Siguiente: ${next.name}` : 'Plan completo 🎉');
  if (drift.length) console.log(`⚠ ${drift.length} elemento(s) ya hechos han cambiado en Figma`);
  process.exit(0);
}
if (args.next) { console.log(next ? `${next.key}\t${next.name}${next.nodeId ? `\t${next.nodeId}` : ''}` : 'Plan completo'); process.exit(0); }
console.log(`✓ Plan: ${items.length} elementos (${masters.length} másters de ${pages.length} páginas) → PLAN.md + .ai/index.json`);
console.log(`  Siguiente: ${next ? next.name : '—'}`);
if (comp.cycles.length || mods.cycles.length) console.warn(`⚠ Dependencias circulares: ${[...comp.cycles, ...mods.cycles].join(', ')}`);
if (drift.length) console.warn(`⚠ ${drift.length} elementos hechos han cambiado en Figma (ver --drift)`);
// Único acuerdo obligatorio con diseño: cada módulo es un máster (no un frame suelto)
const loose = pages.flatMap((p) => (p.notMasters || []).map((f) => ({ ...f, page: p.page })));
if (loose.length) {
  console.warn(`⚠ ${loose.length} módulo(s) dibujados como frame suelto, no como máster (no entran en el plan):`);
  for (const f of loose.slice(0, 15)) console.warn(`  - ${f.name} (${f.id}, ${f.w}px) en «${f.page}» → pedir a diseño que lo convierta en componente Mxx-Nombre`);
}
