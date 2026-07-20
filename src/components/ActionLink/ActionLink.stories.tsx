import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionLink } from './ActionLink';
import { Icon } from '../Icon';

const meta = {
  title: 'Componentes/ActionLink',
  component: ActionLink,
  parameters: { layout: 'centered' },
  argTypes: { size: { control: 'inline-radio', options: ['l', 'm', 's'] }, disabled: { control: 'boolean' } },
  args: { children: 'Ver más', href: '#', size: 'm', iconRight: <Icon name="ArrowRight" size="s" /> },
} satisfies Meta<typeof ActionLink>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tamaños: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {(['l','m','s'] as const).map((s) => <ActionLink key={s} {...args} size={s}>Ver más</ActionLink>)}
    </div>
  ),
};
export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <ActionLink {...args}>Default</ActionLink>
      <ActionLink {...args} disabled>Disabled</ActionLink>
    </div>
  ),
};
