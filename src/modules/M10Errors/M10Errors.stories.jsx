import M10Errors, { TYPES } from './M10Errors';

export default {
  title: 'Modules/M10-Errors',
  component: M10Errors,
  parameters: { layout: 'fullscreen', defaultTheme: 'dark-black-neutral' },
  args: { type: '404' },
  argTypes: { type: { control: 'inline-radio', options: TYPES } },
};

export const Default = {};
/** Device=Desktop (desde 960 px). */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS). */
export const Mobile = {};
/** Variante solo de código: error 500 con la ilustración cuadrada. */
export const Error500 = { args: { type: '500', title: 'Algo ha fallado.', description: 'Estamos trabajando para solucionarlo. Inténtalo de nuevo en unos minutos.' } };
