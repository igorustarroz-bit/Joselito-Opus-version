import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListNumbers } from './ListNumbers';

const items = [
  { title: 'Crianza', description: 'Cerdos 100% ibéricos criados en libertad en la dehesa.' },
  { title: 'Montanera', description: 'Alimentación a base de bellota durante los meses clave.' },
  { title: 'Curación', description: 'Entre 36 y 48 meses de curación natural.' },
];

const meta = {
  title: 'Módulos/ListNumbers',
  component: ListNumbers,
  parameters: { layout: 'fullscreen' },
  argTypes: { columns: { control: 'inline-radio', options: [1,2,3] } },
  args: { heading: 'Nuestro proceso', items, columns: 3 },
} satisfies Meta<typeof ListNumbers>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
