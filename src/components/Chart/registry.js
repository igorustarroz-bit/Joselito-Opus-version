/**
 * Motores disponibles. Cada uno se carga bajo demanda (import dinámico): una página con D3 no
 * descarga ECharts y al revés.
 *
 * Contrato de un renderer:
 *   mount(el: HTMLElement, ctx: { spec, theme, animate: boolean, fmt }) → { resize(): void, destroy(): void }
 *
 * `supports` es la tabla de paridad: si un motor aún no tiene un tipo, <Chart> usa el otro y lo avisa.
 */
export const RENDERERS = {
  echarts: {
    label: 'ECharts',
    supports: ['bar', 'area-stacked', 'radar', 'candlestick'],
    load: () => import('./renderers/echarts/index.js'),
  },
  d3: {
    label: 'D3',
    supports: ['bar', 'area-stacked', 'radar', 'candlestick'],
    load: () => import('./renderers/d3/index.js'),
  },
};

/** Motor por defecto del proyecto (en un proyecto real: hanzo.config.json → charts.renderer). */
export const DEFAULT_RENDERER = 'd3';

export function pickRenderer(requested, type) {
  const name = requested || DEFAULT_RENDERER;
  const r = RENDERERS[name];
  if (r?.supports.includes(type)) return { name, fallback: false };
  const alt = Object.keys(RENDERERS).find((k) => RENDERERS[k].supports.includes(type));
  if (!alt) throw new Error(`[Chart] Ningún motor soporta el tipo «${type}»`);
  console.warn(`[Chart] «${type}» aún no existe en ${name}; se usa ${alt}.`);
  return { name: alt, fallback: true };
}
