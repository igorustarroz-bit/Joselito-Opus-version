import M15HeroSectionhero, { IMAGES, STATUSES } from './M15HeroSectionhero';

export default {
  title: 'Modules/M15-Hero-Sectionhero',
  component: M15HeroSectionhero,
  parameters: { layout: 'fullscreen' },
  args: { image: 'Horizontal', status: 'Default', showLink: true, showBody: false, showBack: false },
  argTypes: { image: { control: 'inline-radio', options: IMAGES }, status: { control: 'inline-radio', options: STATUSES } },
};

export const Default = {};
/** Image=Horizontal · Status=Default (Desktop; Mobile con el viewport XS). */
export const HorizontalDefault = {};
/** Image=Horizontal · Status=Scroll Down: medio a pantalla completa, subtema oscuro. */
export const HorizontalScrollDown = { args: { status: 'Scroll Down' } };
export const VerticalDefault = { args: { image: 'Vertical' } };
export const VerticalScrollDown = { args: { image: 'Vertical', status: 'Scroll Down' } };
/** Image=None - Producto: solo título. */
export const NoneProducto = { args: { image: 'None - Producto' } };
/** Image=None: etiqueta, título y enlace. */
export const None = { args: { image: 'None' } };
