#!/usr/bin/env node
/**
 * chart-geometry.mjs — Recupera los datos de una gráfica DIBUJADA en Figma a partir de su geometría.
 *
 * En Figma las gráficas no tienen datos: get_design_context devuelve el área de datos como un SVG
 * aplanado. Pero get_metadata del símbolo/frame de datos (p. ej. «z-fragment-graphthings-Examples-*»)
 * da x/y/ancho/alto de cada rectángulo, línea y elipse, y con la escala del eje se recuperan los valores:
 *
 *   valor = min + (alto - y) / alto * (max - min)
 *
 * Guarda la respuesta XML de get_metadata en .ai/charts/<slug>.metadata.xml y ejecuta:
 *
 *   node chart-geometry.mjs .ai/charts/<slug>.metadata.xml --min 0 --max 50 [--categories 12]
 *        [--height <px>] [--width <px>] [--x-min 0 --x-max 50] [--out .ai/charts/<slug>.geometry.json]
 *
 * - --height/--width: tamaño del área de trazado (por defecto, el del nodo raíz del XML).
 * - --categories N: asigna cada elemento a la categoría (columna) en la que cae su centro.
 * - --x-min/--x-max: eje X numérico (áreas, dispersión) → valor X de cada elemento.
 *
 * Salida: un elemento por figura con `top`/`bottom`/`center` en unidades del eje, ordenado por x.
 * Los vectores (paths de áreas, radares) solo traen su caja: esos valores se ESTIMAN de la captura.
 * Todo dato así obtenido es RELLENO PROVISIONAL: los datos reales llegan del cliente (JSON/CSV).
 */
import fs from 'node:fs';

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith('--'));
const opt = (k, d) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : d; };
if (!file) { console.error('Uso: node chart-geometry.mjs <metadata.xml> --min 0 --max 50 [--categories N]'); process.exit(1); }

const xml = fs.readFileSync(file, 'utf8');
const nodes = [...xml.matchAll(/<([a-z-]+)\s+([^>]*?)\/?>/g)].map(([, tag, attrs]) => {
  const a = Object.fromEntries([...attrs.matchAll(/([a-z-]+)="([^"]*)"/g)].map(([, k, v]) => [k, v]));
  return { tag, id: a.id, name: a.name, x: +a.x, y: +a.y, w: +a.width, h: +a.height, hidden: a.hidden === 'true' };
}).filter((n) => n.id && !Number.isNaN(n.x));

const root = nodes[0];
const H = +opt('height', root.h); const W = +opt('width', root.w);
const min = +opt('min', 0); const max = +opt('max', 100);
const cats = opt('categories') ? +opt('categories') : null;
const xMin = opt('x-min'); const xMax = opt('x-max');
const val = (py) => +(min + ((H - py) / H) * (max - min)).toFixed(2);
const xval = (px) => (xMin != null ? +(+xMin + (px / W) * (+xMax - +xMin)).toFixed(2) : undefined);

// Solo hijos directos del área de datos con geometría propia (no el raíz ni frames contenedores vacíos)
const SHAPES = new Set(['rectangle', 'rounded-rectangle', 'ellipse', 'line', 'vector', 'instance', 'frame', 'star', 'polygon']);
const items = nodes.slice(1).filter((n) => SHAPES.has(n.tag) && !n.hidden).map((n) => {
  const cx = n.x + n.w / 2; const cy = n.y + n.h / 2;
  return {
    id: n.id, tag: n.tag, name: n.name,
    category: cats ? Math.min(cats - 1, Math.max(0, Math.floor(cx / (W / cats)))) : undefined,
    x: xval(cx),
    top: val(n.y), bottom: val(n.y + n.h), center: val(cy),
    px: { x: +n.x.toFixed(1), y: +n.y.toFixed(1), w: +n.w.toFixed(1), h: +n.h.toFixed(1) },
    estimate: n.tag === 'vector' && n.w > 3 && n.h > 3 ? 'path: solo caja, estimar con la captura' : undefined,
  };
}).sort((a, b) => a.px.x - b.px.x || a.px.y - b.px.y);

const out = { source: file, plot: { width: W, height: H, min, max, categories: cats }, provisional: true, items };
const dest = opt('out');
if (dest) { fs.writeFileSync(dest, JSON.stringify(out, null, 2)); console.log(`✓ ${items.length} elementos → ${dest}`); }
else console.log(JSON.stringify(out, null, 2));
