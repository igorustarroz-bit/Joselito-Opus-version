import M24CardsProductcarousel from './M24CardsProductcarousel';

import meta from './M24CardsProductcarousel.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M24-Cards-Productcarousel',
  component: M24CardsProductcarousel, argTypes: argTypesFromMeta(meta),
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { showTitle: true },
};

export const Default = {};
/** Device=Desktop: tarjetas de 4 columnas, desplazable en horizontal. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS): tarjetas de 5 columnas. */
export const Mobile = {};
