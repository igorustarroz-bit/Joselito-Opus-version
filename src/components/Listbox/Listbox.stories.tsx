import type { Meta, StoryObj } from '@storybook/react-vite';
import { Listbox } from './Listbox';

const options = [
  { value: 'jamon', label: 'Jamón de bellota 100% ibérico' },
  { value: 'paleta', label: 'Paleta de bellota' },
  { value: 'lomo', label: 'Lomo de bellota' },
  { value: 'agotado', label: 'Chorizo (agotado)', disabled: true },
];

const meta = {
  title: 'Componentes/Listbox',
  component: Listbox,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'inline-radio', options: ['m', 'l'] }, disabled: { control: 'boolean' } },
  args: { label: 'Producto', options, size: 'l' },
} satisfies Meta<typeof Listbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div style={{ maxWidth: 420, minHeight: 260 }}><Listbox {...args} /></div> };
