import AspectRatio, { SIZES } from './AspectRatio';
// Foto del máster de Figma (imageHash 99ad7255…), de maps/images.json
import sample from '../../assets/images/aspect-ratio.webp';

// Muestra de 320 px de ancho, como en el máster de Figma (el componente ocupa el 100% de su contenedor).
const Sample = ({ children, height }) => <div style={{ width: 320, height }}>{children}</div>;

export default {
  title: 'Foundations/Aspect Ratio',
  component: AspectRatio,
  args: { size: '16:9', src: sample, alt: 'Cerdo ibérico en la dehesa' },
  argTypes: { size: { control: 'select', options: SIZES } },
  render: (args) => (
    <Sample height={args.size === 'Fill' ? 115 : undefined}>
      <AspectRatio {...args} />
    </Sample>
  ),
};

export const Default = {};
export const Ratio16x9 = { args: { size: '16:9' } };
export const Ratio9x16 = { args: { size: '9:16' } };
export const Ratio4x3 = { args: { size: '4:3' } };
export const Ratio3x4 = { args: { size: '3:4' } };
export const Ratio3x2 = { args: { size: '3:2' } };
export const Ratio2x3 = { args: { size: '2:3' } };
export const Ratio1x1 = { args: { size: '1:1' } };
export const Fill = { args: { size: 'Fill' } };
