import M20List from './M20List';

export default {
  title: 'Modules/M20-List',
  component: M20List,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { showTitle: true, showExtraItem: false },
};

export const Default = {};
/** Property 1=Desktop: bloques en fila. */
export const Desktop = {};
/** Property 1=Mobile (ver con el viewport XS): bloques en columna. */
export const Mobile = {};
/** -> Extra Item: cuarto bloque. */
export const ConExtra = { args: { showExtraItem: true } };
