import CardProduct from './CardProduct';
import photo from '../../assets/images/card-product.webp';

export default {
  title: 'Components/Card Product',
  component: CardProduct,
  parameters: { defaultTheme: 'light-white' },
  args: { type: 'Vertical', image: photo, imageAlt: 'Jamón Gran Reserva', title: 'Jamón Gran Reserva', price: '380€', data: '1.2kg',
    showDatas: true, showPrice: true, showData: false, showLabel: false, showQuickCTA: false, showQuantity: false, showButton: true },
  argTypes: { type: { control: 'inline-radio', options: ['Vertical', 'Horizontal'] }, image: { control: false } },
  decorators: [(Story, ctx) => <div style={{ width: ctx.args.type === 'Horizontal' ? 463 : 342, maxWidth: '100%' }}><Story /></div>],
};

export const Default = {};
/** Device=Desktop, Type=Vertical (342 px de ancho en Figma). */
export const DesktopVertical = {};
/** Device=Mobile, Type=Vertical (234 px). */
export const MobileVertical = { decorators: [(Story) => <div style={{ width: 234 }}><Story /></div>] };
/** Device=Desktop, Type=Horizontal (foto de 140 px). */
export const DesktopHorizontal = { args: { type: 'Horizontal' } };
/** Device=Mobile, Type=Horizontal (separación FX-6 por debajo de 481 px). */
export const MobileHorizontal = { args: { type: 'Horizontal' } };
/** Todas las opciones activadas: etiqueta, CTA rápido, precio + peso y cantidad. */
export const Completa = { args: { showLabel: true, showQuickCTA: true, showData: true, showQuantity: true } };
