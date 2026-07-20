import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta = {
  title: 'Componentes/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'inline-radio', options: ['transaction', 'new', 'aseptic'] },
    size: { control: 'inline-radio', options: ['l', 'xs'] },
    children: { control: 'text' },
  },
  args: { type: 'new', size: 'l', children: 'Nuevo' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tipos: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Tag {...args} type="transaction">Label</Tag>
      <Tag {...args} type="new">Nuevo</Tag>
      <Tag {...args} type="aseptic">Label</Tag>
    </div>
  ),
};

export const Tamaños: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Tag {...args} size="l">Large</Tag>
      <Tag {...args} size="xs">XS</Tag>
    </div>
  ),
};
