import M32ListArchiveList from './M32ListArchiveList';

import meta from './M32ListArchiveList.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Modules/M32-List-ArchiveList',
  component: M32ListArchiveList,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  argTypes: argTypesFromMeta(meta, { items: { control: 'object' }, images: { control: 'object' } }),
};

export const Default = {};
/** Property 1=Desktop: lista centrada con fotos del elemento activo. Pasa el ratón para cambiar el activo. */
export const Desktop = {};
/** Property 1=Mobile (ver con el viewport XS): lista apilada con separadores. */
export const Mobile = {};
