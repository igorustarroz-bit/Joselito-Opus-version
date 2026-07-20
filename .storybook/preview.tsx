import type { Preview, Decorator } from '@storybook/react-vite';
import '../src/styles/tailwind.css';
import { breakpoints } from '../src/tokens/breakpoints';
import { themes } from '../src/tokens/colors';

/*
  Selectores globales del proyecto (punto 16 de las instrucciones):
  - theme (modo)  -> [data-theme] (se completará con Semantic-Color)
  - breakpoint    -> coincide con los breakpoints de Figma (colección Responsive)
*/

const breakpointItems = [
  { value: 'auto', title: 'Auto (100%)' },
  ...breakpoints.map((b) => ({ value: b.name, title: `${b.label} · ${b.min}px` })),
];

const withBreakpoint: Decorator = (Story, context) => {
  const bpName = context.globals.breakpoint ?? 'auto';
  const bp = breakpoints.find((b) => b.name === bpName);

  if (!bp) return <Story />;

  // Encuadra la story al ancho del breakpoint seleccionado
  return (
    <div
      style={{
        width: bp.min,
        maxWidth: '100%',
        margin: '0 auto',
        outline: '1px dashed color-mix(in srgb, currentColor 25%, transparent)',
        outlineOffset: 8,
        position: 'relative',
      }}
      data-breakpoint={bp.name}
    >
      <span
        style={{
          position: 'absolute',
          top: -22,
          right: 0,
          fontSize: 11,
          fontFamily: 'ui-monospace, monospace',
          opacity: 0.6,
        }}
      >
        {bp.label} · {bp.min}px
      </span>
      <Story />
    </div>
  );
};

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
        items: themes.map((t) => ({ value: t.slug, title: t.label })),
        dynamicTitle: true,
      },
    },
    breakpoint: {
      description: 'Breakpoint responsive (Figma · colección Responsive)',
      toolbar: {
        title: 'Breakpoint',
        icon: 'mobile',
        items: breakpointItems,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light-white',
    breakpoint: 'auto',
  },
  decorators: [
    withBreakpoint,
    (Story, context) => {
      const theme = context.globals.theme ?? 'light-white';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      return <Story />;
    },
  ],
};

export default preview;
