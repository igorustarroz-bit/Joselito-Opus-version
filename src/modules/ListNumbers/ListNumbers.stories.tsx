import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListNumbers } from './ListNumbers';

const items = [
  { value: '24% Vitamina B', description: 'de la cantidad diaria recomendada.' },
  { value: '48 meses', description: 'de curación natural en bodega.' },
  { value: '100% ibérico', description: 'de bellota, criado en libertad.' },
];

const meta = {
  title: 'Módulos/ListNumbers',
  component: ListNumbers,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: { heading: 'This is a title', items, theme: 'light-white' },
} satisfies Meta<typeof ListNumbers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
