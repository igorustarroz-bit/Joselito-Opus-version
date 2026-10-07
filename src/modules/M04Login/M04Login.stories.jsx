import M04Login from './M04Login';

export default {
  title: 'Modules/M04-Login',
  component: M04Login,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { showPhoto: true },
};

export const Default = {};
/** Device=Desktop (desde 1024 px): medio a la izquierda y formulario a la derecha. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS): solo formulario. */
export const Mobile = {};
