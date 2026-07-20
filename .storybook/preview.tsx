import type { Preview } from '@storybook/react-vite';
import '../src/styles/tailwind.css';

/*
  Selectores globales del proyecto (punto 16 de las instrucciones):
  - theme (modo)  -> se aplicará como [data-theme] cuando se lean las
    variables Semantic-Color de Figma y sus modos.
  - brand (marca) -> placeholder para multi-marca si aplica.
  - breakpoint    -> coincidirá con las variables responsive de Figma.
  Son placeholders: se completarán al implementar los tokens.
*/
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Modo / tema (data-theme)',
      toolbar: {
        title: 'Tema',
        icon: 'paintbrush',
        items: [{ value: 'light', title: 'Light' }],
        dynamicTitle: true,
      },
    },
    breakpoint: {
      description: 'Breakpoint responsive (variables Figma)',
      toolbar: {
        title: 'Breakpoint',
        icon: 'mobile',
        items: [{ value: 'auto', title: 'Auto' }],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    breakpoint: 'auto',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      return <Story />;
    },
  ],
};

export default preview;
