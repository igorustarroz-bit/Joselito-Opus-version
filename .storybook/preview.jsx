import '../src/index.css';

// Viewports = breakpoints de Figma/Tailwind (colección Responsive).
const breakpointViewports = {
  xs: { name: 'XS - 390', styles: { width: '390px', height: '844px' }, type: 'mobile' },
  sm: { name: 'SM - 480', styles: { width: '480px', height: '900px' }, type: 'mobile' },
  md: { name: 'M - 768', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
  lg: { name: 'LG - 1024', styles: { width: '1024px', height: '768px' }, type: 'tablet' },
  xl: { name: 'XL - 1440', styles: { width: '1440px', height: '900px' }, type: 'desktop' },
  xxl: { name: 'XXL - 1620', styles: { width: '1620px', height: '1000px' }, type: 'desktop' },
  xxxl: { name: 'XXXL - 1920', styles: { width: '1920px', height: '1080px' }, type: 'desktop' },
};

// Subtemas = modos de la colección Semantic-Color (data-theme).
// "auto" = usar el default del módulo (parameters.defaultTheme); el resto fuerzan
// ese subtema (incluido "default" = Light-White).
const themes = {
  'auto': 'Auto (default del módulo)',
  'default': 'Light - White',
  'light-grey': 'Light - Grey',
  'dark-red-primary': 'Dark - Red - Primary',
  'dark-black-neutral': 'Dark - Black - Neutral',
  'light-yellow': 'Light - Yellow',
};

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    viewport: { options: breakpointViewports },
    layout: 'padded',
    backgrounds: { disable: true },
  },
  initialGlobals: {
    viewport: { value: 'xs', isRotated: false },
    theme: 'auto',
  },
  globalTypes: {
    theme: {
      description: 'Subtema (Semantic-Color)',
      toolbar: {
        title: 'Subtema',
        icon: 'paintbrush',
        items: Object.entries(themes).map(([value, title]) => ({ value, title })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // "auto" (valor inicial) → usa el default del módulo (parameters.defaultTheme,
      // o Light-White si no hay). Cualquier otro valor del toolbar fuerza ese
      // subtema, incluido "default" (= Light-White). Así el dropdown cambia el
      // módulo con normalidad y cada uno abre en su default.
      const toolbar = context.globals.theme;
      const fallback = context.parameters.defaultTheme || 'default';
      const effective = !toolbar || toolbar === 'auto' ? fallback : toolbar;
      return (
        <div
          data-theme={effective === 'default' ? undefined : effective}
          style={{ background: 'var(--bg-base)', color: 'var(--text-base)', padding: 16, minHeight: '100%' }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
