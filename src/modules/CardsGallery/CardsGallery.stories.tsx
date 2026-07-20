import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardsGallery } from './CardsGallery';

const img = (c1: string, c2: string) => <div style={{ width:'100%', height:'100%', background:`linear-gradient(135deg,${c1},${c2})` }} />;
const items = [
  { image: img('#481815','#e23f36'), caption: 'La dehesa' },
  { image: img('#89906f','#dcded4'), caption: 'Montanera' },
  { image: img('#260200','#cc0a00'), caption: 'Bodega de curación' },
  { image: img('#e23f36','#ffcfcc'), caption: 'Corte artesanal' },
  { image: img('#373a2c','#9ba084'), caption: 'Encina y bellota' },
  { image: img('#7a5706','#f9d999'), caption: 'Producto final' },
];

const meta = {
  title: 'Módulos/CardsGallery',
  component: CardsGallery,
  parameters: { layout: 'fullscreen' },
  argTypes: { columns: { control: 'inline-radio', options: [2,3,4] } },
  args: { heading: 'Galería', items, columns: 3 },
} satisfies Meta<typeof CardsGallery>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
