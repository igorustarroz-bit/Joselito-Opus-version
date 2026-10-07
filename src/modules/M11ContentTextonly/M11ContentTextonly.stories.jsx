import M11ContentTextonly, { VARIANTS } from './M11ContentTextonly';

const SHORT = 'Apasionados por la perfección en cada detalle del proceso: desde la cría del cerdo en libertad hasta la curación natural en bodegas centenarias. Joselito no solo conserva un legado, lo eleva a la categoría de arte gastronómico, reconocido en los cinco continentes.';

export default {
  title: 'Modules/M11-Content-Textonly',
  component: M11ContentTextonly,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { variant: '2-column', showLabel: true, showTitle: true, showBoxTitle: true },
  argTypes: { variant: { control: 'inline-radio', options: VARIANTS }, showSlot2: { control: 'boolean' } },
};

export const Default = {};
/** Variant=2-column (Desktop) · en móvil (Variant=All) todo va en una columna. */
export const TwoColumn = {};
/** Variant=split: título a la izquierda y texto a la derecha. */
export const Split = { args: { variant: 'split', body: 'Lorem ipsum dolor sit amet consectetur. Leo proin nisi in neque hendrerit. Egestas nulla tortor pulvinar eget malesuada diam. Aenean auctor elementum gravida sit odio et eu. Sed sit diam nibh arcu facilisis nunc orci hac in. Dictum cras id erat sollicitudin pellentesque velit adipiscing diam. Purus tellus urna netus nulla duis.' } };
/** Variant=1-Left-Column. */
export const LeftColumn = { args: { variant: '1-Left-Column', body: SHORT } };
/** Variant=1-Center-Column. */
export const CenterColumn = { args: { variant: '1-Center-Column', body: SHORT } };
