import M38ScrolledBigText from './M38ScrolledBigText';

import meta from './M38ScrolledBigText.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M38-scrolled-big-text',
  component: M38ScrolledBigText,
  parameters: { layout: 'fullscreen', defaultTheme: 'dark-black-neutral' },
  argTypes: argTypesFromMeta(meta),
};

export const Default = {};
/** Device=desktop (desde 960 px): haz scroll — la foto de fondo queda fija y el módulo pasa por encima (mínimo 1200 px). */
export const Desktop = {};
/** Device=mobile (ver con el viewport XS): el titular se desliza hacia la izquierda. */
export const Mobile = {};
/** Sin animación (como con prefers-reduced-motion): titular móvil recortado. */
export const Static = { args: { scrub: false }, name: 'Sin animación' };
