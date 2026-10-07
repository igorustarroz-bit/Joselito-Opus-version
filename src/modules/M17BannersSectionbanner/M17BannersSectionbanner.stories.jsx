import M17BannersSectionbanner, { STATUSES, TYPES } from './M17BannersSectionbanner';

import meta from './M17BannersSectionbanner.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M17-Banners-Sectionbanner',
  component: M17BannersSectionbanner,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { type: 'Borders', showLabel: true, showBody: true, showPretitle: false },
  argTypes: argTypesFromMeta(meta, { type: { control: 'inline-radio', options: TYPES }, status: { control: 'inline-radio', options: STATUSES } }),
};

export const Default = {};
/** Type=Borders (Desktop: tarjeta sobre la imagen · Mobile: tarjeta y debajo la imagen). */
export const Borders = {};
/** Type=Full Screen: imagen a sangre con texto al pie. */
export const FullScreen = { args: { type: 'Full Screen' } };
/** Type=Animated - Product · Status=Static: imagen enmarcada, sin texto. */
export const ProductStatic = { args: { type: 'Animated - Product', status: 'Static' } };
/** Type=Animated - Product · Status=Animated: a sangre con producto, etiquetas y precio. */
export const ProductAnimated = { args: { type: 'Animated - Product', status: 'Animated' } };
/** Uso real: se expande al entrar en pantalla (animateOnView). */
export const ProductOnView = { args: { type: 'Animated - Product', animateOnView: true } };
