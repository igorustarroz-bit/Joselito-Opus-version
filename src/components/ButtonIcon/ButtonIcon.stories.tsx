import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonIcon } from './ButtonIcon';
import { Icon } from '../Icon';

const meta = {
  title: 'Componentes/ButtonIcon',
  component: ButtonIcon,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'terciary'] },
    size: { control: 'inline-radio', options: ['xl', 'l', 'm', 's', 'xs'] },
  },
  args: { variant: 'primary', size: 'l', label: 'Buscar', icon: <Icon name="MagnifyingGlass" size="m" /> },
} satisfies Meta<typeof ButtonIcon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <ButtonIcon {...args} variant="primary" />
      <ButtonIcon {...args} variant="secondary" />
      <ButtonIcon {...args} variant="terciary" />
    </div>
  ),
};
export const Tamaños: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['xl','l','m','s','xs'] as const).map((s) => <ButtonIcon key={s} {...args} size={s} />)}
    </div>
  ),
};
