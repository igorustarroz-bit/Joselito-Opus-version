import M16HeroProductdetail, { TYPES } from './M16HeroProductdetail';

import meta from './M16HeroProductdetail.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M16-Hero-Productdetail',
  component: M16HeroProductdetail,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { type: 'Producto', showCol2: true, showCol3: true, showCol4: true },
  argTypes: argTypesFromMeta(meta, { type: { control: 'inline-radio', options: TYPES } }),
};

export const Default = {};
/** Type=Producto (Desktop; Mobile con el viewport XS): galería con miniaturas, datos y compra. */
export const Producto = {};
/** Type=Receta: tres botones y autor. */
export const Receta = { args: { type: 'Receta' } };
