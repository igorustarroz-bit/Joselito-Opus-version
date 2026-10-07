import M07ContentTextImage, { FORMATS, TYPES } from './M07ContentTextImage';

const HALF = { title: 'En Joselito solo hacemos productos 100% naturales',
  text: 'Productos procedentes de cerdos criados en libertad y alimentados de manera natural, su consumo es bueno para el corazón. Su alto contenido de ácido oleico en los jamones Joselito permite reducir el colesterol y los triglicéridos. Todo ello convierte al jamón Joselito en un lujo gastronómico que también puede formar parte de una dieta equilibrada.',
  note: '(Mayoral, P. et al. The Journal of nutrition, health and aging 2003; 7(2): 84-89.)' };

export default {
  title: 'Modules/M07-Content-Text+Image',
  component: M07ContentTextImage,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { type: 'Left', imageFormat: 'Horizontal' },
  argTypes: { type: { control: 'inline-radio', options: TYPES }, imageFormat: { control: 'inline-radio', options: FORMATS } },
};

export const Default = {};
/** Type=Left · Image Format=Horizontal (Desktop y Mobile: ver con el viewport XS). */
export const LeftHorizontal = {};
export const RightHorizontal = { args: { type: 'Right' } };
export const LeftVertical = { args: { imageFormat: 'Vertical' } };
export const RightVertical = { args: { type: 'Right', imageFormat: 'Vertical' } };
/** Type=Half-Left · Image Format=Vertical: imagen a sangre en media pantalla, con nota y separador. */
export const HalfLeft = { args: { type: 'Half-Left', ...HALF } };
export const HalfRight = { args: { type: 'Half-Right', ...HALF } };
