import M13HeroHomepagehero from './M13HeroHomepagehero';

import meta from './M13HeroHomepagehero.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M13-Hero-Homepagehero',
  component: M13HeroHomepagehero, argTypes: argTypesFromMeta(meta),
  parameters: { layout: 'fullscreen', defaultTheme: 'dark-black-neutral' },
  args: { showToast: true },
};

export const Default = {};
/** Device=Desktop (con Toast): titular centrado, Toast abajo a la derecha. */
export const Desktop = {};
/** Device=Device4 (escritorio sin Toast): titular al pie. */
export const DesktopNoToast = { args: { showToast: false } };
/** Device=Device5 (móvil con Toast; ver con el viewport XS). */
export const MobileToast = {};
/** Device=Mobile (sin Toast). */
export const Mobile = { args: { showToast: false, label: 'EL LUJO DEL TIEMPO' } };
