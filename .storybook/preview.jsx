import '../src/index.css';
import './grid-overlay.css';
import meta from '../src/tokens/tokens.meta.json';
import { hanzoTheme } from './theme';

// Viewports = breakpoints de la colección responsive de Figma (tokens.meta.json, regenerado con npm run tokens).
// Se muestran en el ancho del frame de Figma (buen punto de muestra); los @media empiezan en el inicio de rango (b.min).
const viewports = Object.fromEntries((meta.breakpoints || []).map((b) => [b.name, {
  name: `${b.label}${b.min != null ? ` (desde ${b.min}px)` : ''}`, styles: { width: `${b.width}px`, height: b.width < 768 ? '844px' : '900px' }, type: b.width < 768 ? 'mobile' : b.width < 1200 ? 'tablet' : 'desktop',
}]));

// Subtemas = modos de la colección de tema (data-theme). "auto" = el default del elemento
// (parameters.defaultTheme) — NO usar globals por story: bloquearía el toolbar.
const themes = { auto: 'Auto (default del elemento)', ...Object.fromEntries((meta.themes || []).map((t) => [t.slug, t.name])) };

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    viewport: { options: viewports },
    layout: 'padded',
    backgrounds: { disable: true },
    // Doc de cada elemento = <DocPage> con pestañas (src/docs/DocKit.jsx): sin TOC lateral de Storybook.
    docs: { toc: false, theme: hanzoTheme },
    // Barra lateral, SIEMPRE: Welcome › Foundations (Tokens primero) › Brand Assets › Components › Modules ›
    // Templates › resto; dentro de cada grupo, alfabético; dentro de cada elemento: Doc, Default y las demás
    // stories en el orden del fichero. (Función autocontenida: Storybook la serializa, no uses nada de fuera.)
    options: {
      storySort: (a, b) => {
        const ORDER = ['welcome', 'foundations', 'brand assets', 'components', 'modules', 'templates'];
        const top = (e) => { const i = ORDER.indexOf(e.title.split('/')[0].trim().toLowerCase()); return i < 0 ? ORDER.length : i; };
        if (top(a) !== top(b)) return top(a) - top(b);
        if (a.title !== b.title) {
          // Foundations: primero las páginas de tokens en este orden, luego el resto alfabético
          const FOUND = ['colores', 'tipografía', 'espaciados y radios', 'efectos', 'breakpoints y rejilla'];
          const tok = (e) => { const i = FOUND.indexOf((e.title.split('/')[1] || '').trim().toLowerCase()); return i < 0 ? FOUND.length : i; };
          return tok(a) - tok(b) || a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' });
        }
        const rank = (e) => (e.type === 'docs' ? 0 : e.name === 'Default' ? 1 : 2);
        return rank(a) - rank(b);
      },
    },
  },
  initialGlobals: { theme: 'auto', grid: 'off' },
  globalTypes: {
    theme: {
      description: 'Subtema',
      toolbar: { title: 'Subtema', icon: 'paintbrush', items: Object.entries(themes).map(([value, title]) => ({ value, title })), dynamicTitle: true },
    },
    // Superposición de columnas: sin toolbar aquí (sería un desplegable). El botón de icono (toggle)
    // vive en .storybook/manager.js. Para capturas: iframe.html?id=<story>&globals=grid:on
    grid: { description: 'Columnas de la rejilla (on/off)' },
  },
  decorators: [
    (Story, context) => {
      const toolbar = context.globals.theme;
      const fallback = context.parameters.defaultTheme || meta.defaultTheme;
      const effective = !toolbar || toolbar === 'auto' ? fallback : toolbar;
      const fullscreen = context.parameters.layout === 'fullscreen';
      // Contenedor (container-type) + [data-grid-scope]: las columnas elásticas (--grid-width) miden el
      // ancho real del lienzo (sin barra de scroll y también en las páginas Doc, más estrechas).
      return (
        <div style={{ containerType: 'inline-size' }}>
          <div data-grid-scope data-theme={effective || undefined} className="hz-story"
            data-layout={fullscreen ? 'fullscreen' : 'padded'}
            style={{ background: 'var(--backgrounds-base)', color: 'var(--texts-base)', padding: fullscreen ? 0 : 16, minHeight: '100%' }}>
            <Story />
            {context.globals.grid === 'on' && (
              <div className="wrapper grid-12 hz-grid-overlay" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
              </div>
            )}
          </div>
        </div>
      );
    },
  ],
};
export default preview;
