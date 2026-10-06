#!/usr/bin/env node
/**
 * fetch-variables.mjs — SOLO plan Enterprise (la API REST de variables no existe en Pro/Org).
 * Descarga las variables locales por REST y escribe .ai/figma/variables.json en el formato de
 * tokens-from-figma.mjs, sin que Claude tenga que transcribir nada.
 * Los estilos de texto/efecto no vienen en esta API: se conservan los que ya hubiera en el fichero
 * (obtenerlos con snippets/variables.js usando ONLY = [] e INCLUDE_STYLES = true).
 *
 * Requisitos: figma-token.txt (o FIGMA_TOKEN) con scope "file_variables:read".
 * Uso: node scripts/fetch-variables.mjs [--file <fileKey>] [--out .ai/figma/variables.json]
 */

import fs from 'node:fs/promises';
import { parseArgs, readJson, writeJson, loadConfig, die } from './lib.mjs';

const args = parseArgs();
const cfg = await loadConfig();
const key = args.file || cfg.figma?.files?.[0]?.key || die('Falta --file <fileKey>');
const OUT = args.out || '.ai/figma/variables.json';
let token = process.env.FIGMA_TOKEN;
if (!token) try { token = (await fs.readFile('figma-token.txt', 'utf8')).trim(); } catch { die('No hay figma-token.txt ni FIGMA_TOKEN'); }

const res = await fetch(`https://api.figma.com/v1/files/${key}/variables/local`, { headers: { 'X-Figma-Token': token } });
if (res.status === 403) die('403: la API de variables requiere plan Enterprise y scope file_variables:read. En Pro/Org usa snippets/variables.js.');
if (!res.ok) die(`REST ${res.status} ${res.statusText}`);
const { meta } = await res.json();
const V = meta.variables, C = meta.variableCollections;
const hex = (c) => { const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0'); return '#' + h(c.r) + h(c.g) + h(c.b) + (c.a !== undefined && c.a < 1 ? h(c.a) : ''); };
const val = (v) => {
  if (v && typeof v === 'object' && v.type === 'VARIABLE_ALIAS') { const t = V[v.id]; return t ? `{${C[t.variableCollectionId]?.name || 'lib'}::${t.name}}` : `{?::${v.id}}`; }
  if (v && typeof v === 'object' && 'r' in v) return hex(v);
  return v;
};
const collections = Object.values(C).filter((c) => !c.remote).map((c) => ({
  name: c.name, modes: c.modes.map((m) => m.name),
  vars: c.variableIds.map((id) => V[id]).filter(Boolean).map((v) => {
    const vals = c.modes.map((m) => val(v.valuesByMode[m.modeId]));
    const same = new Set(vals.map((x) => JSON.stringify(x))).size === 1;
    return [v.name, v.resolvedType[0], same ? vals[0] : vals];
  }),
}));
const prev = await readJson(OUT, {});
await writeJson(OUT, { fileKey: key, readAt: new Date().toISOString(), source: 'rest', collections, textStyles: prev.textStyles || [], effectStyles: prev.effectStyles || [], gridStyles: prev.gridStyles || [] });
console.log(`✓ ${collections.length} colecciones, ${collections.reduce((a, c) => a + c.vars.length, 0)} variables → ${OUT}${prev.textStyles ? '' : '  (faltan estilos de texto: snippets/variables.js con ONLY = [])'}`);
