#!/usr/bin/env node
/**
 * token-audit.mjs — Busca valores hardcodeados en el código: nada debe salirse de los tokens.
 *
 * Detecta:
 *   ERROR  colores literales (#hex, rgb(), hsl()) fuera de la carpeta de tokens
 *   ERROR  clases arbitrarias de Tailwind con valor literal: p-[24px], bg-[#fff], text-[18px]
 *   ERROR  paleta por defecto de Tailwind: bg-red-500, text-gray-700, border-black…
 *   WARN   primitivas de color usadas directamente (var(--color-…) de una colección base):
 *          los colores se aplican SIEMPRE vía tokens semánticos
 *   WARN   px literales en padding/margin/gap/font-size/line-height/border-radius/width… con
 *          sugerencia del token cuyo valor base coincide
 *   INFO   arbitrarias que envuelven un token (p-[var(--x)]): válido, pero mejor la utilidad del tema
 *
 * Uso:
 *   node scripts/token-audit.mjs [rutas…] [--tokens src/tokens] [--json] [--strict]
 *   Rutas por defecto según perfil (hanzo.config.json → output): react-storybook: src ·
 *   html-static: css components pages · shopify: sections snippets blocks assets layout templates
 *   --strict: los WARN también hacen fallar (exit 2).
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs, readJson, walk, loadConfig, profilePaths } from './lib.mjs';

const args = parseArgs();
const cfg = await loadConfig();
const TOK = args.tokens || profilePaths(cfg).tokens;
const DEFAULTS = { 'react-storybook': ['src'], 'html-static': ['css', 'components', 'pages', 'js'], shopify: ['sections', 'snippets', 'blocks', 'assets', 'layout', 'templates'] };
const roots = args._.length ? args._ : DEFAULTS[cfg.output || 'react-storybook'];
const meta = await readJson(path.join(TOK, 'tokens.meta.json'), { cssVars: {} });

// Valores base de tokens dimensionales → para sugerir sustituto
const baseVals = {};
try {
  const css = await fs.readFile(path.join(TOK, 'tokens.css'), 'utf8');
  const firstRoots = css.split('@media')[0];
  for (const m of firstRoots.matchAll(/(--[a-z0-9-]+):\s*(-?[\d.]+)px;/g)) (baseVals[m[2]] ||= []).push(m[1]);
} catch {}
const CAT = [[/radius/, /corner|radius/], [/font-size|line-height|letter/, /typograph|tipograph|font|-sz|-lh|letter/],
  [/width|height|top|left|right|bottom|inset/, /size|cols|width|height|wrapper/], [/./, /spac|gap|padding|margin|wrapper|gutter/]];
const suggest = (px, prop) => { const re = CAT.find(([p]) => p.test(prop))[1]; return (baseVals[px] || []).filter((n) => re.test(n)).slice(0, 3); };

const exts = /\.(css|scss|jsx|tsx|js|ts|mdx|html|liquid|vue|svelte)$/;
const files = [];
// Se excluyen solo los ficheros GENERADOS de tokens (en shopify comparten carpeta con el resto de assets)
const GENERATED = /^(tokens\.css|typography\.css|effects\.css|tailwind-theme\.css|fonts(-google)?\.css(\.liquid)?|tokens(\.meta)?\.json)$/;
const isGenerated = (p) => path.resolve(path.dirname(p)) === path.resolve(TOK) && GENERATED.test(path.basename(p));
for (const r of roots) files.push(...await walk(r, (p) => exts.test(p) && !isGenerated(p) && !/\.stories\.|\.test\.|\.min\./.test(p)));

const PALETTE = /\b(?:[a-z0-9]+:)*(bg|text|border|from|to|via|fill|stroke|ring|outline|decoration|divide|placeholder|accent|caret|shadow)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)(-\d{2,3})?\b/g;
const ARB = /\b(?:[a-z0-9]+:)*[a-z-]+-\[([^\]\s]+)\]/g;
const COLOR = /#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?)\(/g;
const PXPROP = /(?<![-\w])(padding|margin|gap|row-gap|column-gap|font-size|line-height|letter-spacing|border-radius|width|height|max-width|min-width|top|left|right|bottom|inset)(-[a-z]+)?\s*:\s*([^;}{]+)/g;

const findings = [];
const add = (sev, file, line, msg) => findings.push({ sev, file, line, msg });
for (const f of files) {
  const txt = await fs.readFile(f, 'utf8');
  if (/token-audit-ignore-file/.test(txt)) continue;
  const lines = txt.split('\n');
  lines.forEach((ln, i) => {
    if (/token-audit-ignore/.test(ln) || /^\s*(\/\/|\*|\/\*)/.test(ln)) return;
    const n = i + 1;
    // Colores literales (excepto dentro de url(), data: e ids de svg)
    for (const m of ln.matchAll(COLOR)) {
      if (/url\(|data:|xmlns|href=|#[0-9a-f]{3,8}["']?\s*(?:\)|>)?$/i.test(ln.slice(Math.max(0, m.index - 12), m.index + 12)) && /url\(|data:|xmlns/.test(ln)) continue;
      if (/^#[0-9a-fA-F]{3,8}$/.test(m[0]) && /['"`]#[\w-]+['"`]/.test(ln) && !/color|fill|stroke|background|border/i.test(ln)) continue; // anclas tipo href="#id"
      add('error', f, n, `Color literal ${m[0]}${m[1] ? '()' : ''}: usar un token semántico`);
    }
    for (const m of ln.matchAll(ARB)) {
      const v = m[1];
      if (/^var\(--/.test(v) || /^--/.test(v)) add('info', f, n, `Arbitraria con token ${m[0]}: mejor la utilidad del tema`);
      else if (/^(\d+(\.\d+)?(px|rem|em|%|vh|vw)|#|rgb|hsl)/.test(v)) add('error', f, n, `Clase arbitraria con valor literal ${m[0]}`);
    }
    for (const m of ln.matchAll(PALETTE)) add('error', f, n, `Paleta por defecto de Tailwind ${m[0]}: usar colores semánticos del tema`);
    for (const m of ln.matchAll(/var\((--[a-z0-9-]+)/g)) {
      const info = meta.cssVars?.[m[1]];
      if (info && info.type === 'C' && info.role === 'base') add('warn', f, n, `Primitiva de color ${m[1]} usada directamente: usar el token semántico`);
      if (meta.cssVars && Object.keys(meta.cssVars).length && !info && !/^--(tw|fx|sb|storybook|grid)-/.test(m[1]) && !txt.includes(`${m[1]}:`)) add('warn', f, n, `Variable ${m[1]} no existe en los tokens`);
    }
    if ((/\.(css|scss)$/.test(f) || /style=|css`|styled/.test(ln)) && !/^\s*@media|^\s*--/.test(ln)) {
      for (const m of ln.matchAll(PXPROP)) {
        for (const px of m[3].matchAll(/(?<![\w(-])(-?\d+(?:\.\d+)?)px\b/g)) {
          const v = Number(px[1]);
          if (v === 0 || Math.abs(v) === 1 || /var\(/.test(m[3]) && m[3].indexOf(px[0]) > m[3].indexOf('var(')) continue;
          const s = suggest(px[1], m[1]);
          add('warn', f, n, `${m[1]}${m[2] || ''}: ${px[0]} literal${s.length ? ` → ¿${s.map((x) => `var(${x})`).join(' / ')}?` : ' (sin token con ese valor: avisar al usuario)'}`);
        }
      }
    }
  });
}

const sev = { error: 0, warn: 0, info: 0 };
for (const x of findings) sev[x.sev]++;
if (args.json) console.log(JSON.stringify({ summary: sev, findings }, null, 2));
else {
  const byFile = {};
  for (const x of findings) (byFile[x.file] ||= []).push(x);
  for (const [f, list] of Object.entries(byFile)) {
    console.log(`\n${f}`);
    for (const x of list.slice(0, 40)) console.log(`  ${x.sev === 'error' ? '✗' : x.sev === 'warn' ? '⚠' : '·'} L${x.line} ${x.msg}`);
    if (list.length > 40) console.log(`  … ${list.length - 40} más`);
  }
  console.log(`\nToken audit: ${files.length} ficheros · ${sev.error} errores · ${sev.warn} avisos · ${sev.info} info`);
}
process.exitCode = sev.error || (args.strict && sev.warn) ? 2 : 0;
