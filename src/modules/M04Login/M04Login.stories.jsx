import M04Login from './M04Login';

import meta from './M04Login.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M04-Login',
  component: M04Login, argTypes: argTypesFromMeta(meta),
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { showPhoto: true },
};

export const Default = {};
/** Device=Desktop (desde 960 px): medio a la izquierda y formulario a la derecha. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS): solo formulario. */
export const Mobile = {};
