import M02Menu, { TYPES } from './M02Menu';

export default {
  title: 'Modules/M02-Menu',
  component: M02Menu,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { type: 'Product', showPhoto: true },
  argTypes: { type: { control: 'inline-radio', options: TYPES } },
};

export const Default = {};
/** Device=Desktop (desde 1024 px) · Type=Product: lista de categorías, foto y destacado. */
export const DesktopProduct = {};
/** Device=Desktop · Type=About: fila de cuatro fotos con título. */
export const DesktopAbout = { args: { type: 'About' } };
/** Device=Mobile (ver con el viewport XS) · Type=Collapsed: todas las secciones cerradas. */
export const MobileCollapsed = { args: { type: 'Collapsed' } };
/** Device=Mobile · Type=Product: Productos abierto con enlaces y destacado. */
export const MobileProduct = { args: { type: 'Product' } };
/** Device=Mobile · Type=About: Excelencia abierto con fotos. */
export const MobileAbout = { args: { type: 'About' } };
