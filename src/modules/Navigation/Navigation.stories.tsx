import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navigation } from './Navigation';

const items = [{ label: 'Tienda' }, { label: 'Origen', active: true }, { label: 'Excelencia' }, { label: 'Compromisos' }, { label: 'Experiencia' }];

const meta = {
  title: 'Módulos/Navigation',
  component: Navigation,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: { items, cart: { label: 'Cesta', count: 3 }, theme: 'light-white' },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Oscuro: Story = { args: { theme: 'dark-black-neutral' } };
