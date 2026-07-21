import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';

const img = <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#260200,#481815)' }} />;
const items = [
  { label: 'Todos los productos' }, { label: 'Jamones Gran Reserva' }, { label: 'Paletas Gran Reserva', active: true },
  { label: 'Embutidos y Elaborados' }, { label: 'Loncheados' }, { label: 'Carne Fresca Joselito Nude' },
  { label: 'Regalos y Selecciones Especiales' }, { label: 'Añadas y Ediciones Limitadas' }, { label: 'Colecciones Premium' }, { label: 'Accesorios' },
];
const promo = { title: 'Regalos y Selecciones Especiales', description: 'Un regalo especial para disfrutar de la tradición, el sabor y la calidad de Joselito en cualquier ocasión.', linkLabel: 'Descubre más' };

const meta = {
  title: 'Módulos/Menu',
  component: Menu,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: { open: true, items, image: img, promo, theme: 'light-white' },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
