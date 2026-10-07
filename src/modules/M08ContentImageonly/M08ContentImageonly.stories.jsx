import M08ContentImageonly, { TYPES } from './M08ContentImageonly';

import meta from './M08ContentImageonly.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M08-Content-Imageonly',
  component: M08ContentImageonly,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { type: 'Full Screen' },
  argTypes: argTypesFromMeta(meta, { type: { control: 'inline-radio', options: TYPES } }),
};

export const Default = {};
/** Type=Full Screen (Desktop 16:9 · Mobile 9:16: ver con el viewport XS). */
export const FullScreen = {};
/** Type=Borders: con márgenes del wrapper. */
export const Borders = { args: { type: 'Borders' } };
/** Type=Split: dos imágenes 3:4 en media pantalla. */
export const Split = { args: { type: 'Split' } };
