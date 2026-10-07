import M32ListArchiveList from './M32ListArchiveList';

export default {
  title: 'Modules/M32-List-ArchiveList',
  component: M32ListArchiveList,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  argTypes: { items: { control: 'object' }, images: { control: 'object' } },
};

export const Default = {};
/** Property 1=Desktop: lista centrada con fotos del elemento activo. Pasa el ratón para cambiar el activo. */
export const Desktop = {};
/** Property 1=Mobile (ver con el viewport XS): lista apilada con separadores. */
export const Mobile = {};
