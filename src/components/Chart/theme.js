/**
 * Tema de gráficas = tokens de Figma leídos en tiempo de ejecución.
 * Los dos motores (ECharts y D3) pintan con estos mismos valores: un cambio de token (o de subtema
 * con data-theme) cambia las dos implementaciones a la vez. Nada de colores literales en los renderers.
 */

import { CHART_TOKENS, CHART_TYPE, CHART_STYLE, MOTION } from './chart-style';

export { MOTION };

const read = (el, name) => getComputedStyle(el).getPropertyValue(`--${name}`).trim();

/** Resuelve un nombre de token (`backgrounds-accent-base`) o deja pasar `transparent`/`none`. */
export function tokenColor(el, token, fallback = 'currentColor') {
  if (!token) return fallback;
  if (token === 'transparent' || token === 'none') return token;
  return read(el, token) || fallback;
}

const merge = (a, b) => {
  if (!b) return a;
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = v && typeof v === 'object' && !Array.isArray(v) ? merge(a[k] || {}, v) : v;
  return out;
};

/** Tema resuelto = perfil del proyecto (chart-style.js) + `spec.style` de la gráfica, con tokens leídos del DOM. */
export function resolveTheme(el, spec = {}) {
  const tokens = { ...CHART_TOKENS, ...spec.style?.tokens };
  const t = Object.fromEntries(Object.entries(tokens).map(([k, tok]) => [k, tokenColor(el, tok)]));
  return {
    ...t,
    font: read(el, CHART_TYPE.family) || 'sans-serif',
    fontSize: parseFloat(read(el, CHART_TYPE.small)) || 12,
    fontSizeLarge: parseFloat(read(el, CHART_TYPE.large)) || 14,
    style: merge(CHART_STYLE, spec.style),
    motion: { ...MOTION, ...spec.animation },
    color: (token, fb) => tokenColor(el, token, fb),
  };
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
