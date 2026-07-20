import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';

const links = [{ label: 'Productos' }, { label: 'Origen' }, { label: 'Excelencia' }, { label: 'Compromisos' }, { label: 'Contacto' }];
const secondary = [{ label: 'Área privada' }, { label: 'Tienda' }, { label: 'ES / EN' }];

const meta = {
  title: 'Módulos/Menu',
  component: Menu,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: { open: true, brand: 'JOSELITO', links, secondary, theme: 'dark-black-neutral' },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Marca: Story = { args: { theme: 'dark-red-primary' } };
