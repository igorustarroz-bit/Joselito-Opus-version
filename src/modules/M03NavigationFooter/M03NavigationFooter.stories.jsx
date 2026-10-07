import M03NavigationFooter from './M03NavigationFooter';

import meta from './M03NavigationFooter.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M03-Navigation-Footer',
  component: M03NavigationFooter, argTypes: argTypesFromMeta(meta),
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
};

export const Default = {};
/** Device=Desktop (desde 960 px): columnas de enlaces, newsletter, barra legal y sellos. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS): secciones en acordeón. */
export const Mobile = {};
