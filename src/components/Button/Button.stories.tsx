import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Componentes/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'terciary'] },
    size: { control: 'inline-radio', options: ['xl', 'l', 'm', 's', 'xs'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { variant: 'primary', size: 'l', children: 'Button' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="terciary">Terciary</Button>
    </div>
  ),
};

export const Tamaños: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      {(['xl', 'l', 'm', 's', 'xs'] as const).map((s) => (
        <Button key={s} {...args} size={s}>{s.toUpperCase()}</Button>
      ))}
    </div>
  ),
};

export const Estados: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Button {...args}>Default</Button>
      <Button {...args} selected>Selected</Button>
      <Button {...args} disabled>Disabled</Button>
    </div>
  ),
};
