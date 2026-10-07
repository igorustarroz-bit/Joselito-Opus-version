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

/* ---------- Breakpoints y rejilla (formato Wix: tablas + vista de cada rejilla a escala) ---------- */
const grids = meta.grids || [];
const bps = (meta.breakpoints || []).map((b, i, all) => {
  const min = b.min ?? b.width, next = all[i + 1];
  const max = next ? (next.min ?? next.width) - 1 : null;
  const g = grids.find((x) => x.width === b.width) || grids.filter((x) => x.width <= b.width).at(-1) || {};
  return { ...b, min, max, columns: g.columns, gutter: g.gutter, margin: g.margin };
});
const MAXW = Math.max(...bps.map((b) => b.width), 1);

function GridPreview({ b }) {
  // Frame de Figma a escala (el más ancho ocupa el 100 %): márgenes + columnas + gutters reales.
  const pct = (px) => `${(px / b.width) * 100}%`;
  return (
    <div className="hzd-grid__frame" style={{ width: `${(b.width / MAXW) * 100}%` }}>
      <div className="hzd-grid__cols" style={{ paddingInline: pct(b.margin || 0), columnGap: pct(b.gutter || 0), gridTemplateColumns: `repeat(${b.columns || 1}, 1fr)` }}>
        {Array.from({ length: b.columns || 1 }, (_, i) => <span key={i} />)}
      </div>
    </div>
  );
}

export function Breakpoints() {
  return (
    <div className="hzd hzd-grid">
      <h2 className="hzd-h hzd-tok__h2">Rangos</h2>
      <p className="hzd-muted">Cada modo de Figma se diseña en un frame (390, 768, 1440…), pero el cambio ocurre al <strong>inicio de su rango</strong>: es donde empiezan los <code className="hzd-tok__alias">@media</code>.</p>
      <div className="hzd-grid__ranges">
        {bps.map((b) => (
          <div key={b.name} className="hzd-grid__range">
            <div className="hzd-grid__range-name">{b.label.split(' ')[0]}</div>
            <div className="hzd-grid__range-px">{b.max != null ? `${b.min}–${b.max}` : `${b.min}+`} px</div>
          </div>
        ))}
      </div>
      <div className="hzd-table-wrap hzd-tok__table">
        <table className="hzd-table">
          <thead><tr><th>Breakpoint</th><th>Prefijo</th><th>Rango</th><th>Frame de Figma</th><th>Columnas</th><th>Gutter</th><th>Margen</th></tr></thead>
          <tbody>
            {bps.map((b, i) => (
              <tr key={b.name}>
                <td><strong>{b.label.split(' ')[0]}</strong></td>
                <td><code className="hzd-tok__name">{i === 0 ? '(base)' : `${b.name}:`}</code></td>
                <td className="hzd-tok__value">{b.max != null ? `${b.min} – ${b.max} px` : `${b.min} px +`}</td>
                <td className="hzd-tok__value">{b.width} px</td>
                <td className="hzd-tok__value">{b.columns ?? '—'}</td>
                <td className="hzd-tok__value">{b.gutter != null ? `${b.gutter} px` : '—'}</td>
                <td className="hzd-tok__value">{b.margin != null ? `${b.margin} px` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="hzd-h hzd-tok__h2">Rejilla por breakpoint</h2>
      <p className="hzd-muted">Cada frame de Figma a escala con sus márgenes, columnas y gutters. Entre breakpoints las columnas son elásticas: se recalculan con el ancho real.</p>
      {bps.map((b) => (
        <section key={b.name} className="hzd-grid__item">
          <h4 className="hzd-tok__group-title">{b.label.split(' ')[0]} <span className="hzd-muted">{b.width} px · {b.columns} columnas · gutter {b.gutter} px · margen {b.margin} px</span></h4>
          <GridPreview b={b} />
        </section>
      ))}

      <h2 className="hzd-h hzd-tok__h2">En código</h2>
      <div className="hzd-table-wrap hzd-tok__table">
        <table className="hzd-table">
          <thead><tr><th>Uso</th><th>Código</th></tr></thead>
          <tbody>
            <tr><td>Contenedor con márgenes y rejilla del sistema</td><td><code className="hzd-tok__name">{'<div class="wrapper grid-12">'}</code></td></tr>
            <tr><td>Colocar una pieza en sus columnas</td><td><code className="hzd-tok__name">grid-column: 1 / 7</code></td></tr>
            <tr><td>Ancho completo en móvil y tablet</td><td><code className="hzd-tok__name">grid-column: 1 / -1</code></td></tr>
            <tr><td>Media query de un rango</td><td><code className="hzd-tok__name">{`@media (min-width: ${bps.find((b) => b.columns === 12)?.min ?? 960}px)`}</code></td></tr>
            <tr><td>Variables</td><td><code className="hzd-tok__name">--grid-columns</code> <code className="hzd-tok__name">{meta.fluidGrid?.gutter || '--layout-grids-gutter'}</code> <code className="hzd-tok__name">{meta.fluidGrid?.wrapper || '--layout-grids-wrapper-default'}</code></td></tr>
          </tbody>
        </table>
      </div>
    </div>
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
