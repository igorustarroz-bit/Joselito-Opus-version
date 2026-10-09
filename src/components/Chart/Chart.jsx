import { useEffect, useRef, useState } from 'react';
import { pickRenderer, RENDERERS } from './registry';
import { resolveTheme, prefersReducedMotion } from './theme';
import { formatter } from './shared';
import { CHART_STYLE } from './chart-style';
import './Chart.css';

export const RENDERER_NAMES = Object.keys(RENDERERS);
export const LEGEND_MARKERS = ['square', 'oval', 'line', 'line-dashed', 'line-dot', 'line-dot-empty'];

/** Icono de leyenda (variantes de z-fragment-graphthings-icon-type-of-legend). */
function LegendMarker({ marker = 'square', color }) {
  const c = `var(--${color})`;
  return (
    <svg className="hz-chart__marker" width="16" height="8" viewBox="0 0 16 8" aria-hidden="true">
      {marker.startsWith('line') && (
        <line x1="0" x2="16" y1="4" y2="4" stroke={c} strokeWidth="1.5" strokeDasharray={marker === 'line-dashed' ? '3 2' : undefined} />
      )}
      {marker === 'square' && <rect x="4" y="0" width="8" height="8" fill={c} />}
      {marker === 'oval' && <circle cx="8" cy="4" r="4" fill={c} />}
      {marker === 'line-dot' && <circle cx="8" cy="4" r="3.25" fill={c} />}
      {marker === 'line-dot-empty' && <circle cx="8" cy="4" r="2.75" fill="var(--backgrounds-base)" stroke={c} strokeWidth="1.5" />}
    </svg>
  );
}

/**
 * Gráfica Hanzo. Marco (título, leyenda, unidad, pie) en HTML con tokens; el área de datos la pinta
 * el motor elegido a partir del mismo `spec`. Se construye con animación al entrar en pantalla y
 * responde al ratón (tooltip + resaltado). Con `prefers-reduced-motion` se pinta sin animación.
 */
export default function Chart({ spec, renderer, animateOnView = true, theme, className = '' }) {
  const rootRef = useRef(null);
  const plotRef = useRef(null);
  const [inView, setInView] = useState(!animateOnView);
  const [active, setActive] = useState(null);
  const { name: engine, fallback } = pickRenderer(renderer, spec.type);

  // 1 · Esperar a que la gráfica entre en pantalla (la animación de construcción se ve siempre).
  useEffect(() => {
    if (!animateOnView || inView) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, [animateOnView, inView]);

  // 2 · Montar el motor (import dinámico) y reconstruir si cambia el spec o el motor.
  useEffect(() => {
    if (!inView) return undefined;
    let inst; let cancelled = false; let ro;
    RENDERERS[engine].load().then((mod) => {
      if (cancelled) return;
      const el = plotRef.current;
      el.innerHTML = '';
      inst = mod.mount(el, { spec, theme: resolveTheme(el, spec), animate: !prefersReducedMotion(), fmt: formatter(spec) });
      setActive(engine);
      let first = true;
      ro = new ResizeObserver(() => { if (first) { first = false; return; } inst?.resize(); });
      ro.observe(el);
    });
    return () => { cancelled = true; ro?.disconnect(); inst?.destroy(); };
  }, [inView, engine, spec]);

  const legend = spec.legend ?? [...(spec.series || []), ...(spec.lines || [])].filter((s) => s.legend !== false)
    .map((s) => ({ label: s.name, color: s.color, marker: s.marker || 'square' }));
  const noAxes = spec.type === 'radar';

  return (
    <figure ref={rootRef} className={`hz-chart hz-chart--${spec.type} ${className}`} data-theme={theme}
      style={{ '--hz-chart-aspect': spec.style?.aspect ?? CHART_STYLE.aspect, '--hz-chart-plot-left': `${(spec.style?.plot?.left ?? CHART_STYLE.plot.left)}px` }}
      data-renderer={active || engine} data-fallback={fallback || undefined}>
      <header className="hz-chart__head">
        <p className="hz-chart__title ts-body-01">{spec.title}</p>
        {legend.length > 0 && (
          <ul className="hz-chart__legend" aria-label="Leyenda">
            {legend.map((l) => (
              <li key={l.label} className="ts-body-01"><LegendMarker marker={l.marker} color={l.color} />{l.label}</li>
            ))}
          </ul>
        )}
      </header>
      <div className={`hz-chart__body${noAxes ? ' hz-chart__body--free' : ''}`}>
        {spec.axis?.y?.label && <span className="hz-chart__unit ts-body-01">{spec.axis.y.label}</span>}
        <div ref={plotRef} className="hz-chart__plot" role="img" aria-label={spec.description || spec.title} />
      </div>
      {spec.caption && <figcaption className="hz-chart__caption ts-body-01">{spec.caption}</figcaption>}
    </figure>
  );
}
