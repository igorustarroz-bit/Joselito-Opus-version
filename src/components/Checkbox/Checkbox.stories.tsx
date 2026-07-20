import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'inline-radio', options: ['s', 'm'] }, disabled: { control: 'boolean' } },
  args: { label: 'Acepto los términos', size: 'm' },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox {...args} label="Sin marcar" />
      <Checkbox {...args} label="Marcado" defaultChecked />
      <Checkbox {...args} label="Deshabilitado" disabled />
      <Checkbox {...args} label="Marcado + deshabilitado" defaultChecked disabled />
    </div>
  ),
};
