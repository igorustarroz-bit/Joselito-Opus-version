/* token-audit-ignore-file — kit de la página de documentación (estilo del propio Storybook, no del proyecto).
 *
 * <DocPage> pinta la doc de un elemento leyendo su <Nombre>.meta.json (contrato en references/docs.md):
 *   cabecera (título, tipo, enlaces a Figma y al código) + pestañas Resumen · Código · Cambios.
 *   Resumen: Demo · Uso (Do / Don't) · Anatomía · Variantes por eje · Layout y columnas · Comportamiento ·
 *            Subtemas · Guía de contenido · Accesibilidad · Casos de uso · Relacionados · Pendientes
 *   Código:  Import · Propiedades · Playground (Controls) · Tokens · Ficheros
 *   Cambios: meta.changelog
 * El MDX lo genera scripts/hanzo/docs-generator.mjs; como importa el meta.json, editar el meta.json
 * actualiza la doc sin regenerar (solo hace falta regenerar si cambian los enlaces o el nombre).
 *
 * argTypesFromMeta(meta, overrides?): úsalo en el default export de las stories para que Controls muestre tipo,
 * descripción y el control correcto (select, boolean, text…) en vez de "unknown" o JSON.
 */
import React, { useState } from 'react';
import { Canvas, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import './doc-kit.css';

const I18N = {
  es: {
    tabs: { overview: 'Resumen', code: 'Código', changelog: 'Cambios' },
    kind: { component: 'Componente', module: 'Módulo', template: 'Template', foundation: 'Foundation', asset: 'Brand asset' },
    figma: 'Ver en Figma', source: 'Ver código', demo: 'Demo', usage: 'Uso', do: 'Sí', dont: 'No',
    anatomy: 'Anatomía', variants: 'Variantes', layout: 'Layout y columnas', type: 'Tipología', variant: 'Variante', piece: 'Pieza',
    columns: 'Columnas', noColumns: 'sin rejilla (a sangre / líquido)', behavior: 'Comportamiento', themes: 'Subtemas',
    defaultTheme: 'Por defecto', supported: 'Soportados', content: 'Guía de contenido', field: 'Campo', max: 'Límite', notes: 'Notas',
    a11y: 'Accesibilidad', useCases: 'Casos de uso', related: 'Relacionados', placeholders: 'Pendientes', import: 'Import',
    playground: 'Playground', playgroundHint: 'Cambia las propiedades y mira el resultado en vivo.', props: 'Propiedades',
    name: 'Nombre', ptype: 'Tipo', def: 'Por defecto', desc: 'Descripción', figmaProp: 'En Figma', tokens: 'Tokens', usageCol: 'Uso',
    files: 'Ficheros', codePath: 'Código', figmaNode: 'Nodo de Figma', changelog: 'Cambios', noChanges: 'Sin cambios desde la primera versión.',
    none: '—', copy: 'Copiar', copied: 'Copiado',
  },
  en: {
    tabs: { overview: 'Overview', code: 'Code', changelog: 'Changelog' },
    kind: { component: 'Component', module: 'Module', template: 'Template', foundation: 'Foundation', asset: 'Brand asset' },
    figma: 'Open in Figma', source: 'Source', demo: 'Demo', usage: 'Usage', do: 'Do', dont: "Don't",
    anatomy: 'Anatomy', variants: 'Variations', layout: 'Layout and columns', type: 'Typology', variant: 'Variant', piece: 'Piece',
    columns: 'Columns', noColumns: 'no grid (full-bleed / liquid)', behavior: 'Behavior', themes: 'Subthemes',
    defaultTheme: 'Default', supported: 'Supported', content: 'Content guidelines', field: 'Field', max: 'Limit', notes: 'Notes',
    a11y: 'Accessibility', useCases: 'Common use cases', related: 'Related', placeholders: 'Pending', import: 'Import',
    playground: 'Playground', playgroundHint: 'Change the properties and see the result live.', props: 'Properties',
    name: 'Name', ptype: 'Type', def: 'Default', desc: 'Description', figmaProp: 'In Figma', tokens: 'Tokens', usageCol: 'Usage',
    files: 'Files', codePath: 'Code', figmaNode: 'Figma node', changelog: 'Changelog', noChanges: 'No changes since the first version.',
    none: '—', copy: 'Copy', copied: 'Copied',
  },
};

const arr = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
const has = (x) => (Array.isArray(x) ? x.length > 0 : x != null && x !== '');
const anchor = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* ---------- piezas ---------- */

function Md({ children, inline }) {
  if (!has(children)) return null;
  if (inline) return <span className="hzd-md hzd-md--inline"><Markdown options={{ forceInline: true }}>{String(children)}</Markdown></span>;
  return <div className="hzd-md"><Markdown>{String(children)}</Markdown></div>;
}

function Section({ title, level = 2, children, id }) {
  const a = id || anchor(title);
  const H = `h${level}`;
  return (
    <section className={`hzd-section hzd-section--h${level}`} id={a}>
      <H className="hzd-h">
        <a className="hzd-h__anchor" href={`#${a}`} aria-label={`#${title}`}>#</a>
        {title}
      </H>
      {children}
    </section>
  );
}

function Bullets({ items }) {
  const xs = arr(items);
  if (!xs.length) return null;
  if (xs.length === 1 && typeof xs[0] === 'string' && xs[0].includes('\n')) return <Md>{xs[0]}</Md>;
  return (
    <ul className="hzd-list">
      {xs.map((x, i) => (
        <li key={i}>
          {typeof x === 'string' ? <Md>{x}</Md> : <Md>{`**${x.name || x.title}**${x.description ? ` — ${x.description}` : ''}`}</Md>}
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows }) {
  if (!rows.length) return null;
  return (
    <div className="hzd-table-wrap">
      <table className="hzd-table">
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const Code = ({ children }) => (has(children) ? <code className="hzd-code">{children}</code> : null);

function CopyLine({ text, t }) {
  const [done, setDone] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(text).then(() => { setDone(true); setTimeout(() => setDone(false), 1500); }); };
  return (
    <div className="hzd-copyline">
      <pre><code>{text}</code></pre>
      <button type="button" onClick={copy}>{done ? t.copied : t.copy}</button>
    </div>
  );
}

function Demo({ story, wide }) {
  if (!story) return null;
  return <div className={`hzd-demo${wide ? ' hzd-demo--wide' : ''}`}><Canvas of={story} sourceState="hidden" /></div>;
}

function DoDont({ usage, t }) {
  const u = usage || {};
  if (!has(u.do) && !has(u.dont)) return null;
  return (
    <div className="hzd-dodont">
      {has(u.do) && (
        <div className="hzd-dodont__card hzd-dodont__card--do">
          <div className="hzd-dodont__title">{t.do}</div>
          <ul>{arr(u.do).map((x, i) => <li key={i}><Md>{x}</Md></li>)}</ul>
        </div>
      )}
      {has(u.dont) && (
        <div className="hzd-dodont__card hzd-dodont__card--dont">
          <div className="hzd-dodont__title">{t.dont}</div>
          <ul>{arr(u.dont).map((x, i) => <li key={i}><Md>{x}</Md></li>)}</ul>
        </div>
      )}
    </div>
  );
}

/** Un eje de variante: explicación a la izquierda, todas las opciones juntas a la derecha (stacked en módulos). */
function Axis({ axis, stories, stacked }) {
  const opts = arr(axis.options).map((o) => (typeof o === 'string' ? { value: o } : o));
  const optionStories = opts.filter((o) => o.story && stories[o.story]);
  return (
    <div className={`hzd-axis${stacked ? ' hzd-axis--stacked' : ''}`} id={anchor(`axis-${axis.name}`)}>
      <div className="hzd-axis__text">
        <h3 className="hzd-h hzd-h--3">
          <a className="hzd-h__anchor" href={`#${anchor(`axis-${axis.name}`)}`} aria-label={`#${axis.name}`}>#</a>
          {axis.title || axis.name}
        </h3>
        <Md>{axis.description}</Md>
        {opts.some((o) => o.description) && (
          <ul className="hzd-list hzd-list--options">
            {opts.map((o) => (
              <li key={o.value}><Code>{o.value}</Code>{o.description ? <> — <Md inline>{o.description}</Md></> : null}</li>
            ))}
          </ul>
        )}
        {axis.prop && !opts.some((o) => o.description) && (
          <p className="hzd-muted"><Code>{axis.prop}</Code>: {opts.map((o) => o.value).join(' · ')}</p>
        )}
      </div>
      <div className="hzd-axis__demo">
        {axis.story && stories[axis.story] ? <Demo story={stories[axis.story]} /> : optionStories.map((o) => (
          <div key={o.value} className="hzd-axis__option">
            <div className="hzd-axis__label">{o.value}</div>
            <Demo story={stories[o.story]} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Compatibilidad: meta sin `axes` → variantes agrupadas por el primer valor del título (Type=Primary, …). */
function LegacyVariants({ variants, stories, stacked }) {
  const groups = new Map();
  for (const v of variants) {
    if (!stories[v.story]) continue;
    const title = v.title || v.story;
    const key = title.split(',')[0].trim();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ ...v, label: title.split(',').slice(1).join(',').trim() || title });
  }
  return [...groups.entries()].map(([key, vs]) => (
    <div key={key} className={`hzd-axis${stacked ? ' hzd-axis--stacked' : ''}`}>
      <div className="hzd-axis__text"><h3 className="hzd-h hzd-h--3">{key.replace(/^[^=]+=/, '')}</h3></div>
      <div className="hzd-axis__demo">
        {vs.map((v) => (
          <div key={v.story} className="hzd-axis__option">
            <div className="hzd-axis__label">{v.label}</div>
            <Demo story={stories[v.story]} />
          </div>
        ))}
      </div>
    </div>
  ));
}

/* ---------- pestañas ---------- */

function Overview({ m, stories, t }) {
  const wide = m.kind === 'module' || m.kind === 'template';
  const def = stories[m.defaultStory || 'Default'];
  const s = m.subthemes;
  const L = m.layout;
  return (
    <>
      <Section title={t.demo}><Demo story={def} wide={wide} /></Section>

      {(has(m.usage?.intro) || has(m.usage?.do) || has(m.usage?.dont)) && (
        <Section title={t.usage}><Md>{m.usage?.intro}</Md><DoDont usage={m.usage} t={t} /></Section>
      )}

      {has(m.anatomy) && <Section title={t.anatomy}><Bullets items={m.anatomy} /></Section>}

      {(has(m.axes) || has(m.variants)) && (
        <Section title={t.variants}>
          {has(m.axes)
            ? m.axes.map((a) => <Axis key={a.name} axis={a} stories={stories} stacked={wide || a.stacked} />)
            : <LegacyVariants variants={m.variants} stories={stories} stacked={wide} />}
        </Section>
      )}

      {L && (
        <Section title={t.layout}>
          {L.type && <p><strong>{t.type}:</strong> {L.type}</p>}
          <Md>{L.grid}</Md>
          <Table head={[t.variant, t.piece, t.columns]} rows={arr(L.columns).map((c) => [c.variant, c.piece, <Code>{c.columns}</Code>])} />
          {has(L.noColumns) && <p className="hzd-muted">{L.noColumns.join(', ')}: {t.noColumns}</p>}
        </Section>
      )}

      {has(m.behavior) && <Section title={t.behavior}><Bullets items={m.behavior} /></Section>}

      {s && (
        <Section title={t.themes}>
          <p><strong>{t.defaultTheme}:</strong> <Code>{s.default ?? 'inherit'}</Code></p>
          {has(s.supported) && <p><strong>{t.supported}:</strong> {s.supported.map((x) => <Code key={x}>{x}</Code>)}</p>}
          <Md>{s.notes}</Md>
        </Section>
      )}

      {has(m.content) && (
        <Section title={t.content}>
          <Table head={[t.field, t.max, t.notes]} rows={m.content.map((c) => [c.field, c.maxChars ? `${c.maxChars}` : '', c.notes || ''])} />
        </Section>
      )}

      {has(m.a11y) && <Section title={t.a11y}><Bullets items={m.a11y} /></Section>}

      {has(m.useCases) && (
        <Section title={t.useCases}>
          {m.useCases.map((u) => (
            <div key={u.title} className="hzd-axis hzd-axis--stacked">
              <div className="hzd-axis__text"><h3 className="hzd-h hzd-h--3">{u.title}</h3><Md>{u.description}</Md></div>
              {u.story && stories[u.story] && <div className="hzd-axis__demo"><Demo story={stories[u.story]} wide={wide} /></div>}
            </div>
          ))}
        </Section>
      )}

      {has(m.related) && <Section title={t.related}><Bullets items={m.related} /></Section>}

      {has(m.placeholders) && (
        <Section title={t.placeholders}><Bullets items={m.placeholders.map((p) => `**${p.what}** — ${p.why}`)} /></Section>
      )}
    </>
  );
}

function CodeTab({ m, stories, t, importLine, links }) {
  const def = stories[m.defaultStory || 'Default'];
  const tk = m.tokens || {};
  const axes = m.variantAxes || {};
  const tokenRows = Object.entries(tk).flatMap(([k, v]) => arr(v).map((x) => [k, <Code>{typeof x === 'string' ? x : x.token}</Code>, typeof x === 'string' ? '' : x.usage || '']));
  return (
    <>
      {importLine && <Section title={t.import}><CopyLine text={importLine} t={t} /></Section>}
      {has(m.props) && (
        <Section title={t.props}>
          <Table head={[t.name, t.ptype, t.def, t.desc]} rows={m.props.map((p) => [
            <Code>{p.name}</Code>,
            <span className="hzd-type">{propType({ ...p, options: p.options || axes[p.figma] || axes[p.name] })}</span>,
            p.default !== undefined && p.default !== '' ? <Code>{JSON.stringify(p.default)}</Code> : '',
            <><Md>{p.description}</Md>{p.figma ? <div className="hzd-muted">{t.figmaProp}: {p.figma}</div> : null}</>,
          ])} />
        </Section>
      )}
      {def && (
        <Section title={t.playground}>
          <p className="hzd-muted">{t.playgroundHint}</p>
          <Demo story={def} wide={m.kind === 'module' || m.kind === 'template'} />
          <div className="hzd-controls"><Controls of={def} /></div>
        </Section>
      )}
      {tokenRows.length > 0 && <Section title={t.tokens}><Table head={[t.ptype, 'Token', t.usageCol]} rows={tokenRows} /></Section>}
      <Section title={t.files}>
        <Table head={['', '']} rows={[
          m.codePath && [t.codePath, links?.code ? <a href={links.code} target="_blank" rel="noreferrer"><Code>{m.codePath}</Code></a> : <Code>{m.codePath}</Code>],
          m.figma?.nodeId && [t.figmaNode, links?.figma ? <a href={links.figma} target="_blank" rel="noreferrer"><Code>{`${m.figma.name || m.name} · ${m.figma.nodeId}`}</Code></a> : <Code>{m.figma.nodeId}</Code>],
        ].filter(Boolean)} />
      </Section>
    </>
  );
}

function ChangelogTab({ m, t }) {
  const log = arr(m.changelog);
  if (!log.length) return <p className="hzd-muted">{t.noChanges}</p>;
  return (
    <div className="hzd-changelog">
      {log.map((c, i) => (
        <div key={i} className="hzd-changelog__entry">
          <div className="hzd-changelog__meta">{c.version && <span className="hzd-badge">{c.version}</span>}<span>{c.date}</span></div>
          <Bullets items={c.changes} />
        </div>
      ))}
    </div>
  );
}

/* ---------- página ---------- */

export function DocPage({ meta: m, stories, links = {}, lang = 'es', importLine }) {
  const t = I18N[lang] || I18N.es;
  const [tab, setTab] = useState('overview');
  const tabs = ['overview', 'code', 'changelog'];
  const imp = importLine || m.import || (m.codePath ? `import ${m.name.replace(/[^A-Za-z0-9]/g, '')} from '@/${m.codePath.replace(/^src\//, '').replace(/\.(jsx|tsx|js|ts)$/, '')}';` : '');
  return (
    <Unstyled>
      <div className="hzd">
        <header className="hzd-header">
          <div className="hzd-header__top">
            <div>
              <div className="hzd-header__kind">{t.kind[m.kind] || m.kind || ''}</div>
              <h1 className="hzd-title">{m.title || m.name}</h1>
            </div>
            <div className="hzd-header__links">
              {links.figma && <a href={links.figma} target="_blank" rel="noreferrer">{t.figma} ↗</a>}
              {links.code && <a href={links.code} target="_blank" rel="noreferrer">{t.source} ↗</a>}
            </div>
          </div>
          <div className="hzd-lead"><Md>{m.description}</Md></div>
          <nav className="hzd-tabs" role="tablist">
            {tabs.map((k) => (
              <button key={k} type="button" role="tab" aria-selected={tab === k} className={`hzd-tab${tab === k ? ' is-active' : ''}`} onClick={() => setTab(k)}>
                {t.tabs[k]}{k === 'changelog' && has(m.changelog) ? <span className="hzd-tab__count">{arr(m.changelog).length}</span> : null}
              </button>
            ))}
          </nav>
        </header>
        <div className="hzd-body" role="tabpanel">
          {tab === 'overview' && <Overview m={m} stories={stories} t={t} />}
          {tab === 'code' && <CodeTab m={m} stories={stories} t={t} importLine={imp} links={links} />}
          {tab === 'changelog' && <ChangelogTab m={m} t={t} />}
        </div>
      </div>
    </Unstyled>
  );
}

/* ---------- Controls desde el meta.json ---------- */

function propType(p) {
  if (p.type) return p.type;
  if (has(p.options)) return p.options.map((o) => JSON.stringify(o)).join(' | ');
  if (p.control === 'boolean' || typeof p.default === 'boolean') return 'boolean';
  if (p.control === 'number' || typeof p.default === 'number') return 'number';
  if (p.control === 'text' || typeof p.default === 'string') return 'string';
  return p.control || '';
}

/**
 * argTypes de Storybook a partir de meta.props (+ meta.variantAxes para las opciones de los select).
 *   import meta from './Button.meta.json';
 *   export default { title: 'Components/Button', component: Button, argTypes: argTypesFromMeta(meta) };
 */
export function argTypesFromMeta(m, overrides = {}) {
  const axes = m.variantAxes || {};
  const base = Object.fromEntries(arr(m.props).map((p) => {
    const options = p.options || axes[p.figma] || axes[p.name] || null;
    const control = p.control === false ? false
      : p.control === 'json' ? 'object'
      : p.control || (options ? 'select' : typeof p.default === 'boolean' ? 'boolean' : typeof p.default === 'number' ? 'number' : 'text');
    return [p.name, {
      description: p.description || '',
      control: control === false ? false : (typeof control === 'string' ? { type: control } : control),
      ...(options ? { options } : {}),
      table: { type: { summary: propType({ ...p, options }) }, ...(p.default !== undefined ? { defaultValue: { summary: JSON.stringify(p.default) } } : {}) },
    }];
  }));
  // overrides: argTypes propios de las stories (control, options…) encima de lo que sale del meta,
  // sin perder la descripción ni el tipo del meta.
  for (const [k, o] of Object.entries(overrides || {})) {
    const b = base[k] || {};
    const control = typeof o.control === 'string' ? { type: o.control } : o.control;
    base[k] = { ...b, ...o, ...(o.control !== undefined ? { control } : {}), table: { ...(b.table || {}), ...(o.table || {}) } };
  }
  return base;
}
