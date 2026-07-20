import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxList } from './CheckboxList';

const options = [
  { value: 'jamon', label: 'Jamón' },
  { value: 'paleta', label: 'Paleta' },
  { value: 'lomo', label: 'Lomo' },
  { value: 'chorizo', label: 'Chorizo', disabled: true },
];

const meta = {
  title: 'Componentes/CheckboxList',
  component: CheckboxList,
  parameters: { layout: 'padded' },
  argTypes: { direction: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
  args: { legend: 'Productos', options, direction: 'vertical', name: 'productos' },
} satisfies Meta<typeof CheckboxList>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Horizontal: Story = { args: { direction: 'horizontal' } };
