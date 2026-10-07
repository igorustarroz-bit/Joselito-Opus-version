import M25CardsLinks, { TYPES } from './M25CardsLinks';

import meta from './M25CardsLinks.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M25-Cards-Links',
  component: M25CardsLinks,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { type: 'Many', showTitle: true },
  argTypes: argTypesFromMeta(meta, { type: { control: 'inline-radio', options: TYPES } }),
};

export const Default = {};
/** Type=Many: fila desplazable (Desktop; Mobile con el viewport XS). */
export const Many = {};
/** Type=One: una tarjeta a todo el ancho. */
export const One = { args: { type: 'One' } };
