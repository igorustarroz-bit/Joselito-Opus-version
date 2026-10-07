import M18BannersFullScreenSlider, { KINDS } from './M18BannersFullScreenSlider';

import meta from './M18BannersFullScreenSlider.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M18-Banners-Full Screen Slider',
  component: M18BannersFullScreenSlider,
  parameters: { layout: 'fullscreen' },
  args: { kind: 'Producto' },
  argTypes: argTypesFromMeta(meta, { kind: { control: 'inline-radio', options: KINDS }, index: { control: 'number' } }),
};

export const Default = {};
/** Type=Producto 1 (pulsa la palabra de la derecha o usa las flechas para pasar a Producto 2). */
export const Producto1 = {};
export const Producto2 = { args: { start: 2 } };
/** Type=Origen 1 / Origen 2: generaciones por año. */
export const Origen1 = { args: { kind: 'Origen' } };
export const Origen2 = { args: { kind: 'Origen', start: 3 } };
/** Type=Añadas 1 / Añadas 2. */
export const Anadas1 = { args: { kind: 'Añadas' } };
export const Anadas2 = { args: { kind: 'Añadas', start: 3 } };
/** Type=Perfil Sensorial: versión clara con contador. */
export const PerfilSensorial = { args: { kind: 'Perfil Sensorial' } };
