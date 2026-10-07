import M30HeroJoselitoLab from './M30HeroJoselitoLab';

import meta from './M30HeroJoselitoLab.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M30-Hero-Joselito-Lab',
  component: M30HeroJoselitoLab, argTypes: argTypesFromMeta(meta),
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
};

export const Default = {};
/** Device=Desktop: retícula de 7 columnas. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS): retícula de 3 columnas. */
export const Mobile = {};
