#!/usr/bin/env node
/**
 * figma-diff.mjs — Gestión de cambios entre Figma y código. Dos modos:
 *
 * 1) Figma vs Figma (qué cambió en un máster desde que se construyó):
 *      node scripts/figma-diff.mjs <digest-antiguo.json> <digest-nuevo.json>
 *    Convención: al construir se guarda .ai/masters/<slug>.json; cuando plan.mjs --drift avisa,
 *    Claude relee el máster con snippets/digest.js, lo guarda como .ai/masters/<slug>.new.json y
 *    ejecuta el diff. Si se aplica el cambio, el .new pasa a ser el digest vigente.
 *
 * 2) Figma vs código (qué tiene el máster que el código no):
 *      node scripts/figma-diff.mjs --digest .ai/masters/<slug>.json --meta <ruta>/<Nombre>.meta.json
 *    Compara ejes de variantes, valores, tokens y subtemas declarados en el meta.json (contrato del
 *    componente, ver references/docs.md) con el digest.
 *
 * Sale con código 2 si hay diferencias (útil para dod-check), 0 si no.
 */

import { parseArgs, readJson, die, loadConfig } from './lib.mjs';

const cfg = await loadConfig();
const THEME = cfg.figma?.collections?.theme;

const args = parseArgs();
const lines = [];
const out = (s) => lines.push(s);
const setDiff = (a = [], b = []) => ({ added: b.filter((x) => !a.includes(x)), removed: a.filter((x) => !b.includes(x)) });
const axes = (props = {}) => Object.fromEntries(Object.entries(props).filter(([, v]) => Array.isArray(v)));
let changes = 0;

function report(title, d) {
  if (!d.added.length && !d.removed.length) return;
  changes += d.added.length + d.removed.length;
  out(`  ${title}:`);
  if (d.added.length) out(`    + ${d.added.join(', ')}`);
  if (d.removed.length) out(`    - ${d.removed.join(', ')}`);
}

if (args.digest || args.meta) {
  // ---------- Figma vs código ----------
  if (!args.digest || !args.meta) die('Uso: --digest <digest.json> --meta <Nombre.meta.json>');
  const dg = await readJson(args.digest);
  const meta = await readJson(args.meta);
  out(`Figma «${dg.name}» vs código «${meta.name}»`);
  if (meta.figma?.fp && meta.figma.fp !== dg.fp) out(`  ⚠ El código se construyó con fp=${meta.figma.fp}; el digest actual es fp=${dg.fp}.`);
  const fa = axes(dg.props); const ca = meta.variantAxes || {};
  for (const [k, vals] of Object.entries(fa)) {
    if (/device|breakpoint|viewport|dispositivo/i.test(k)) continue; // el responsive se cubre con breakpoints, no con props
    if (!ca[k]) { out(`  ✗ Eje de variante sin implementar: ${k} (${vals.join(' / ')})`); changes++; continue; }
    report(`Valores de ${k}`, setDiff(ca[k], vals));
  }
  for (const k of Object.keys(ca)) if (!fa[k] && !(meta.codeOnlyAxes || []).includes(k)) out(`  · Eje solo en código: ${k} (declararlo en codeOnlyAxes si es intencionado)`);
  const nonVariant = Object.entries(dg.props || {}).filter(([, v]) => !Array.isArray(v)).map(([k]) => k);
  const codeProps = (meta.props || []).map((p) => p.figma || p.name);
  const norm = (s) => String(s).toLowerCase().replace(/^[⌙\s>\-]+/, '').replace(/[^a-z0-9]+/g, '');
  const missingProps = nonVariant.filter((p) => !codeProps.some((c) => norm(c) === norm(p)));
  if (missingProps.length) { out(`  ✗ Propiedades de Figma sin prop en código: ${missingProps.join(', ')}`); changes += missingProps.length; }
  const themes = [...new Set((dg.variants || []).map((v) => (THEME && v.modes?.[THEME]) || Object.values(v.modes || {}).find((x) => !/\d{3}/.test(x))).filter(Boolean))];
  if (themes.length && meta.subthemes?.default == null) { out(`  ✗ El máster usa subtemas (${themes.join(', ')}) y meta.subthemes.default no está declarado`); changes++; }
  if (dg.images?.length && !(meta.images?.length || meta.placeholders?.length)) { out(`  ✗ El máster tiene ${dg.images.length} imágenes y el meta no declara images ni placeholders`); changes++; }
} else {
  // ---------- Figma vs Figma ----------
  const [a, b] = args._;
  if (!a || !b) die('Uso: figma-diff.mjs <digest-antiguo.json> <digest-nuevo.json>  |  --digest x --meta y');
  const A = await readJson(a); const B = await readJson(b);
  out(`«${B.name}»: ${A.fp === B.fp ? 'sin cambios (misma huella)' : `huella ${A.fp} → ${B.fp}`}`);
  if (A.fp !== B.fp) {
    const aV = Object.fromEntries((A.variants || []).map((v) => [v.name, v])); const bV = Object.fromEntries((B.variants || []).map((v) => [v.name, v]));
    report('Variantes', setDiff(Object.keys(aV), Object.keys(bV)));
    const changed = Object.keys(bV).filter((k) => aV[k] && aV[k].fp !== bV[k].fp);
    if (changed.length) { changes += changed.length; out(`  ~ Variantes modificadas (${changed.length}): ${changed.slice(0, 12).join(' | ')}${changed.length > 12 ? '…' : ''}`); }
    for (const k of changed) {
      const x = aV[k], y = bV[k];
      if (x.w !== y.w || x.h !== y.h) out(`      ${k}: tamaño ${x.w}×${x.h} → ${y.w}×${y.h}`);
      if (JSON.stringify(x.layout) !== JSON.stringify(y.layout)) out(`      ${k}: layout ${JSON.stringify(x.layout)} → ${JSON.stringify(y.layout)}`);
      if (JSON.stringify(x.modes) !== JSON.stringify(y.modes)) out(`      ${k}: modos ${JSON.stringify(x.modes)} → ${JSON.stringify(y.modes)}`);
    }
    const pa = axes(A.props), pb = axes(B.props);
    report('Ejes de variante', setDiff(Object.keys(pa), Object.keys(pb)));
    for (const k of Object.keys(pb)) if (pa[k]) report(`Valores de ${k}`, setDiff(pa[k], pb[k]));
    report('Propiedades (texto/boolean/slot/swap)', setDiff(Object.keys(A.props || {}).filter((k) => !pa[k]), Object.keys(B.props || {}).filter((k) => !pb[k])));
    report('Dependencias (componentes usados)', setDiff(A.deps, B.deps));
    for (const t of ['colors', 'spacing', 'radius', 'sizes', 'textStyles', 'effects']) report(`Tokens ${t}`, setDiff(A.tokens?.[t], B.tokens?.[t]));
    report('Imágenes (imageHash)', setDiff([...new Set((A.images || []).map((i) => i.hash))], [...new Set((B.images || []).map((i) => i.hash))]));
    const ta = (A.texts || []).map((t) => t.chars), tb = (B.texts || []).map((t) => t.chars);
    const td = setDiff(ta, tb);
    if (td.added.length || td.removed.length) { changes++; out(`  Textos: +${td.added.length} / -${td.removed.length} (contenido)`); for (const t of td.added.slice(0, 5)) out(`    + "${t.slice(0, 80)}"`); }
    const da = A.audit?.errors ?? 0, db = B.audit?.errors ?? 0;
    if (da !== db) out(`  Auditoría: errores ${da} → ${db}`);
  }
}

console.log(lines.join('\n'));
if (changes) console.log(`\n${changes} diferencias. Decide con el usuario: actualizar código (Figma manda) o anotar la divergencia en CHANGELOG.md.`);
process.exitCode = changes ? 2 : 0;
