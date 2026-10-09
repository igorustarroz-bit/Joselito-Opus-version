import M36ContentDoblePhoto from './M36ContentDoblePhoto';

import meta from './M36ContentDoblePhoto.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M36-content doble photo',
  component: M36ContentDoblePhoto,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  argTypes: argTypesFromMeta(meta),
};

export const Default = {};
/** Device=desktop (desde 960 px): rejilla de 12 columnas. */
export const Desktop = {};
/** Device=mobile (ver con el viewport XS): apilado; foto horizontal a 2/3 a sangre abajo a la derecha. */
export const Mobile = {};
