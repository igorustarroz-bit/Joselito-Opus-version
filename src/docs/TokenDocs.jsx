/* token-audit-ignore-file — bloques de documentación de tokens (estilos del propio Storybook).
 * Se alimentan de src/tokens/tokens.meta.json: al regenerar tokens, la doc se actualiza sola. */
import meta from '../tokens/tokens.meta.json';

const vars = Object.entries(meta.cssVars || {});
const box = { border: '1px solid rgba(127,127,127,.25)', borderRadius: 8, padding: 12, fontSize: 12 };
const mono = { fontFamily: 'ui-monospace, monospace', fontSize: 11, opacity: 0.8 };

export function ColorTokens({ role = 'theme' }) {
  const colors = vars.filter(([, v]) => v.type === 'C' && v.role === role);
  const themes = role === 'theme' ? meta.themes : [{ slug: null, name: 'Valor' }];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {themes.map((t) => (
        <div key={t.slug || 'base'} data-theme={t.slug || undefined} style={{ ...box, flex: '1 1 280px', background: 'var(--backgrounds-base)', color: 'var(--texts-base)' }}>
          <strong>{t.name}</strong>
          {colors.map(([name, v]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: `var(${name})`, border: '1px solid rgba(127,127,127,.3)' }} />
              <span><div>{v.figma.split('::')[1]}</div><div style={mono}>{name}</div></span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TypographyTokens({ sample = 'Declarado el mejor diseño del mundo' }) {
  return (
    <div>
      {(meta.textStyles || []).map((t) => (
        <div key={t.class} style={{ ...box, marginBottom: 8 }}>
          <div style={mono}>{t.name} · .{t.class}</div>
          <div className={t.class}>{sample}</div>
        </div>
      ))}
    </div>
  );
}

export function SizeTokens({ match = /spac|gap|wrapper|gutter|padding|margin/, kind = 'bar' }) {
  const list = vars.filter(([n, v]) => v.type === 'F' && match.test(n));
  return (
    <div>
      {list.map(([name, v]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0' }}>
          {kind === 'bar'
            ? <span style={{ height: 12, width: `var(${name})`, maxWidth: '60%', background: 'currentColor', opacity: 0.6 }} />
            : <span style={{ width: 48, height: 48, borderRadius: `var(${name})`, border: '2px solid currentColor' }} />}
          <span><div>{v.figma.split('::')[1]}</div><div style={mono}>{name}</div></span>
        </div>
      ))}
    </div>
  );
}

export function Breakpoints() {
  return (
    <table>
      <thead><tr><th>Breakpoint</th><th>Figma</th><th>Desde</th><th>Columnas</th></tr></thead>
      <tbody>
        {(meta.breakpoints || []).map((b, i) => {
          const g = (meta.grids || []).filter((x) => x.width <= b.width).at(-1);
          return <tr key={b.name}><td><code>{i === 0 ? '(base)' : `${b.name}:`}</code></td><td>{b.label}</td><td>{b.width}px</td><td>{g ? g.columns : '—'}</td></tr>;
        })}
      </tbody>
    </table>
  );
}

export function EffectTokens() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {(meta.effectStyles || []).map((c) => (
        <div key={c} className={c} style={{ ...box, width: 160, height: 96, background: 'var(--backgrounds-base)' }}><code>.{c}</code></div>
      ))}
    </div>
  );
}
