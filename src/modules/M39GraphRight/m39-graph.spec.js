/**
 * ChartSpec de la gráfica de M39-Graph Right (instancia «Graph» · 01 - V bars white del Figma).
 * ⚠ DATOS PROVISIONALES: en Figma la gráfica está dibujada (SVG aplanado); los valores se han leído de la
 * captura de escritorio contra la rejilla (0–50). Los reales llegan del cliente (ver meta.placeholders).
 */
export const m39Spec = {
  type: 'bar',
  title: 'V bars white',
  caption: 'GDP per capita ($ adjusted for price differences, PPP 2011)',
  description: 'Barras verticales: de 18,5 a 50 millones para un PIB per cápita de 0 a 60.',
  locale: 'es-ES',
  format: { unit: 'M', decimals: 1 },
  axis: {
    x: { type: 'category', data: ['0', '10', '20', '30', '40', '50', '60'] },
    y: { label: 'Millions', min: 0, max: 50, interval: 10 },
  },
  series: [{
    name: 'Water', data: [18.5, 18.5, 18.5, 25.7, 32.8, 41.4, 50], provisional: true,
    color: 'backgrounds-base', stroke: 'strokes-icons-base',
    hoverColor: 'backgrounds-accent-base', marker: 'square', dots: true,
  }],
  figma: { node: '68927:7769', name: 'Graph · Name=01 - V bars white' },
};
