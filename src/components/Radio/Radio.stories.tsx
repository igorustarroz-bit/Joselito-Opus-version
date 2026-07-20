import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = {
  title: 'Componentes/Radio',
  component: Radio,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'inline-radio', options: ['s', 'm'] }, disabled: { control: 'boolean' } },
  args: { label: 'Opción', size: 'm', name: 'demo' },
} satisfies Meta<typeof Radio>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Grupo: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio {...args} name="g" label="Jamón" defaultChecked />
      <Radio {...args} name="g" label="Paleta" />
      <Radio {...args} name="g" label="Lomo" />
      <Radio {...args} name="g" label="No disponible" disabled />
    </div>
  ),
};
