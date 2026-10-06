import '../src/index.css';
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
  initialGlobals: { theme: 'auto' },
  globalTypes: {
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
      return (
        <div data-theme={effective || undefined} style={{ background: 'var(--backgrounds-base)', color: 'var(--texts-base)', padding: 16, minHeight: '100%' }}>
          <Story />
        </div>
      );
    },
  ],
};
export default preview;
