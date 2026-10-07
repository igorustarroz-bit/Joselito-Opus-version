import M19CardGrid from './M19CardGrid';

import meta from './M19CardGrid.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M19-Card-Grid',
  component: M19CardGrid, argTypes: argTypesFromMeta(meta),
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { showTitle: true },
};

export const Default = {};
/** Device=Desktop: 3 columnas. */
export const Desktop = {};
/** Device=Mobile (ver con el viewport XS): una columna. */
export const Mobile = {};
/** Sin título. */
export const SinTitulo = { args: { showTitle: false } };
