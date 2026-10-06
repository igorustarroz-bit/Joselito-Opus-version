#!/usr/bin/env node
/**
 * docs-generator.mjs — Genera la documentación de un elemento a partir de su contrato <Nombre>.meta.json
 * (formato en references/docs.md). Claude rellena el meta.json con lo leído de Figma (digest +
 * página de documentación del módulo) y este script emite la doc con la estructura fija de Hanzo.
 *
 * Secciones: Intro · Demo · Anatomía · Subtemas · Comportamiento · Variantes y tamaños · Tokens ·
 *            Propiedades · Guía de contenido · Accesibilidad · Componentes relacionados
 *
 * Uso:
 *   node scripts/docs-generator.mjs <ruta/Nombre.meta.json> [--profile react-storybook|html-static|shopify] [--lang es|en]
 *   node scripts/docs-generator.mjs --all            (todos los *.meta.json del proyecto)
 *
 * Salida según perfil:
 *   react-storybook → <carpeta>/<Nombre>.mdx  (Storybook 10, addon-docs, remark-gfm para tablas)
 *   html-static     → docs/<slug>.html        (página de catálogo que incrusta components/<slug>.html)
 *   shopify         → docs/<slug>.md
 */

import path from 'node:path';
import { parseArgs, readJson, writeFile, walk, loadConfig, slug, die } from './lib.mjs';

const args = parseArgs();
const cfg = await loadConfig();
const PROFILE = args.profile || cfg.output || 'react-storybook';
const LANG = args.lang || cfg.docsLang || 'es';
const T = {
  es: { intro: 'Introducción', demo: 'Demo', anatomy: 'Anatomía', themes: 'Subtemas', behavior: 'Comportamiento', variants: 'Variantes y tamaños',
    tokens: 'Tokens', props: 'Propiedades', content: 'Guía de contenido', a11y: 'Accesibilidad', related: 'Componentes relacionados',
    name: 'Nombre', desc: 'Descripción', def: 'Por defecto', control: 'Control', field: 'Campo', max: 'Límite', notes: 'Notas', usage: 'Uso',
    defaultTheme: 'Subtema por defecto', supported: 'Subtemas soportados', placeholders: 'Pendientes / placeholders', figma: 'Figma', none: '—' },
  en: { intro: 'Introduction', demo: 'Demo', anatomy: 'Anatomy', themes: 'Subthemes', behavior: 'Behavior', variants: 'Variants and sizes',
    tokens: 'Tokens', props: 'Properties', content: 'Content guidelines', a11y: 'Accessibility', related: 'Related components',
    name: 'Name', desc: 'Description', def: 'Default', control: 'Control', field: 'Field', max: 'Limit', notes: 'Notes', usage: 'Usage',
    defaultTheme: 'Default subtheme', supported: 'Supported subthemes', placeholders: 'Pending / placeholders', figma: 'Figma', none: '—' },
}[LANG];

const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const table = (head, rows) => rows.length ? [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(esc).join(' | ')} |`)].join('\n') : `_${T.none}_`;
const list = (xs) => (xs?.length ? xs.map((x) => `- ${typeof x === 'string' ? x : `**${x.name}** — ${x.description || ''}`}`).join('\n') : `_${T.none}_`);

function sections(m, demo, variantBlock) {
  const tk = m.tokens || {};
  const tokenRows = Object.entries(tk).flatMap(([k, v]) => (Array.isArray(v) ? v : [v]).map((x) => [k, typeof x === 'string' ? `\`${x}\`` : `\`${x.token}\``, typeof x === 'string' ? '' : x.usage || '']));
  return [
    `## ${T.intro}`, m.description || '', m.figma?.nodeId ? `\n${T.figma}: \`${m.figma.name || m.name}\` (\`${m.figma.nodeId}\`)` : '',
    `## ${T.demo}`, demo,
    `## ${T.anatomy}`, list(m.anatomy),
    `## ${T.themes}`, m.subthemes ? `${T.defaultTheme}: \`${m.subthemes.default ?? 'inherit'}\`\n\n${T.supported}: ${(m.subthemes.supported || []).map((s) => `\`${s}\``).join(', ') || T.none}\n\n${m.subthemes.notes || ''}` : `_${T.none}_`,
    `## ${T.behavior}`, Array.isArray(m.behavior) ? list(m.behavior) : (m.behavior || `_${T.none}_`),
    `## ${T.variants}`, variantBlock,
    `## ${T.tokens}`, table([T.name, 'Token', T.usage], tokenRows),
    `## ${T.props}`, table([T.name, T.desc, T.def, T.control], (m.props || []).map((p) => [p.name, p.description, p.default ?? '', p.control || p.type || ''])),
    ...(m.content?.length ? [`## ${T.content}`, table([T.field, T.max, T.notes], m.content.map((c) => [c.field, c.maxChars ? `${c.maxChars}` : '', c.notes || '']))] : []),
    `## ${T.a11y}`, Array.isArray(m.a11y) ? list(m.a11y) : (m.a11y || `_${T.none}_`),
    `## ${T.related}`, list(m.related),
    ...(m.placeholders?.length ? [`## ${T.placeholders}`, list(m.placeholders.map((p) => `${p.what}: ${p.why}`))] : []),
  ].join('\n\n');
}

async function genOne(file) {
  const m = await readJson(file);
  if (!m.name) { console.warn(`⚠ ${file}: falta "name", se omite`); return null; }
  const dir = path.dirname(file);
  const variants = m.variants || [];
  if (PROFILE === 'react-storybook') {
    const storiesImport = `./${path.basename(file).replace(/\.meta\.json$/, '')}.stories`;
    const demo = `<Canvas of={Stories.${m.defaultStory || 'Default'}} />\n\n<Controls of={Stories.${m.defaultStory || 'Default'}} />`;
    const vb = variants.length
      ? `<div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>\n${variants.map((v) => `  <div style={{ flex: '1 1 320px', minWidth: 0 }}>\n\n### ${v.title || v.story}\n\n<Canvas of={Stories.${v.story}} />\n\n  </div>`).join('\n')}\n</div>`
      : `_${T.none}_`;
    const mdx = [
      '{/* Generado por scripts/docs-generator.mjs desde ' + path.basename(file) + '. Editar el meta.json y regenerar. */}',
      "import { Meta, Canvas, Controls } from '@storybook/addon-docs/blocks';",
      `import * as Stories from '${storiesImport}';`, '',
      `<Meta of={Stories} name="Doc" />`, '', `# ${m.title || m.name}`, '', sections(m, demo, vb), '',
    ].join('\n');
    const out = path.join(dir, `${path.basename(file).replace(/\.meta\.json$/, '')}.mdx`);
    await writeFile(out, mdx);
    return out;
  }
  const s = slug(m.name);
  if (PROFILE === 'html-static') {
    const dirOf = m.kind === 'template' ? 'pages' : 'components';
    const demo = `<iframe class="docs-frame" src="../${dirOf}/${s}.html" title="${m.name}" loading="lazy"></iframe>`;
    const vb = variants.length ? variants.map((v) => `### ${v.title || v.story}\n\n<iframe class="docs-frame docs-frame--variant" src="../${dirOf}/${s}.html#${slug(v.story)}" title="${v.title || v.story}" loading="lazy"></iframe>`).join('\n\n') : `_${T.none}_`;
    const md = sections(m, demo, vb);
    const html = mdToHtml(md);
    const out = path.join('docs', `${s}.html`);
    await writeFile(out, `<!doctype html>\n<html lang="${LANG}">\n<head>\n<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${m.name} — Docs</title>\n<link rel="stylesheet" href="../css/main.css"><link rel="stylesheet" href="../css/docs.css">\n</head>\n<body class="docs">\n<a href="index.html">← Index</a>\n<h1>${m.title || m.name}</h1>\n${html}\n</body>\n</html>\n`);
    return out;
  }
  const out = path.join('docs', `${s}.md`);
  await writeFile(out, `# ${m.title || m.name}\n\n${sections(m, `Sección/snippet: \`${m.codePath || s}\``, variants.map((v) => `- ${v.title || v.story}`).join('\n') || `_${T.none}_`)}\n`);
  return out;
}

// Conversión mínima Markdown → HTML (títulos, tablas, listas, párrafos, código en línea, HTML crudo)
function mdToHtml(md) {
  const inline = (s) => s.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/_([^_]+)_/g, '<em>$1</em>');
  const out = [];
  for (const block of md.split(/\n{2,}/)) {
    const b = block.trim(); if (!b) continue;
    if (/^</.test(b)) out.push(b);
    else if (/^#{2,3} /.test(b)) { const l = b.match(/^#+/)[0].length; out.push(`<h${l}>${inline(b.slice(l + 1))}</h${l}>`); }
    else if (/^\|/.test(b)) {
      const rows = b.split('\n').filter((r) => !/^\|\s*-/.test(r)).map((r) => r.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((c) => inline(c.trim().replace(/\\\|/g, '|'))));
      out.push(`<table><thead><tr>${rows[0].map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
    } else if (/^- /.test(b)) out.push(`<ul>${b.split('\n').map((l) => `<li>${inline(l.replace(/^- /, ''))}</li>`).join('')}</ul>`);
    else out.push(`<p>${inline(b).replace(/\n/g, '<br>')}</p>`);
  }
  return out.join('\n');
}

const files = args.all ? await walk('.', (p) => p.endsWith('.meta.json') && !p.endsWith('tokens.meta.json')) : args._;
if (!files.length) die('Uso: docs-generator.mjs <Nombre.meta.json> | --all');
for (const f of files) { const o = await genOne(f); if (o) console.log(`✓ ${o}`); }
