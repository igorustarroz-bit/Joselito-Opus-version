import M29UserProfile from './M29UserProfile';

export default {
  title: 'Modules/M29-User-Profile',
  component: M29UserProfile,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { selected: 'Pedidos' },
};

export const Default = {};
/** Device=Desktop: menú lateral y contenido. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS): menú en desplegable M06. */
export const Mobile = {};
