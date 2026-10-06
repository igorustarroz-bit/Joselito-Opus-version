#!/usr/bin/env node
/**
 * webfonts.mjs — Resuelve las tipografías del proyecto y genera el CSS para cargarlas.
 *
 * Regla de Hanzo: **Google Fonts (online) si la familia está ahí; fonts-raw/ solo si no lo está.**
 * Las fuentes del sistema (Georgia, Arial…) no se cargan.
 *
 * Familias y cortes necesarios: los de los estilos de texto de Figma (.ai/figma/variables.json →
 * textStyles; si no existe, tokens.meta.json → fontFamilies). Cada familia se resuelve así:
 *   1. hanzo.config.json → fonts.overrides["Familia"] = "google" | "raw" | "system"  (manda siempre)
 *   2. fuente del sistema conocida → system
 *   3. consulta a la API de Google Fonts (css2): 200 = existe ese corte, 400 = no
 *   4. sin red: si hay ficheros en fonts-raw/ → raw; si no → pide confirmarlo en fonts.overrides
 *   Cortes que Google no tiene (p. ej. un Black italic) se buscan en fonts-raw/.
 *
 * Salida (rutas del perfil, ver lib.profilePaths):
 *   - fonts-google.css: SOLO el @import de Google Fonts (una URL). Se importa el PRIMERO de todos
 *     (un @import remoto que no está al principio del CSS final se descarta)
 *   - fonts.css: @font-face de las familias raw (WOFF2)
 *   - <out>/<familia>-<peso>[-italic].woff2 solo para las familias raw
 *
 * Uso:
 *   node scripts/webfonts.mjs [--in fonts-raw] [--out public/fonts] [--css src/tokens/fonts.css]
 *        [--url-prefix /fonts] [--display swap] [--local]   (--local = todo self-hosted desde fonts-raw)
 *
 * Requisitos para las raw: npm i -D wawoff2 fontkit. fonts-raw/ va en .gitignore (licencias).
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs, slug, writeFile, walk, die, loadConfig, profilePaths, readJson } from './lib.mjs';

const args = parseArgs();
const cfg = await loadConfig();
const IN = args.in || 'fonts-raw';
const P = profilePaths(cfg);
const OUT = args.out || P.fonts;
const CSS = args.css || P.fontsCss;
const GCSS = args['google-css'] || P.fontsGoogleCss;
const PREFIX = args['url-prefix'] ?? P.fontsUrl;
const DISPLAY = args.display || 'swap';
const LOCAL = Boolean(args.local) || cfg.fonts?.source === 'raw';
const OVERRIDES = cfg.fonts?.overrides || {};

const WEIGHTS = { thin: 100, hairline: 100, extralight: 200, ultralight: 200, light: 300, regular: 400, normal: 400, book: 400, roman: 400,
  medium: 500, semibold: 600, demibold: 600, bold: 700, extrabold: 800, ultrabold: 800, black: 900, heavy: 900 };
const weightOf = (s) => {
  const k = String(s).toLowerCase().replace(/italic|oblique/g, '').replace(/[\s_-]+/g, '');
  return WEIGHTS[k] ?? (/^\d{3}$/.test(k) ? Number(k) : 400);
};
const isItalic = (s) => /italic|oblique/i.test(String(s));
const SYSTEM = /^(georgia|arial|helvetica( neue)?|times( new roman)?|verdana|tahoma|trebuchet ms|courier( new)?|system-ui|-apple-system|sf pro( text| display)?|segoe ui|menlo|monaco)$/i;

// ---------- 1. Familias y cortes que pide Figma ----------
const need = new Map(); // family -> Set("400", "700i")
const dump = await readJson('.ai/figma/variables.json', null);
const meta = await readJson(path.join(P.tokens, 'tokens.meta.json'), null);
const addCut = (fam, w, it) => { if (!fam) return; if (!need.has(fam)) need.set(fam, new Set()); need.get(fam).add(`${w}${it ? 'i' : ''}`); };
for (const s of dump?.textStyles || []) addCut(s.family, weightOf(s.style), isItalic(s.style));
for (const f of meta?.fontFamilies || []) for (const c of f.cuts || []) addCut(f.family, c.weight, c.italic);
for (const [fam, cuts] of Object.entries(cfg.fonts?.extra || {})) for (const c of cuts) addCut(fam, weightOf(c), isItalic(c)); // cortes extra a mano

// ---------- 2. Ficheros raw disponibles ----------
let wawoff2, fontkit;
async function loadRawDeps() {
  if (wawoff2) return;
  try { wawoff2 = (await import('wawoff2')).default; fontkit = await import('fontkit'); }
  catch { die('Hay familias que van en local (fonts-raw/) y faltan dependencias: npm i -D wawoff2 fontkit'); }
}
const rawFiles = await walk(IN, (p) => /\.(ttf|otf|woff2)$/i.test(p));
const raw = []; // { family, weight, italic, path, buf }
if (rawFiles.length) {
  await loadRawDeps();
  for (const f of rawFiles) {
    const buf = await fs.readFile(f);
    let family, sub, weight, italic;
    try {
      const font = fontkit.create(buf);
      family = font.name?.records?.preferredFamily?.en || font.familyName;
      sub = font.name?.records?.preferredSubfamily?.en || font.subfamilyName || '';
      weight = font['OS/2']?.usWeightClass || weightOf(sub);
      italic = isItalic(sub) || Boolean(font['OS/2']?.fsSelection?.italic);
    } catch {
      const base = path.basename(f).replace(/\.[^.]+$/, '');
      family = base.split(/[-_]/)[0]; sub = base.slice(family.length); weight = weightOf(sub.replace(/^[-_]/, '') || 'regular'); italic = isItalic(sub);
    }
    raw.push({ family, weight, italic, path: f, buf });
  }
}
const sameFam = (a, b) => a.toLowerCase().replace(/\s+/g, '') === b.toLowerCase().replace(/\s+/g, '');
// Si no hay estilos de Figma (proyecto sin volcado aún), se usan las familias de fonts-raw
if (!need.size) for (const r of raw) addCut(r.family, r.weight, r.italic);
if (!need.size) die('No sé qué fuentes necesita el proyecto: guarda antes .ai/figma/variables.json (snippets/variables.js) o pon ficheros en fonts-raw/.');

// ---------- 3. Resolver cada familia ----------
const gUrl = (fam, cuts) => {
  const tuples = [...cuts].map((c) => [c.endsWith('i') ? 1 : 0, parseInt(c, 10)]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return `family=${encodeURIComponent(fam).replace(/%20/g, '+')}:ital,wght@${tuples.map((t) => t.join(',')).join(';')}`;
};
let offline = false;
async function onGoogle(fam, cut) {
  if (offline) return null;
  try {
    const r = await fetch(`https://fonts.googleapis.com/css2?${gUrl(fam, [cut])}&display=${DISPLAY}`, { signal: AbortSignal.timeout(8000) });
    if (r.status === 200) return true;
    if (r.status === 400) return false;
    offline = true; return null; // 403/5xx = proxy o red bloqueada
  } catch { offline = true; return null; }
}

const plan = []; // { family, mode: google|raw|system|missing, cuts, googleCuts, rawCuts, missing }
for (const [fam, cuts] of need) {
  const o = OVERRIDES[fam];
  const rawCutsAvail = new Set(raw.filter((r) => sameFam(r.family, fam)).map((r) => `${r.weight}${r.italic ? 'i' : ''}`));
  const entry = { family: fam, cuts: [...cuts], googleCuts: [], rawCuts: [], missing: [] };
  if (o === 'system' || (!o && SYSTEM.test(fam))) { entry.mode = 'system'; plan.push(entry); continue; }
  if (o === 'raw' || LOCAL) { entry.mode = 'raw'; }
  else if (o === 'google') { entry.mode = 'google'; entry.googleCuts = [...cuts]; }
  else {
    for (const c of cuts) {
      const g = await onGoogle(fam, c);
      if (g === true) entry.googleCuts.push(c);
      else if (g === null) { entry.unknown = true; break; }
    }
    entry.mode = entry.unknown ? (rawCutsAvail.size ? 'raw' : 'unknown') : entry.googleCuts.length ? 'google' : 'raw';
  }
  for (const c of cuts) {
    if (entry.googleCuts.includes(c)) continue;
    if (rawCutsAvail.has(c)) entry.rawCuts.push(c);
    else if (entry.mode !== 'unknown') entry.missing.push(c);
  }
  plan.push(entry);
}

// ---------- 4. Escribir ----------
const css = ['/* Fuentes self-hosted (fonts-raw → WOFF2) — generado por webfonts.mjs. No editar a mano.',
  '   Las que están en Google Fonts van en fonts-google.css. */', ''];
const google = plan.filter((p) => p.googleCuts.length);
const gurl = google.length ? `https://fonts.googleapis.com/css2?${google.map((p) => gUrl(p.family, p.googleCuts)).join('&')}&display=${DISPLAY}` : null;
await writeFile(GCSS, gurl ? `@import url("${gurl}");\n/* Google Fonts — generado por webfonts.mjs. Debe importarse antes que cualquier otro CSS. */\n`
  : '/* Sin familias de Google Fonts en este proyecto (webfonts.mjs). */\n');

const written = [];
const rawNeeded = plan.flatMap((p) => p.rawCuts.map((c) => ({ family: p.family, cut: c })));
if (rawNeeded.length) await loadRawDeps();
for (const { family, cut } of rawNeeded) {
  const w = parseInt(cut, 10), it = cut.endsWith('i');
  const r = raw.find((x) => sameFam(x.family, family) && x.weight === w && x.italic === it);
  const name = `${slug(family)}-${w}${it ? '-italic' : ''}`;
  const data = /\.woff2$/i.test(r.path) ? r.buf : Buffer.from(await wawoff2.compress(r.buf));
  await writeFile(path.join(OUT, `${name}.woff2`), data);
  written.push(name);
  css.push('@font-face {', `  font-family: "${family}";`,
    PREFIX === 'shopify' ? `  src: url("{{ '${name}.woff2' | asset_url }}") format("woff2");` : `  src: url("${PREFIX ? PREFIX + '/' : ''}${name}.woff2") format("woff2");`,
    `  font-weight: ${w};`, `  font-style: ${it ? 'italic' : 'normal'};`, `  font-display: ${DISPLAY};`, '}', '');
}
await writeFile(CSS, css.join('\n'));

// ---------- 5. Informe ----------
const label = { google: 'Google Fonts (online)', raw: 'fonts-raw → WOFF2 (local)', system: 'sistema (no se carga)', unknown: '¿? sin red para comprobar' };
console.log(`✓ Fuentes → ${GCSS} + ${CSS}${written.length ? ` · ${written.length} WOFF2 en ${OUT}/` : ''}`);
for (const p of plan) {
  const parts = [p.googleCuts.length ? `Google: ${p.googleCuts.join(', ')}` : null, p.rawCuts.length ? `local: ${p.rawCuts.join(', ')}` : null].filter(Boolean).join(' · ');
  console.log(`  ${p.family} — ${label[p.mode]}${parts ? ` (${parts})` : ''}`);
  if (p.missing.length) console.warn(`    ⚠ Faltan cortes ${p.missing.join(', ')}: ni en Google ni en ${IN}/ → pide los ficheros al usuario`);
}
const unknown = plan.filter((p) => p.mode === 'unknown');
if (unknown.length) {
  console.warn(`⚠ Sin acceso a fonts.googleapis.com para comprobar: ${unknown.map((u) => u.family).join(', ')}.`);
  console.warn('  Indica en hanzo.config.json → fonts.overrides { "Familia": "google" | "raw" } y vuelve a ejecutar.');
}
const unusedRaw = [...new Set(raw.filter((r) => !plan.some((p) => sameFam(p.family, r.family) && p.rawCuts.length)).map((r) => r.family))];
if (unusedRaw.length) console.log(`  · En ${IN}/ pero no se usan (Google las sirve o Figma no las pide): ${unusedRaw.join(', ')}`);
process.exitCode = plan.some((p) => p.missing.length) || unknown.length ? 2 : 0;
