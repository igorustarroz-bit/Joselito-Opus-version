import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavButton } from './NavButton';

const meta = {
  title: 'Componentes/NavButton',
  component: NavButton,
  parameters: { layout: 'centered' },
  argTypes: { selected: { control: 'boolean' }, disabled: { control: 'boolean' }, children: { control: 'text' } },
  args: { children: 'Inicio' },
} satisfies Meta<typeof NavButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <NavButton {...args}>Default</NavButton>
      <NavButton {...args} selected>Selected</NavButton>
      <NavButton {...args} disabled>Disabled</NavButton>
    </div>
  ),
};
