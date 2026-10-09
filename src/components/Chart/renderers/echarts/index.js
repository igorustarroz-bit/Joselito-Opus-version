/**
 * Motor ECharts. Traduce un ChartSpec a una `option` de ECharts.
 * Import modular (echarts/core): solo se empaquetan los tipos y componentes usados.
 * Renderer SVG: nítido, imprimible y con el mismo modelo de capas que D3.
 */
import * as echarts from 'echarts/core';
import { BarChart, LineChart, ScatterChart, RadarChart, CustomChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, RadarComponent, GraphicComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { tooltipHTML, fillGaps } from '../../shared';

echarts.use([BarChart, LineChart, ScatterChart, RadarChart, CustomChart, GridComponent, TooltipComponent, RadarComponent, GraphicComponent, SVGRenderer]);

const withAlpha = (hex, a) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; // token-audit-ignore (alfa calculada sobre un token ya resuelto)
};

function base(spec, theme, animate) {
  const motion = theme.motion;
  return {
    animation: animate,
    animationDuration: motion.duration,
    animationEasing: motion.easing,
    animationDurationUpdate: 300,
    textStyle: { fontFamily: theme.font, fontSize: theme.fontSize, color: theme.textMuted },
    tooltip: {
      confine: true,
      renderMode: 'html',
      className: 'hz-ec-tooltip hz-chart-tooltip is-visible',
      padding: 0, borderWidth: 0, backgroundColor: 'transparent', extraCssText: 'box-shadow:none;',
      transitionDuration: 0.12,
    },
  };
}

function cartesian(spec, theme, { boundaryGap = true, xSplit = theme.style.grid.x, border = theme.style.grid.border } = {}) {
  const { x, y } = spec.axis;
  const label = { color: theme.textMuted, fontSize: theme.fontSize, fontFamily: theme.font };
  return {
    grid: { ...theme.style.plot, containLabel: false, show: border, borderColor: theme.axis, borderWidth: 1 },
    xAxis: {
      type: x.type,
      data: x.type === 'category' ? x.data : undefined,
      min: x.min, max: x.max, interval: x.interval,
      boundaryGap: x.type === 'category' ? boundaryGap : false,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { ...label, margin: theme.style.axisLabelGap, alignMaxLabel: x.type === 'value' ? 'right' : undefined },
      splitLine: { show: xSplit, lineStyle: { color: theme.grid, width: 1 } },
    },
    yAxis: {
      type: 'value', min: y.min, max: y.max, interval: y.interval,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { ...label, margin: theme.style.axisLabelGap },
      splitLine: { lineStyle: { color: theme.grid, width: 1 } },
    },
  };
}

/* ─────────────── bar ─────────────── */
function bar(spec, theme, ctx) {
  const s = spec.series[0];
  const { stagger } = theme.motion;
  const fill = theme.color(s.color); const stroke = theme.color(s.stroke);
  const series = [{
    type: 'bar', name: s.name, data: s.data, barCategoryGap: `${theme.style.bar.gap}%`,
    itemStyle: { color: fill, borderColor: stroke, borderWidth: theme.style.bar.stroke },
    emphasis: { itemStyle: { color: theme.color(s.hoverColor || s.color) } },
    animationDelay: (i) => i * stagger,
  }];
  if (s.dots) {
    series.push({
      type: 'scatter', data: s.data, symbol: 'circle', symbolSize: theme.style.point.barDot * 2, silent: true, z: 3,
      itemStyle: { color: theme.ink, borderColor: theme.halo, borderWidth: theme.style.point.haloWidth },
      animationDelay: (i) => i * stagger + 450, animationDuration: 300,
    });
  }
  return {
    ...cartesian(spec, theme),
    series,
    tooltip: {
      ...base(spec, theme, ctx.animate).tooltip, trigger: 'item',
      formatter: (p) => tooltipHTML({ title: `${spec.axis.x.data[p.dataIndex]}`, rows: [{ label: s.name, value: ctx.fmt(p.value), color: stroke }] }),
    },
  };
}

/* ─────────────── area-stacked ─────────────── */
function areaStacked(spec, theme, ctx) {
  const xs = spec.axis.x.data;
  const { stagger } = theme.motion;
  const totals = xs.map((_, j) => spec.series.reduce((acc, s) => acc + s.data[j], 0));
  return {
    ...cartesian(spec, theme),
    series: spec.series.map((s, i) => ({
      type: 'line', name: s.name, stack: 'total',
      data: s.data.map((v, j) => [xs[j], v]),
      symbol: 'circle', symbolSize: theme.style.point.radius * 2, showSymbol: true,
      lineStyle: { color: theme.color(s.stroke), width: theme.style.line.width },
      itemStyle: { color: theme.color(s.stroke), borderColor: theme.color(s.stroke) },
      areaStyle: { color: theme.color(s.color), opacity: 1 },
      emphasis: { focus: 'series', areaStyle: { opacity: 1 } },
      blur: { areaStyle: { opacity: theme.motion.hoverDim }, lineStyle: { opacity: theme.motion.hoverDim }, itemStyle: { opacity: theme.motion.hoverDim } },
      animationDelay: i * stagger * 2,
    })),
    tooltip: {
      ...base(spec, theme, ctx.animate).tooltip, trigger: 'axis',
      axisPointer: { type: 'line', lineStyle: { color: theme.ink, width: 1, type: 'solid' } },
      formatter: (ps) => {
        const j = ps[0].dataIndex;
        return tooltipHTML({
          title: `x = ${xs[j]} · total ${ctx.fmt(totals[j])}`,
          rows: [...spec.series].reverse().map((s) => ({ label: s.name, value: ctx.fmt(s.data[j]), color: theme.color(s.color) })),
        });
      },
    },
  };
}

/* ─────────────── radar ─────────────── */
function radar(spec, theme, ctx, size) {
  const { indicators, max, rings } = spec.radar;
  const { stagger } = theme.motion;
  const r = Math.max(40, Math.min(size.w, size.h) / 2 - theme.style.radar.labelGap);
  const cx = size.w / 2; const cy = size.h / 2;
  // Etiquetas de los anillos (1000/2000/3000 mW) junto al eje de JAN, con halo blanco.
  // (En Figma van a ~15° y tapan la etiqueta FEB: se pegan al eje vertical.)
  const ringLabels = rings.map((v) => ({
    type: 'text', silent: true, z: 10,
    x: cx + 4, y: cy - (r * v) / max + 10,
    style: {
      text: ctx.fmt(v), fill: theme.text, font: `${theme.fontSize}px ${theme.font}`,
      stroke: theme.halo, lineWidth: theme.style.radar.ringLabelHalo, align: 'left', verticalAlign: 'middle',
    },
  }));
  return {
    radar: {
      center: [cx, cy], radius: r, shape: 'circle', splitNumber: rings.length, startAngle: 90, clockwise: true,
      indicator: indicators.map((name) => ({ name, max, min: 0 })),
      axisName: { color: theme.textMuted, fontSize: theme.fontSizeLarge, fontFamily: theme.font },
      axisNameGap: 10,
      axisLine: { lineStyle: { color: theme.grid } },
      splitLine: { lineStyle: { color: theme.grid } },
      splitArea: { show: false },
    },
    graphic: ringLabels,
    series: [{
      type: 'radar', symbol: 'none',
      data: spec.series.map((s, i) => ({
        name: s.name, value: s.data,
        lineStyle: { color: s.stroke === 'none' ? 'transparent' : theme.color(s.stroke), width: theme.style.radar.stroke },
        areaStyle: { color: theme.color(s.color), opacity: s.fillOpacity ?? 1 },
        itemStyle: { color: theme.color(s.color) },
        animationDelay: i * stagger * 2,
      })),
      emphasis: { focus: 'self', lineStyle: { width: 2.5 } },
      blur: { areaStyle: { opacity: theme.motion.hoverDim }, lineStyle: { opacity: theme.motion.hoverDim } },
      animationDelay: (i) => i * stagger * 2,
    }],
    tooltip: {
      ...base(spec, theme, ctx.animate).tooltip, trigger: 'item',
      formatter: (p) => tooltipHTML({
        title: p.name,
        rows: indicators.map((m, k) => ({ label: m, value: ctx.fmt(p.value[k]), color: theme.color(spec.series[p.dataIndex].color) })),
      }),
    },
  };
}

/* ─────────────── candlestick (agrupado) ───────────────
   ECharts no agrupa varias series `candlestick` en la misma categoría (se solapan): se pinta con una
   serie `custom` que desplaza cada vela según su índice de serie. */
function candlestick(spec, theme, ctx) {
  const cats = spec.axis.x.data;
  const n = spec.series.length;
  const { stagger, duration } = theme.motion;
  const candleW = theme.style.candle.width; const gap = 0;
  const series = spec.series.map((s, si) => {
    const color = theme.color(s.color);
    return {
      type: 'custom', name: s.name, z: 2,
      data: s.data.map((d, i) => [i, d.open, d.close, d.low, d.high, d.mid]),
      encode: { x: 0, y: [1, 2, 3, 4] },
      renderItem: (params, api) => {
        const i = api.value(0);
        const [xC] = api.coord([i, 0]);
        const x = xC + (si - (n - 1) / 2) * (candleW + gap);
        const yO = api.coord([i, api.value(1)])[1]; const yC = api.coord([i, api.value(2)])[1];
        const yL = api.coord([i, api.value(3)])[1]; const yH = api.coord([i, api.value(4)])[1];
        const yM = api.coord([i, api.value(5)])[1];
        const top = Math.min(yO, yC); const h = Math.max(1, Math.abs(yO - yC));
        const delay = i * stagger + si * 40;
        const anim = { duration: duration * 0.7, delay, easing: 'cubicOut' };
        return {
          type: 'group', x: 0, y: 0,
          children: [
            { type: 'line', shape: { x1: x, y1: yH, x2: x, y2: yL }, style: { stroke: color, lineWidth: theme.style.candle.wick },
              enterFrom: { style: { opacity: 0 } }, enterAnimation: anim },
            { type: 'rect', shape: { x: x - candleW / 2, y: top, width: candleW, height: h }, style: { fill: color },
              emphasis: { style: { stroke: theme.ink, lineWidth: 1 } },
              enterFrom: { shape: { y: (yO + yC) / 2, height: 0 } }, enterAnimation: anim },
            { type: 'line', shape: { x1: x - candleW / 2, y1: yM, x2: x + candleW / 2, y2: yM }, style: { stroke: theme.halo, lineWidth: 1 },
              enterFrom: { style: { opacity: 0 } }, enterAnimation: { ...anim, delay: delay + 200 } },
          ],
        };
      },
    };
  });
  const lines = (spec.lines || []).map((l, li) => ({
    type: 'line', name: l.name, data: fillGaps(l.data), smooth: 0.35, z: 4,
    symbol: (v, p) => (l.data[p.dataIndex] == null ? 'none' : 'circle'), symbolSize: theme.style.point.lineDot * 2,
    lineStyle: { color: theme.color(l.color), width: theme.style.line.smoothWidth },
    itemStyle: { color: theme.color(l.color) },
    emphasis: { focus: 'series' },
    animationDuration: duration * 1.4, animationDelay: 300 + li * 200,
  }));
  const fmtCandle = (d) => `${ctx.fmt(d.open)} → ${ctx.fmt(d.close)}`;
  return {
    ...cartesian(spec, theme),
    series: [...series, ...lines],
    tooltip: {
      ...base(spec, theme, ctx.animate).tooltip, trigger: 'axis',
      axisPointer: { type: 'shadow', z: 0, shadowStyle: { color: withAlpha(theme.grid, 0.35) } },
      formatter: (ps) => {
        const i = ps[0].dataIndex;
        return tooltipHTML({
          title: cats[i],
          rows: [
            ...spec.series.map((s) => ({ label: s.name, value: fmtCandle(s.data[i]), color: theme.color(s.color) })),
            ...(spec.lines || []).map((l) => ({ label: l.name, value: ctx.fmt(fillGaps(l.data)[i]), color: theme.color(l.color) })),
          ],
        });
      },
    },
  };
}

const BUILDERS = { bar, 'area-stacked': areaStacked, radar, candlestick };

export function mount(el, ctx) {
  const { spec, theme, animate } = ctx;
  const chart = echarts.init(el, null, { renderer: 'svg' });
  const build = () => {
    const size = { w: el.clientWidth, h: el.clientHeight };
    const b = base(spec, theme, animate);
    const o = BUILDERS[spec.type](spec, theme, ctx, size);
    return { ...b, ...o, tooltip: { ...b.tooltip, ...o.tooltip, appendTo: el } };
  };
  chart.setOption(build());
  return {
    resize() {
      chart.resize({ animation: { duration: 0 } });
      if (spec.type === 'radar') chart.setOption(build(), { lazyUpdate: true });
    },
    destroy() { chart.dispose(); },
    chart,
  };
}
