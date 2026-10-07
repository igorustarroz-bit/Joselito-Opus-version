import M23CardsGallery, { TYPES } from './M23CardsGallery';

import meta from './M23CardsGallery.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M23-Cards-Gallery',
  component: M23CardsGallery,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { type: 'Carrousel', showTitle: true, showInstagram: true },
  argTypes: argTypesFromMeta(meta, { type: { control: 'inline-radio', options: TYPES } }),
};

export const Default = {};
/** Type=Carrousel · Leyenda=Yes (Desktop; Mobile con el viewport XS). Pulsa una tarjeta para abrir el visor. */
export const Carrousel = {};
/** Type=Carrousel - No text · Leyenda=No. */
export const CarrouselSinTexto = { args: { type: 'Carrousel - No text' } };
/** Type=Default: visor de la galería. */
export const Visor = { args: { type: 'Default' } };
