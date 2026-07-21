import '../src/index.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Layout por defecto: las cajas de demo NO llevan altura fija, dependen del contenido.
    layout: 'padded',
  },
};

export default preview;
