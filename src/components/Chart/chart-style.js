/**
 * PERFIL VISUAL DE LAS GRÁFICAS DEL PROYECTO — el único fichero que cambia entre proyectos.
 *
 * El diseño de las gráficas lo decide el Figma de cada proyecto. Aquí se traduce ese diseño:
 * qué token hace cada papel, medidas del área de trazado, grosores, puntos, tipografía y animación.
 * Los renderers (D3 y ECharts) no tienen valores visuales propios: leen todo de aquí.
 * JOSELITO: el Figma usa el componente «Graph» de la plantilla Hanzo (01 - V bars white, 540 × 360) en M39;
 * medidas iguales a la plantilla y papeles mapeados a los tokens de Joselito (no tiene la colección graph/*).
 * Una gráfica concreta puede sobrescribir cualquier valor con `spec.style`.
 */

/** Papel visual → token del proyecto (nombre de la variable CSS sin `--`). */
export const CHART_TOKENS = {
  text: 'texts-base',                // títulos, etiquetas destacadas (Figma: text/high)
  textMuted: 'texts-neutral-1',      // ejes, leyenda, pie
  grid: 'backgrounds-neutral-2',     // rejilla (Figma: background/quaternary → Backgrounds/Neutral-2)
  axis: 'strokes-icons-neutral-2',   // línea base y borde del área
  surface: 'backgrounds-base',       // fondo (tooltip)
  accent: 'backgrounds-accent-base', // hover por defecto
  ink: 'strokes-icons-base',         // puntos y guías (Figma: graph/fnd-color-graph-two, negro)
  halo: 'backgrounds-base',          // halo de puntos y etiquetas (Figma: graph/fnd-color-graph-seven, blanco)
};

/** Tipografía: tokens de tamaño (sin `--`). `small` = ejes/leyenda, `large` = etiquetas de radar. */
export const CHART_TYPE = {
  family: 'tipography-font-family-body',
  small: 'typography-body-1-sz',
  large: 'typography-body-2-sz',
};

/** Medidas y trazos (px). Medirlas en el componente base de gráficas del Figma del proyecto. */
export const CHART_STYLE = {
  aspect: 540 / 360,                                 // proporción del componente (Chart.css la usa vía --hz-chart-aspect)
  plot: { top: 12, right: 0, bottom: 24, left: 32 }, // márgenes del área de trazado
  axisLabelGap: 8,                                   // separación etiqueta ↔ eje
  grid: { x: false, y: true, border: false },        // rejilla por defecto (cada tipo puede activar x/border)
  line: { width: 1.5, smoothWidth: 1 },              // líneas de series / medias móviles
  point: { radius: 2.5, barDot: 3.5, lineDot: 3.5, haloWidth: 1.5 },
  bar: { stroke: 1, gap: 0 },                        // borde y hueco entre barras (0 = juntas)
  candle: { width: 10, wick: 1.3 },
  radar: { labelGap: 44, stroke: 2, ringLabelHalo: 3 },
};

/** Animación de construcción (al entrar en pantalla) y hover. */
export const MOTION = { duration: 900, stagger: 70, easing: 'cubicOut', hoverDim: 0.25 };
