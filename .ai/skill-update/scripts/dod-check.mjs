#!/usr/bin/env node
/**
 * dod-check.mjs — Definition of Done como veredicto (exit 0 = PASA, 2 = NO PASA).
 * "Compila" ≠ "hecho": este script comprueba lo verificable automáticamente; la revisión visual
 * la sigue haciendo el humano (references/dod.md).
 *
 * Uso:
 *   node scripts/dod-check.mjs <ruta/Nombre.meta.json>  [--build] [--profile ...]
 *   node scripts/dod-check.mjs --all
 *
 * Comprueba:
 *   1. Contrato meta.json completo (figma.nodeId + fp, descripción, props, subtemas, comportamiento, a11y)
 *   2. Ficheros obligatorios del perfil de salida
 *   3. Una story/demo por variante declarada + Default; (react-storybook) variantes por eje (meta.axes) con su
 *      story, stories de casos de uso, MDX con <DocPage>; aviso (no bloquea) si falta usage (Do/Don't)
 *   4. Cobertura frente al digest de Figma (.ai/masters/<slug>.json) con figma-diff
 *   5. token-audit sin errores en los ficheros del elemento
 *   6. Placeholders/TODO del código anotados en meta.placeholders
 *   7. Imágenes declaradas presentes en maps/images.json y el fichero WebP en disco
 *   8. Módulos: meta.layout con tipología de la guía «Módulos por layout» (Columnas, Líquido, A sangre,
 *      Mezcla) y, si es Columnas/Mezcla, columnas por cada variante de escritorio (o en layout.noColumns)
 *      (--strict: el CSS del módulo usa grid-column / .grid-12 salvo Líquido o A sangre)
 *   9. @media en el INICIO DE RANGO de los breakpoints (tokens.meta.json → breakpoints[].min), nunca en
 *      el ancho del frame (1024, 768…) ni en anchos sueltos. Los @container no se comprueban.
 *   (los subtemas se comprueban dentro de 4: figma-diff exige meta.subthemes.default si el máster los usa)
 *  10. (--build) build del perfil sin errores
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseArgs, readJson, walk, loadConfig, slug, exists, die, profilePaths } from './lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const args = parseArgs();
const cfg = await loadConfig();
const PROFILE = args.profile || cfg.output || 'react-storybook';
const tmeta = await readJson(path.join(profilePaths(cfg).tokens, 'tokens.meta.json'), { breakpoints: [] });
const bpStarts = new Set((tmeta.breakpoints || []).filter((b) => b.min != null).map((b) => b.min));
const frameWidths = new Set((tmeta.breakpoints || []).map((b) => b.width));

async function check(metaPath) {
  const res = [];
  const ok = (cond, label, detail = '') => res.push({ ok: Boolean(cond), label, detail });
  const warn = (cond, label, detail = '') => { if (!cond) res.push({ ok: true, warn: true, label, detail }); };
  const m = await readJson(metaPath);
  const dir = path.dirname(metaPath);
  const base = path.basename(metaPath).replace(/\.meta\.json$/, '');
  const s = slug(m.name);                          // mismo slug que docs-generator
  const ds = slug(m.figma?.name || m.name);         // slug del digest (nombre del máster en Figma)

  // 1. Contrato
  const missing = ['name', 'description', 'props', 'behavior', 'a11y'].filter((k) => m[k] == null || (Array.isArray(m[k]) && !m[k].length && k !== 'props'));
  ok(!missing.length, 'Contrato meta.json completo', missing.length ? `faltan: ${missing.join(', ')}` : '');
  ok(m.figma?.nodeId && m.figma?.fp, 'Trazabilidad con Figma (figma.nodeId + figma.fp)', m.figma?.fp ? '' : 'añade figma.fp del digest con el que se construyó');

  // 2. Ficheros del perfil
  let files = [];
  if (PROFILE === 'react-storybook') {
    const comp = ['.jsx', '.tsx'].map((e) => path.join(dir, base + e));
    const stories = ['.stories.jsx', '.stories.tsx', '.stories.js', '.stories.ts'].map((e) => path.join(dir, base + e));
    const found = { comp: null, stories: null, mdx: path.join(dir, base + '.mdx') };
    for (const c of comp) if (await exists(c)) found.comp = c;
    for (const c of stories) if (await exists(c)) found.stories = c;
    ok(found.comp, 'Componente', found.comp || `${base}.jsx|tsx`);
    ok(found.stories, 'Stories', found.stories || `${base}.stories.*`);
    ok(await exists(found.mdx), 'Doc MDX (docs-generator)', path.basename(found.mdx));
    files = (await fs.readdir(dir)).map((f) => path.join(dir, f));
    // 3. Stories por variante
    if (found.stories) {
      const txt = await fs.readFile(found.stories, 'utf8');
      const exported = new Set([...txt.matchAll(/export\s+const\s+(\w+)/g)].map((x) => x[1]));
      const axisStories = (m.axes || []).flatMap((a) => [a.story, ...(a.options || []).map((o) => o?.story)]).filter(Boolean);
      const need = [...new Set([m.defaultStory || 'Default', ...(m.variants || []).map((v) => v.story), ...axisStories, ...(m.useCases || []).map((u) => u.story).filter(Boolean)])];
      const miss = need.filter((n) => !exported.has(n));
      ok(!miss.length, 'Una story por variante + Default', miss.length ? `faltan: ${miss.join(', ')}` : `${need.length} stories`);
      ok(!/globals\s*:/.test(txt), 'Sin globals por story (bloquean el toolbar de subtema)');
      // Doc tipo Wix (DocKit): variantes por eje, Do/Don't, argTypes desde el meta
      const axesN = Object.keys(m.variantAxes || {}).length;
      ok(!axesN || (m.axes || []).length, 'Variantes por eje (meta.axes: explicación + todas las opciones juntas)', axesN && !(m.axes || []).length ? `variantAxes tiene ${axesN} eje(s) y meta.axes está vacío` : `${(m.axes || []).length} eje(s)`);
      const noStory = (m.axes || []).filter((a) => !a.story && !(a.options || []).some((o) => o?.story)).map((a) => a.name);
      ok(!noStory.length, 'Cada eje tiene story (axes[].story u options[].story)', noStory.join(', '));
      const argsOk = /argTypesFromMeta/.test(txt) || !(m.props || []).length;
      ok(argsOk, 'Controls desde el meta (argTypes: argTypesFromMeta(meta))', argsOk ? '' : 'sin argTypesFromMeta, Controls muestra "unknown" y JSON');
      if (await exists(found.mdx)) ok(/<DocPage\b/.test(await fs.readFile(found.mdx, 'utf8')), 'Doc con <DocPage> (regenera con npm run docs)');
      warn(m.usage?.do?.length && m.usage?.dont?.length, 'Uso: Do / Don\'t (meta.usage)', 'recomendado: sácalo de la doc de Figma o propónlo y pide OK a diseño');
    }
  } else if (PROFILE === 'html-static') {
    const need = m.kind === 'template' ? [`pages/${s}.html`, `docs/${s}.html`] : [`components/${s}.html`, `css/components/${s}.css`, `docs/${s}.html`];
    for (const f of need) ok(await exists(f), `Fichero ${f}`);
    files = need;
    if (m.kind !== 'template' && await exists(need[0])) {
      const html = await fs.readFile(need[0], 'utf8');
      const miss = (m.variants || []).filter((v) => !html.includes(`id="${slug(v.story)}"`)).map((v) => v.story);
      ok(!miss.length, 'Una demo (id) por variante en components/<slug>.html', miss.join(', '));
    }
  } else if (PROFILE === 'shopify') {
    const isSection = m.kind === 'module';
    const f = m.kind === 'template' ? `templates/${s}.json` : isSection ? `sections/${s}.liquid` : `snippets/${s}.liquid`;
    ok(await exists(f), `Fichero ${f}`);
    files = [f, `docs/${s}.md`, `assets/section-${s}.css`];
    ok(await exists(`docs/${s}.md`), `Doc docs/${s}.md`);
    if (isSection && await exists(f)) {
      const txt = await fs.readFile(f, 'utf8');
      ok(/{%-?\s*schema\s*-?%}/.test(txt), 'Sección con {% schema %} (contenido editable)');
      if (txt.match(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema/)) {
        try { JSON.parse(RegExp.$1); ok(true, 'Schema JSON válido'); } catch (e) { ok(false, 'Schema JSON válido', e.message); }
      }
    }
  }

  // 4. Cobertura frente al digest
  const digest = m.figma?.digest || `.ai/masters/${ds}.json`; // figma.digest: override si dos másters comparten slug (accordion / Accordion)
  if (await exists(digest)) {
    const r = spawnSync(process.execPath, [path.join(HERE, 'figma-diff.mjs'), '--digest', digest, '--meta', metaPath], { encoding: 'utf8' });
    ok(r.status === 0, 'Cubre lo que tiene el máster de Figma (figma-diff)', r.status === 0 ? '' : r.stdout.trim().split('\n').slice(1, 6).join(' / '));
  } else ok(false, 'Digest del máster guardado', `${digest} no existe (snippets/digest.js)`);

  // 5. token-audit
  const auditFiles = files.filter((f) => /\.(css|jsx|tsx|js|ts|html|liquid)$/.test(f) && !/\.stories\./.test(f) && !/^docs\//.test(f));
  const existing = [];
  for (const f of auditFiles) if (await exists(f)) existing.push(f);
  if (existing.length) {
    const r = spawnSync(process.execPath, [path.join(HERE, 'token-audit.mjs'), ...existing, '--json'], { encoding: 'utf8' });
    let sum = { error: '?' }; try { sum = JSON.parse(r.stdout).summary; } catch {}
    ok(sum.error === 0, 'token-audit sin errores', `errores ${sum.error}, avisos ${sum.warn ?? '?'}`);
  }

  // 6. Placeholders anotados
  let ph = 0;
  for (const f of existing) { const t = await fs.readFile(f, 'utf8'); ph += (t.match(/\b(TODO|FIXME|placeholder|lorem ipsum)\b/gi) || []).length; }
  ok(ph === 0 || (m.placeholders?.length || 0) > 0, 'Placeholders/TODO anotados en meta.placeholders', ph ? `${ph} en código, ${(m.placeholders || []).length} anotados` : '');

  // 7. Imágenes
  if (m.images?.length) {
    const map = await readJson('maps/images.json', {});
    const miss = [];
    const imgDir = profilePaths(cfg).images;
    for (const h of m.images) { const e = map[h.hash || h]; if (!e || !(await exists(path.join(imgDir, e.file)))) miss.push(h.hash || h); }
    ok(!miss.length, 'Imágenes reales cableadas (maps/images.json)', miss.length ? `sin descargar: ${miss.slice(0, 3).join(', ')}` : `${m.images.length}`);
  }

  // 8. Layout por columnas (módulos)
  if (m.kind === 'module') {
    const L = m.layout || {};
    const TYPES = /columnas|l[ií]quido|a sangre|mezcla|columns|liquid|full[\s-]?bleed|mixed/i;
    ok(L.type && TYPES.test(L.type), 'meta.layout.type con tipología de «Módulos por layout»', L.type ? (TYPES.test(L.type) ? L.type : `"${L.type}" no es Columnas / Líquido / A sangre / Mezcla`) : 'falta meta.layout (npm run grid -- … --meta)');
    const needCols = /columnas|mezcla|columns|mixed/i.test(L.type || '');
    if (needCols) {
      const norm = (x) => slug(x || '');
      const declared = [...(L.columns || []).map((c) => norm(c.variant)), ...(L.noColumns || []).map(norm)];
      const desk = (m.variants || []).filter((v) => !/mobile|m[oó]vil|tablet/i.test(`${v.story} ${v.title}`));
      const miss = desk.filter((v) => ![norm(v.story), norm(v.title)].some((k) => k && declared.some((d) => d && (d === k || d.includes(k) || k.includes(d)))));
      ok((L.columns || []).length && !miss.length, 'meta.layout.columns para cada variante de escritorio', !(L.columns || []).length ? 'faltan las columnas por pieza' : miss.length ? `sin columnas: ${miss.map((v) => v.title || v.story).join(', ')} (o añádelas a layout.noColumns)` : `${(L.columns || []).length} piezas`);
      if (args.strict) {
        let uses = false;
        for (const f of files) if (/\.(css|jsx|tsx|html|liquid)$/.test(f) && await exists(f)) { const t = await fs.readFile(f, 'utf8'); if (/grid-column|grid-12|col-(start|end|span)-/.test(t)) uses = true; }
        ok(uses, 'CSS del módulo colocado por columnas (grid-column / .grid-12)', uses ? '' : 'ni grid-column ni .grid-12: ¿anchos sueltos + space-between?');
      }
    }
  }

  // 9. @media en el inicio de rango
  if (bpStarts.size) {
    const bad = [];
    for (const f of files) {
      if (!/\.(css|scss|jsx|tsx|html|liquid)$/.test(f) || !(await exists(f))) continue;
      const t = await fs.readFile(f, 'utf8');
      for (const mm of t.matchAll(/@media[^{]*?\((min|max)-width:\s*(\d+(?:\.\d+)?)px\)/g)) {
        const n = Math.round(Number(mm[2])), okN = mm[1] === 'min' ? bpStarts.has(n) : bpStarts.has(Math.floor(Number(mm[2])) + 1); // max-width 959.98px = fin del rango anterior a 960
        if (!okN) bad.push(`${path.basename(f)}: ${mm[1]}-width ${mm[2]}px${frameWidths.has(n) ? ' (ancho de frame)' : ''}`);
      }
    }
    ok(!bad.length, '@media en el inicio de rango de los breakpoints', bad.length ? `${bad.slice(0, 4).join(' · ')} → usa ${[...bpStarts].filter(Boolean).join('/')}px` : '');
  }
  return { name: m.name, res };
}

const metas = args.all ? await walk('.', (p) => p.endsWith('.meta.json') && !p.endsWith('tokens.meta.json')) : args._;
if (!metas.length) die('Uso: dod-check.mjs <Nombre.meta.json> | --all [--build]');
let fail = 0;
for (const mp of metas) {
  const { name, res } = await check(mp);
  const bad = res.filter((r) => !r.ok);
  console.log(`\n${bad.length ? '✗ NO PASA' : '✓ PASA'} — ${name} (${mp})`);
  for (const r of res) console.log(`  ${r.warn ? '⚠' : r.ok ? '✓' : '✗'} ${r.label}${r.detail ? ` — ${r.detail}` : ''}`);
  if (bad.length) fail++;
}
if (args.build) {
  const cmd = { 'react-storybook': ['npm', ['run', 'build-storybook', '--', '--quiet']], 'html-static': ['npx', ['--yes', 'html-validate', 'components/**/*.html', 'pages/**/*.html']], shopify: ['shopify', ['theme', 'check']] }[PROFILE];
  console.log(`\n▶ ${cmd[0]} ${cmd[1].join(' ')}`);
  const r = spawnSync(cmd[0], cmd[1], { stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) { console.log('✗ Build con errores'); fail++; } else console.log('✓ Build OK');
}
console.log(`\n${fail ? `✗ ${fail} elemento(s) no cumplen la DoD` : '✓ DoD automática OK — falta la revisión visual humana en Pages'}`);
process.exitCode = fail ? 2 : 0;
