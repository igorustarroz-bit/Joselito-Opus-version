import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const items = [
  { id: 'origen', label: 'Origen', content: 'Nuestra dehesa y la crianza en libertad.' },
  { id: 'curacion', label: 'Curación', content: 'Entre 36 y 48 meses de curación natural.' },
  { id: 'corte', label: 'Corte', content: 'Manual de corte para disfrutar cada loncha.' },
];

const meta = {
  title: 'Componentes/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  argTypes: { type: { control: 'inline-radio', options: ['primary', 'secondary'] } },
  args: { items, type: 'primary' },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { type: 'secondary' } };
