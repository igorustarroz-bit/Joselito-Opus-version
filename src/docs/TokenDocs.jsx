/* token-audit-ignore-file — bloques de documentación de tokens (estilos del propio Storybook).
 * Se alimentan de src/tokens/tokens.meta.json: al regenerar tokens, la doc se actualiza sola. */
import { useState } from 'react';
import meta from '../tokens/tokens.meta.json';
import tokens from '../tokens/tokens.json';
import './doc-kit.css';

const vars = Object.entries(meta.cssVars || {});
const box = { border: '1px solid rgba(127,127,127,.25)', borderRadius: 8, padding: 12, fontSize: 12 };
const mono = { fontFamily: 'ui-monospace, monospace', fontSize: 11, opacity: 0.8 };

/* ---------- Colores (formato Wix Design System: buscador + tablas Nombre · Valor · Vista) ---------- */

const byFigma = Object.fromEntries(vars.map(([name, v]) => [v.figma, name]));
const walk = (o, p = []) => Object.entries(o || {}).flatMap(([k, v]) => (v && v.$type ? [[[...p, k], v]] : v && typeof v === 'object' && !k.startsWith('$') ? walk(v, [...p, k]) : []));
const hexToCss = (h) => {
  const m = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(h || '');
  if (!m || !m[2]) return h;
  const n = parseInt(m[1], 16), a = Math.round((parseInt(m[2], 16) / 255) * 100) / 100;
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};
const COLL_PRIM = Object.keys(tokens).find((k) => /primitive/i.test(k)) || 'Primitives';
const COLL_SEM = Object.keys(tokens).find((k) => /semantic|color/i.test(k) && k !== COLL_PRIM) || 'Semantic-Color';
const primitives = walk(tokens[COLL_PRIM]).filter(([, v]) => v.$type === 'color').map(([path, v]) => ({
  path, name: byFigma[`${COLL_PRIM}::${path.join('/')}`] || `--${path.join('-').toLowerCase()}`, value: hexToCss(v.$value),
}));
const primByRef = Object.fromEntries(primitives.map((p) => [`{${COLL_PRIM}.${p.path.join('.')}}`, p]));
const semantics = walk(tokens[COLL_SEM]).filter(([, v]) => v.$type === 'color').map(([path, v]) => ({
  path, name: byFigma[`${COLL_SEM}::${path.join('/')}`] || `--${path.join('-').toLowerCase()}`, modes: v.$extensions?.['com.figma']?.modes || { _: v.$value },
}));
const groupBy = (rows, key) => rows.reduce((acc, r) => { const k = key(r); (acc[k] ||= []).push(r); return acc; }, {});
const primGroup = (r) => r.path.slice(1, -1).join(' / ') || r.path[0];
const semGroup = (r) => r.path.slice(0, r.path.length > 2 ? 2 : 1).join(' / ');

function Swatch({ color }) {
  return <span className="hzd-tok__swatch"><span style={{ background: color }} /></span>;
}

function TokenTable({ rows }) {
  return (
    <div className="hzd-table-wrap hzd-tok__table">
      <table className="hzd-table">
        <thead><tr><th>Nombre</th><th>Valor</th><th className="hzd-tok__preview">Vista</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td><code className="hzd-tok__name">{r.name}</code></td>
              <td className="hzd-tok__value">{r.alias ? <><code className="hzd-tok__alias">{r.alias}</code> → {r.value}</> : r.value}</td>
              <td className="hzd-tok__preview"><Swatch color={r.css || r.value} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Groups({ rows, groupKey, q }) {
  const f = q.trim().toLowerCase();
  const shown = f ? rows.filter((r) => `${r.name} ${r.alias || ''} ${r.value} ${r.path.join('/')}`.toLowerCase().includes(f)) : rows;
  const groups = groupBy(shown, groupKey);
  if (!shown.length) return <p className="hzd-muted">Ningún token coincide con «{q}».</p>;
  return Object.entries(groups).map(([g, rs]) => (
    <section key={g} className="hzd-tok__group">
      <h4 className="hzd-tok__group-title">{g} <span className="hzd-muted">{rs.length}</span></h4>
      <TokenTable rows={rs} />
    </section>
  ));
}

/** Página de colores: primitivas (paleta) y semánticos (por subtema), con buscador. */
export function ColorTokens() {
  const [q, setQ] = useState('');
  const themes = meta.themes || [];
  const [theme, setTheme] = useState((themes.find((t) => t.default) || themes[0])?.name);
  const sem = semantics.map((s) => {
    const ref = s.modes[theme] ?? Object.values(s.modes)[0];
    const p = primByRef[ref];
    return { ...s, alias: p?.name, value: p ? p.value : hexToCss(ref), css: p ? p.value : hexToCss(ref) };
  });
  return (
    <div className="hzd hzd-tok">
      <input className="hzd-tok__search" type="search" placeholder="Busca tokens de color por nombre o valor…" value={q} onChange={(e) => setQ(e.target.value)} />

      <h2 className="hzd-h hzd-tok__h2">Semánticos</h2>
      <p className="hzd-muted">Los que se usan en componentes y módulos. Cambian con el subtema: elige uno para ver a qué primitiva apunta cada token.</p>
      {themes.length > 1 && (
        <nav className="hzd-tabs hzd-tok__themes" role="tablist">
          {themes.map((t) => (
            <button key={t.slug} type="button" role="tab" aria-selected={theme === t.name} className={`hzd-tab${theme === t.name ? ' is-active' : ''}`} onClick={() => setTheme(t.name)}>{t.name}</button>
          ))}
        </nav>
      )}
      <Groups rows={sem} groupKey={semGroup} q={q} />

      <h2 className="hzd-h hzd-tok__h2">Primitivas</h2>
      <p className="hzd-muted">La paleta de Figma. Solo de referencia: en el código se usan <strong>siempre</strong> los semánticos.</p>
      <Groups rows={primitives} groupKey={primGroup} q={q} />
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
      <thead><tr><th>Breakpoint</th><th>Figma (frame)</th><th>Rango</th><th>Columnas</th></tr></thead>
      <tbody>
        {(meta.breakpoints || []).map((b, i, all) => {
          const g = (meta.grids || []).filter((x) => x.width <= b.width).at(-1);
          const min = b.min ?? b.width, next = all[i + 1];
          const range = next ? `${min} – ${(next.min ?? next.width) - 1} px` : `${min} px +`;
          return <tr key={b.name}><td><code>{i === 0 ? '(base)' : `${b.name}:`}</code></td><td>{b.label}</td><td>{range}</td><td>{g ? g.columns : '—'}</td></tr>;
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
