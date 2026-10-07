import M26Buscador, { STATUSES } from './M26Buscador';

export default {
  title: 'Modules/M26-Buscador',
  component: M26Buscador,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { showRecent: true },
  argTypes: { status: { control: 'inline-radio', options: STATUSES } },
};

export const Default = {};
/** Status=Default (Desktop; Mobile con el viewport XS): campo vacío. Escribe para probarlo. */
export const Vacio = { args: { status: 'Default' } };
/** Status=Typing. */
export const Typing = { args: { status: 'Typing' } };
/** Status=Filled. */
export const Filled = { args: { status: 'Filled' } };
