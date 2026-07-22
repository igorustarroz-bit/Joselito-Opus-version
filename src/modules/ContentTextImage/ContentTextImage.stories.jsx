import ContentTextImage from './ContentTextImage.jsx';

const meta = {
  title: 'Módulos/Content · Text + Image',
  component: ContentTextImage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

const footnote = '(Mayoral, P. et al. The Journal of nutrition, health and aging 2003; 7;2: 84-89.)';

/** Half — imagen a media página + panel de texto amplio con nota al pie. */
export const Half = { args: { type: 'half', footnote }, parameters: { viewport: { value: 'xl' } } };

/** Left — imagen a la izquierda del texto. */
export const Left = {
  args: { type: 'left', title: 'Declarado el mejor jamón del mundo', text: 'Apasionados por la perfección en cada detalle del proceso: desde la cría del cerdo en libertad hasta la curación natural en bodegas centenarias.' },
  parameters: { viewport: { value: 'xl' } },
};

/** Right — imagen a la derecha del texto. */
export const Right = {
  args: { type: 'right', title: 'Declarado el mejor jamón del mundo', text: 'Apasionados por la perfección en cada detalle del proceso: desde la cría del cerdo en libertad hasta la curación natural en bodegas centenarias.' },
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile — variante Half apilada. */
export const HalfMobile = { name: 'Half (mobile)', args: { type: 'half', footnote }, parameters: { viewport: { value: 'xs' } } };
