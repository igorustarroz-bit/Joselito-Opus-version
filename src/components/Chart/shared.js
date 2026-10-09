/**
 * Piezas comunes a los dos motores: formato de números y el HTML del
 * tooltip. Así ECharts y D3 se ven y se leen igual; lo único que cambia es quién dibuja.
 */


export function formatter(spec) {
  const nf = new Intl.NumberFormat(spec.locale || 'es-ES', { maximumFractionDigits: spec.format?.decimals ?? 1 });
  const unit = spec.format?.unit ? ` ${spec.format.unit}` : '';
  return (v) => (v == null || Number.isNaN(v) ? '—' : `${nf.format(v)}${unit}`);
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/**
 * HTML del tooltip (el mismo en los dos motores; estilos en Chart.css → .hz-chart-tooltip).
 * @param {{title: string, rows: {label: string, value: string, color?: string}[]}} m
 */
export function tooltipHTML({ title, rows }) {
  const li = rows.map((r) => `<li><i style="background:${r.color || 'currentColor'}"></i><span>${esc(r.label)}</span><b>${esc(r.value)}</b></li>`).join('');
  return `<div class="hz-chart-tooltip__inner"><p class="hz-chart-tooltip__title">${esc(title)}</p><ul>${li}</ul></div>`;
}

/** Filas de tooltip de una vela. */
export const candleRows = (d, fmt) => [
  ['Apertura', d.open], ['Cierre', d.close], ['Mínimo', d.low], ['Máximo', d.high],
].map(([label, v]) => ({ label, value: fmt(v) }));

/** Interpola huecos (null) linealmente — Figma deja meses sin punto en las medias móviles. */
export function fillGaps(arr) {
  const out = [...arr];
  for (let i = 0; i < out.length; i++) {
    if (out[i] != null) continue;
    let a = i - 1; while (a >= 0 && out[a] == null) a--;
    let b = i + 1; while (b < out.length && arr[b] == null) b++;
    if (a >= 0 && b < out.length) out[i] = +(out[a] + ((out[b] - out[a]) * (i - a)) / (b - a)).toFixed(1);
  }
  return out;
}
