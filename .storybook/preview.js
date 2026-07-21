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

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: breakpointViewports,
    },
    layout: 'padded',
  },
  initialGlobals: {
    viewport: { value: 'xs', isRotated: false },
  },
};

export default preview;
