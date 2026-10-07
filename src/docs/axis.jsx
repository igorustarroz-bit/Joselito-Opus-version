/* token-audit-ignore-file — utilidades de documentación (estilo de la doc, no del proyecto).
 *
 * axisStory(Component, options): story que pinta TODAS las opciones de un eje de variante juntas
 * (meta.axes[].story → bloque «Variantes» de la página Doc). Cada opción reutiliza una story existente
 * (sus args, render, decorators y subtema) y/o args propios:
 *
 *   export const AxisType = axisStory(Button, [
 *     { label: 'Primary', story: PrimaryDefault },
 *     { label: 'M', args: { size: 'M' } },
 *   ]);
 */
import React from 'react';

const caption = { font: '500 12px/1.4 Inter, ui-sans-serif, system-ui, sans-serif', color: '#6b7280', letterSpacing: '0.01em' };

// Ojo: el contexto de la story NO va como prop (el generador de «Show code» lo serializaría entero y
// bloquea la página Doc); se pasa una función que lo cierra.
function AxisItem({ run }) {
  return run();
}

function renderOption(Component, option, args, ctx) {
  const s = option.story || {};
  const a = { ...args, ...(s.args || {}), ...(option.args || {}) };
  const c = { ...ctx, args: a };
  const inner = () => (s.render ? s.render(a, c) : Component ? <Component {...a} /> : null);
  let Fn = inner;
  for (const d of s.decorators || []) { const prev = Fn; Fn = () => d(prev, c); }
  const theme = option.theme || s.parameters?.defaultTheme;
  const el = Fn();
  return theme ? <div data-theme={theme} style={{ background: 'var(--backgrounds-base)', color: 'var(--texts-base)', padding: 8 }}>{el}</div> : el;
}

// Código que enseña «Show code»: una línea por opción con las props que la distinguen.
function sourceFor(Component, options) {
  const name = Component?.displayName || Component?.name || 'Component';
  const attr = ([k, v]) => (v === true ? k : typeof v === 'string' ? `${k}="${v}"` : `${k}={${JSON.stringify(v)}}`);
  return options.map((o) => {
    const a = { ...(o.story?.args || {}), ...(o.args || {}) };
    const props = Object.entries(a).filter(([, v]) => v !== undefined && typeof v !== 'function' && v !== false).map(attr).join(' ');
    return `<${name}${props ? ' ' + props : ''} />`;
  }).join('\n');
}

export function axisStory(Component, options, { name, stacked = false } = {}) {
  return {
    ...(name ? { name } : {}),
    parameters: { docs: { source: { code: sourceFor(Component, options), language: 'jsx' } } },
    render: (args, ctx) => (
      <div style={{ display: 'flex', flexDirection: stacked ? 'column' : 'row', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
        {options.map((o) => (
          <figure key={o.label} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0, maxWidth: '100%' }}>
            <AxisItem run={() => renderOption(Component, o, args, ctx)} />
            <figcaption style={caption}>{o.label}</figcaption>
          </figure>
        ))}
      </div>
    ),
  };
}
