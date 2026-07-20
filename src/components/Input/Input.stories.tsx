import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
import { Icon } from '../Icon';

const meta = {
  title: 'Componentes/Input',
  component: Input,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'inline-radio', options: ['m', 'l'] },
    state: { control: 'inline-radio', options: ['default', 'error', 'validated', 'disabled'] },
  },
  args: { label: 'Correo electrónico', placeholder: 'tucorreo@ejemplo.com', size: 'l' },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div style={{ maxWidth: 420 }}><Input {...args} /></div> };

export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 420 }}>
      <Input {...args} state="default" message="Usaremos este correo para tu pedido." />
      <Input {...args} state="error" message="El correo no es válido." iconRight={<Icon name="Info" size="s" />} />
      <Input {...args} state="validated" message="Correo verificado." iconRight={<Icon name="Check" size="s" />} />
      <Input {...args} state="disabled" message="Campo no disponible." />
    </div>
  ),
};
