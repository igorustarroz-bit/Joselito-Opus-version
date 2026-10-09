/**
 * Motor D3. Traduce un ChartSpec a SVG con d3-scale/d3-shape/d3-transition.
 * Mismo contrato, mismos tokens, mismo tooltip y mismas reglas de animación/hover que ECharts.
 * SVG con clases: los estilos de hover se pueden ajustar con CSS (Chart.css).
 */
import {
  select, pointer, scaleBand, scaleLinear, area, line, curveCatmullRom, curveLinear, lineRadial, curveLinearClosed, easeCubicOut,
} from 'd3';
import { tooltipHTML, fillGaps } from '../../shared';

const NS = 'hz-d3';

/* ── Tooltip: el mismo HTML que ECharts, posicionado dentro del área de la gráfica ── */
function createTooltip(el) {
  const tip = select(el).append('div').attr('class', 'hz-chart-tooltip').attr('role', 'status');
  return {
    show(html, [mx, my]) {
      tip.html(html).classed('is-visible', true);
      const node = tip.node(); const W = el.clientWidth; const H = el.clientHeight;
      const tw = node.offsetWidth; const th = node.offsetHeight;
      let x = mx + 14; let y = my - th - 10;
      if (x + tw > W) x = mx - tw - 14;
      if (y < 0) y = Math.min(my + 14, H - th);
      tip.style('left', `${Math.max(0, x)}px`).style('top', `${Math.max(0, y)}px`);
    },
    hide() { tip.classed('is-visible', false); },
    remove() { tip.remove(); },
  };
}

function frame(el) {
  const w = el.clientWidth; const h = el.clientHeight;
  const svg = select(el).append('svg').attr('class', NS).attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);
  return { svg, w, h };
}

const t = (sel, animate, duration, delay = 0) => (animate ? sel.transition().duration(duration).delay(delay).ease(easeCubicOut) : sel);

/* ── Ejes cartesianos con el aspecto del componente base de Figma ── */
function cartesian(svg, w, h, spec, theme, { xScale, xSplit = theme.style.grid.x, border = theme.style.grid.border }) {
  const m = theme.style.plot; const gapL = theme.style.axisLabelGap; const { y } = spec.axis;
  const yScale = scaleLinear().domain([y.min, y.max]).range([h - m.bottom, m.top]);
  const ticks = []; for (let v = y.min; v <= y.max + 1e-9; v += y.interval) ticks.push(v);
  const g = svg.append('g').attr('class', 'axes').attr('font-family', theme.font).attr('font-size', theme.fontSize);
  g.selectAll('line.grid-y').data(ticks).join('line').attr('class', 'grid-y')
    .attr('x1', m.left).attr('x2', w - m.right).attr('y1', (d) => yScale(d) + 0.5).attr('y2', (d) => yScale(d) + 0.5)
    .attr('stroke', (d) => (d === y.min ? theme.axis : theme.grid));
  g.selectAll('text.tick-y').data(ticks).join('text').attr('class', 'tick-y')
    .attr('x', m.left - gapL).attr('y', (d) => yScale(d)).attr('dy', '0.32em').attr('text-anchor', 'end')
    .attr('fill', theme.textMuted).text((d) => d);
  const xt = xScale.bandwidth ? xScale.domain().map((d) => ({ v: d, x: xScale(d) + xScale.bandwidth() / 2 }))
    : spec.axis.x.data.filter((d) => (d - spec.axis.x.min) % spec.axis.x.interval === 0).map((d) => ({ v: d, x: xScale(d) }));
  g.selectAll('text.tick-x').data(xt).join('text').attr('class', 'tick-x')
    .attr('x', (d) => d.x).attr('y', h - m.bottom + gapL).attr('dy', '0.71em')
    .attr('text-anchor', (d, i) => (!xScale.bandwidth && i === xt.length - 1 && d.x >= w - m.right - 1 ? 'end' : 'middle'))
    .attr('fill', theme.textMuted).text((d) => d.v);
  if (xSplit && xScale.bandwidth) {
    const edges = xScale.domain().slice(1).map((d) => xScale(d));
    g.selectAll('line.grid-x').data(edges).join('line').attr('class', 'grid-x')
      .attr('x1', (d) => Math.round(d) + 0.5).attr('x2', (d) => Math.round(d) + 0.5).attr('y1', m.top).attr('y2', h - m.bottom).attr('stroke', theme.grid);
  }
  if (border) {
    g.append('rect').attr('x', m.left + 0.5).attr('y', m.top + 0.5).attr('width', w - m.left - m.right - 1).attr('height', h - m.top - m.bottom)
      .attr('fill', 'none').attr('stroke', theme.axis);
  }
  return yScale;
}

/* ─────────────── bar ─────────────── */
function bar(el, { spec, theme, animate, fmt }, tip) {
  const { svg, w, h } = frame(el); const m = theme.style.plot; const st = theme.style;
  const s = spec.series[0]; const { duration, stagger } = theme.motion;
  const x = scaleBand().domain(spec.axis.x.data).range([m.left, w - m.right]).padding(0);
  const y = cartesian(svg, w, h, spec, theme, { xScale: x });
  const data = s.data.map((v, i) => ({ v, i, c: spec.axis.x.data[i] }));
  const fill = theme.color(s.color); const hover = theme.color(s.hoverColor || s.color);
  const bars = svg.append('g').attr('class', 'bars').selectAll('rect').data(data).join('rect')
    .attr('data-hover', '').attr('x', (d) => x(d.c) + 0.5).attr('width', x.bandwidth() - 1)
    .attr('fill', fill).attr('stroke', theme.color(s.stroke)).attr('stroke-width', st.bar.stroke)
    .attr('y', y(spec.axis.y.min)).attr('height', 0);
  t(bars, animate, duration, 0).delay((d) => (animate ? d.i * stagger : 0))
    .attr('y', (d) => y(d.v)).attr('height', (d) => y(spec.axis.y.min) - y(d.v));
  if (s.dots) {
    const dots = svg.append('g').attr('class', 'dots').attr('pointer-events', 'none').selectAll('circle').data(data).join('circle')
      .attr('cx', (d) => x(d.c) + x.bandwidth() / 2).attr('cy', (d) => y(d.v)).attr('r', animate ? 0 : st.point.barDot)
      .attr('fill', theme.ink).attr('stroke', theme.halo).attr('stroke-width', st.point.haloWidth);
    t(dots, animate, 300).delay((d) => (animate ? d.i * stagger + 450 : 0)).attr('r', st.point.barDot);
  }
  bars.on('pointerenter', function onEnter() { select(this).attr('fill', hover); })
    .on('pointermove', (ev, d) => tip.show(tooltipHTML({ title: d.c, rows: [{ label: s.name, value: fmt(d.v), color: theme.color(s.stroke) }] }), pointer(ev, el)))
    .on('pointerleave', function onLeave() { select(this).attr('fill', fill); tip.hide(); });
}

/* ─────────────── area-stacked ─────────────── */
function areaStacked(el, { spec, theme, animate, fmt }, tip) {
  const { svg, w, h } = frame(el); const m = theme.style.plot; const st = theme.style;
  const xs = spec.axis.x.data; const { duration, stagger } = theme.motion;
  const x = scaleLinear().domain([spec.axis.x.min, spec.axis.x.max]).range([m.left, w - m.right]);
  const y = cartesian(svg, w, h, spec, theme, { xScale: x });
  // Apilado: base y techo de cada serie
  const layers = []; const acc = xs.map(() => 0);
  spec.series.forEach((s, i) => {
    const pts = xs.map((xv, j) => { const y0 = acc[j]; acc[j] += s.data[j]; return { x: xv, y0, y1: acc[j], v: s.data[j] }; });
    layers.push({ s, i, pts });
  });
  const totals = [...acc];
  const clipId = `clip-${Math.random().toString(36).slice(2)}`;
  const clip = svg.append('clipPath').attr('id', clipId).append('rect').attr('x', m.left).attr('y', 0).attr('height', h).attr('width', animate ? 0 : w);
  const plot = svg.append('g').attr('class', 'layers').attr('clip-path', `url(#${clipId})`);
  const ar = area().x((d) => x(d.x)).y0((d) => y(d.y0)).y1((d) => y(d.y1)).curve(curveLinear);
  const ln = line().x((d) => x(d.x)).y((d) => y(d.y1)).curve(curveLinear);
  // Orden de pintado como ECharts: todas las áreas, encima todas las líneas y encima todos los puntos
  // (si cada capa pintara área+línea+puntos, el área de la capa siguiente taparía la línea de la anterior).
  const groups = plot.append('g').selectAll('path').data(layers).join('path').attr('class', 'layer').attr('data-hover', '')
    .attr('d', (d) => ar(d.pts)).attr('fill', (d) => theme.color(d.s.color));
  const strokes = plot.append('g').attr('pointer-events', 'none').selectAll('g').data(layers).join('g');
  strokes.append('path').attr('d', (d) => ln(d.pts)).attr('fill', 'none').attr('stroke', (d) => theme.color(d.s.stroke)).attr('stroke-width', st.line.width);
  strokes.selectAll('circle').data((d) => d.pts.map((p) => ({ ...p, c: theme.color(d.s.stroke) }))).join('circle')
    .attr('cx', (p) => x(p.x)).attr('cy', (p) => y(p.y1)).attr('r', st.point.radius).attr('fill', (p) => p.c);
  if (animate) {
    // Igual que ECharts (animación «clip» de izquierda a derecha) y cada capa aparece escalonada.
    clip.transition().duration(duration * 1.3).ease(easeCubicOut).attr('width', w);
    [groups, strokes].forEach((sel) => sel.attr('opacity', 0).transition().duration(duration * 0.6).delay((d) => d.i * stagger * 2).attr('opacity', 1));
  }
  // Hover: capa bajo el puntero resaltada + guía vertical en el punto más cercano + tooltip de eje
  const guide = svg.append('line').attr('stroke', theme.ink).attr('y1', m.top).attr('y2', h - m.bottom).attr('opacity', 0).attr('pointer-events', 'none');
  groups.on('pointerenter', function dim(ev, d) {
    const me = this; groups.classed('is-dimmed', function f() { return this !== me; });
    strokes.classed('is-dimmed', (o) => o !== d);
  });
  svg.on('pointermove', (ev) => {
    const [px, py] = pointer(ev, svg.node());
    if (px < m.left || py < m.top || py > h - m.bottom) { guide.attr('opacity', 0); tip.hide(); return; }
    const j = xs.reduce((best, xv, k) => (Math.abs(x(xv) - px) < Math.abs(x(xs[best]) - px) ? k : best), 0);
    guide.attr('x1', x(xs[j]) + 0.5).attr('x2', x(xs[j]) + 0.5).attr('opacity', 1);
    tip.show(tooltipHTML({
      title: `x = ${xs[j]} · total ${fmt(totals[j])}`,
      rows: [...layers].reverse().map((l) => ({ label: l.s.name, value: fmt(l.s.data[j]), color: theme.color(l.s.color) })),
    }), pointer(ev, el));
  }).on('pointerleave', () => { guide.attr('opacity', 0); groups.classed('is-dimmed', false); strokes.classed('is-dimmed', false); tip.hide(); });
}

/* ─────────────── radar ─────────────── */
function radar(el, { spec, theme, animate, fmt }, tip) {
  const { svg, w, h } = frame(el); const st = theme.style;
  const { indicators, max, rings } = spec.radar; const { duration, stagger } = theme.motion;
  const r = Math.max(40, Math.min(w, h) / 2 - st.radar.labelGap); const cx = w / 2; const cy = h / 2;
  const n = indicators.length; const ang = (k) => (k / n) * Math.PI * 2; // 0 = arriba, sentido horario
  const rs = scaleLinear().domain([0, max]).range([0, r]);
  const root = svg.append('g').attr('transform', `translate(${cx},${cy})`).attr('font-family', theme.font);
  root.selectAll('circle.ring').data(rings).join('circle').attr('class', 'ring').attr('r', (d) => rs(d)).attr('fill', 'none').attr('stroke', theme.grid);
  root.selectAll('line.spoke').data(indicators).join('line').attr('class', 'spoke')
    .attr('x2', (d, k) => Math.sin(ang(k)) * r).attr('y2', (d, k) => -Math.cos(ang(k)) * r).attr('stroke', theme.grid);
  root.selectAll('text.ind').data(indicators).join('text').attr('class', 'ind')
    .attr('x', (d, k) => Math.sin(ang(k)) * (r + 10)).attr('y', (d, k) => -Math.cos(ang(k)) * (r + 10))
    .attr('text-anchor', (d, k) => { const s = Math.sin(ang(k)); return Math.abs(s) < 0.1 ? 'middle' : s > 0 ? 'start' : 'end'; })
    .attr('dominant-baseline', (d, k) => { const c = -Math.cos(ang(k)); return Math.abs(c) < 0.1 ? 'middle' : c < 0 ? 'auto' : 'hanging'; })
    .attr('font-size', theme.fontSizeLarge).attr('fill', theme.textMuted).text((d) => d);
  const radial = lineRadial().angle((d, k) => ang(k)).radius((d) => rs(d)).curve(curveLinearClosed);
  const polys = root.append('g').selectAll('path').data(spec.series.map((s, i) => ({ s, i }))).join('path')
    .attr('data-hover', '').attr('d', (d) => radial(d.s.data))
    .attr('fill', (d) => theme.color(d.s.color)).attr('fill-opacity', (d) => d.s.fillOpacity ?? 1)
    .attr('stroke', (d) => (d.s.stroke === 'none' ? 'none' : theme.color(d.s.stroke))).attr('stroke-width', st.radar.stroke)
    .attr('stroke-linejoin', 'round');
  if (animate) {
    polys.attr('transform', 'scale(0)').transition().duration(duration).delay((d) => d.i * stagger * 2).ease(easeCubicOut).attr('transform', 'scale(1)');
  }
  // Etiquetas de los anillos con halo (encima de todo)
  // Junto al eje de JAN (en Figma van a ~15° y tapan la etiqueta FEB).
  root.selectAll('text.ring-label').data(rings).join('text').attr('class', 'ring-label')
    .attr('x', 4).attr('y', (d) => -rs(d) + 10).attr('dy', '0.32em')
    .attr('font-size', theme.fontSize).attr('fill', theme.text).attr('stroke', theme.halo).attr('stroke-width', st.radar.ringLabelHalo)
    .attr('paint-order', 'stroke').attr('pointer-events', 'none').text((d) => fmt(d));
  polys.on('pointerenter', function enter() { const me = this; polys.classed('is-dimmed', function f() { return this !== me; }); })
    .on('pointermove', (ev, d) => tip.show(tooltipHTML({
      title: d.s.name, rows: indicators.map((mo, k) => ({ label: mo, value: fmt(d.s.data[k]), color: theme.color(d.s.color) })),
    }), pointer(ev, el)))
    .on('pointerleave', () => { polys.classed('is-dimmed', false); tip.hide(); });
}

/* ─────────────── candlestick (agrupado) ─────────────── */
function candlestick(el, { spec, theme, animate, fmt }, tip) {
  const { svg, w, h } = frame(el); const m = theme.style.plot; const st = theme.style;
  const cats = spec.axis.x.data; const n = spec.series.length; const { duration, stagger } = theme.motion;
  const x = scaleBand().domain(cats).range([m.left, w - m.right]).padding(0);
  const y = cartesian(svg, w, h, spec, theme, { xScale: x });
  const shade = svg.append('rect').attr('y', m.top).attr('height', h - m.top - m.bottom).attr('width', x.bandwidth())
    .attr('fill', theme.grid).attr('opacity', 0).attr('pointer-events', 'none');
  const W = st.candle.width;
  const items = spec.series.flatMap((s, si) => s.data.map((d, i) => ({ ...d, i, si, c: theme.color(s.color), x: x(cats[i]) + x.bandwidth() / 2 + (si - (n - 1) / 2) * W })));
  const g = svg.append('g').attr('class', 'candles').attr('pointer-events', 'none').selectAll('g').data(items).join('g');
  const delay = (d) => (animate ? d.i * stagger + d.si * 40 : 0);
  const wick = g.append('line').attr('x1', (d) => d.x).attr('x2', (d) => d.x).attr('y1', (d) => y(d.high)).attr('y2', (d) => y(d.low))
    .attr('stroke', (d) => d.c).attr('stroke-width', st.candle.wick).attr('opacity', animate ? 0 : 1);
  t(wick, animate, duration * 0.7).delay(delay).attr('opacity', 1);
  const mid = (d) => (y(d.open) + y(d.close)) / 2;
  const body = g.append('rect').attr('x', (d) => d.x - W / 2).attr('width', W).attr('fill', (d) => d.c)
    .attr('y', (d) => (animate ? mid(d) : Math.min(y(d.open), y(d.close)))).attr('height', (d) => (animate ? 0 : Math.max(1, Math.abs(y(d.open) - y(d.close)))));
  t(body, animate, duration * 0.7).delay(delay).attr('y', (d) => Math.min(y(d.open), y(d.close))).attr('height', (d) => Math.max(1, Math.abs(y(d.open) - y(d.close))));
  const midLine = g.append('line').attr('x1', (d) => d.x - W / 2).attr('x2', (d) => d.x + W / 2).attr('y1', (d) => y(d.mid)).attr('y2', (d) => y(d.mid))
    .attr('stroke', theme.halo).attr('opacity', animate ? 0 : 1);
  t(midLine, animate, 300).delay((d) => delay(d) + 200).attr('opacity', 1);
  // Medias móviles: curva suave dibujándose + puntos (solo donde Figma tiene punto)
  (spec.lines || []).forEach((l, li) => {
    const filled = fillGaps(l.data); const color = theme.color(l.color);
    const pts = filled.map((v, i) => ({ v, i, has: l.data[i] != null })).filter((p) => p.v != null);
    const path = svg.append('path').attr('pointer-events', 'none')
      .attr('d', line().x((p) => x(cats[p.i]) + x.bandwidth() / 2).y((p) => y(p.v)).curve(curveCatmullRom.alpha(0.5))(pts))
      .attr('fill', 'none').attr('stroke', color).attr('stroke-width', st.line.smoothWidth);
    if (animate) {
      const len = path.node().getTotalLength();
      path.attr('stroke-dasharray', `${len} ${len}`).attr('stroke-dashoffset', len)
        .transition().duration(duration * 1.4).delay(300 + li * 200).ease(easeCubicOut).attr('stroke-dashoffset', 0)
        .on('end', function clean() { select(this).attr('stroke-dasharray', null); });
    }
    const dots = svg.append('g').attr('pointer-events', 'none').selectAll('circle').data(pts.filter((p) => p.has)).join('circle')
      .attr('cx', (p) => x(cats[p.i]) + x.bandwidth() / 2).attr('cy', (p) => y(p.v)).attr('r', animate ? 0 : st.point.lineDot).attr('fill', color);
    t(dots, animate, 250).delay((p) => (animate ? 300 + li * 200 + (p.i / cats.length) * duration * 1.4 : 0)).attr('r', st.point.lineDot);
  });
  // Hover por mes (como axisPointer «shadow» de ECharts)
  const fmtCandle = (d) => `${fmt(d.open)} → ${fmt(d.close)}`;
  svg.append('g').selectAll('rect').data(cats).join('rect').attr('x', (c) => x(c)).attr('y', m.top)
    .attr('width', x.bandwidth()).attr('height', h - m.top - m.bottom).attr('fill', 'transparent')
    .on('pointerenter', (ev, c) => shade.attr('x', x(c)).attr('opacity', 0.35))
    .on('pointermove', (ev, c) => {
      const i = cats.indexOf(c);
      tip.show(tooltipHTML({
        title: c,
        rows: [
          ...spec.series.map((s) => ({ label: s.name, value: fmtCandle(s.data[i]), color: theme.color(s.color) })),
          ...(spec.lines || []).map((l) => ({ label: l.name, value: fmt(fillGaps(l.data)[i]), color: theme.color(l.color) })),
        ],
      }), pointer(ev, el));
    })
    .on('pointerleave', () => { shade.attr('opacity', 0); tip.hide(); });
}

const BUILDERS = { bar, 'area-stacked': areaStacked, radar, candlestick };

export function mount(el, ctx) {
  let tip = createTooltip(el);
  const draw = (animate) => { select(el).selectAll(`svg.${NS}`).remove(); BUILDERS[ctx.spec.type](el, { ...ctx, animate }, tip); };
  draw(ctx.animate);
  return {
    resize() { draw(false); },
    destroy() { select(el).selectAll(`svg.${NS}`).interrupt().remove(); tip.remove(); tip = null; },
  };
}
