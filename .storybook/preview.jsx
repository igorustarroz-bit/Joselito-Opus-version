import '../src/index.css';
import './grid-overlay.css';
import meta from '../src/tokens/tokens.meta.json';

// Viewports = breakpoints de la colección responsive de Figma (tokens.meta.json, regenerado con npm run tokens)
const viewports = Object.fromEntries((meta.breakpoints || []).map((b) => [b.name, {
  name: b.label, styles: { width: `${b.width}px`, height: b.width < 768 ? '844px' : '900px' }, type: b.width < 768 ? 'mobile' : b.width < 1200 ? 'tablet' : 'desktop',
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
    docs: { toc: true },
  },
  initialGlobals: { theme: 'auto', grid: 'off' },
  globalTypes: {
    grid: {
      description: 'Superponer las columnas del sistema (grid styles de Figma)',
      toolbar: { title: 'Columnas', icon: 'grid', items: [{ value: 'off', title: 'Columnas: ocultas' }, { value: 'on', title: 'Columnas: visibles' }], dynamicTitle: true },
    },
    theme: {
      description: 'Subtema',
      toolbar: { title: 'Subtema', icon: 'paintbrush', items: Object.entries(themes).map(([value, title]) => ({ value, title })), dynamicTitle: true },
    },
  },
  decorators: [
    (Story, context) => {
      const toolbar = context.globals.theme;
      const fallback = context.parameters.defaultTheme || meta.defaultTheme;
      const effective = !toolbar || toolbar === 'auto' ? fallback : toolbar;
      // Contenedor + [data-grid-scope]: las columnas elásticas se calculan con el ancho real del lienzo
      // (sin barra de scroll y también en las páginas Doc, donde el lienzo es más estrecho que la ventana).
      return (
        <div style={{ containerType: 'inline-size', minHeight: '100%' }}>
          <div data-grid-scope="" data-theme={effective || undefined} style={{ position: 'relative', background: 'var(--backgrounds-base)', color: 'var(--texts-base)', padding: context.parameters.layout === 'fullscreen' ? 0 : 16, minHeight: '100%' }}>
            <Story />
            {context.globals.grid === 'on' && (
              <div aria-hidden="true" className="sb-grid-overlay">
                <div className="wrapper grid-12">{Array.from({ length: 12 }, (_, i) => <span key={i} />)}</div>
              </div>
            )}
          </div>
        </div>
      );
    },
  ],
};
export default preview;
