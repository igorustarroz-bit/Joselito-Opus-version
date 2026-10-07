import M25CardsLinks, { TYPES } from './M25CardsLinks';

export default {
  title: 'Modules/M25-Cards-Links',
  component: M25CardsLinks,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { type: 'Many', showTitle: true },
  argTypes: { type: { control: 'inline-radio', options: TYPES } },
};

export const Default = {};
/** Type=Many: fila desplazable (Desktop; Mobile con el viewport XS). */
export const Many = {};
/** Type=One: una tarjeta a todo el ancho. */
export const One = { args: { type: 'One' } };
