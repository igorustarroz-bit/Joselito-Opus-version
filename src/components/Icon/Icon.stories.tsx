import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, ICON_SIZES } from './Icon';
import { iconNames } from './icons';

const meta = {
  title: 'Componentes/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: 'inline-radio', options: Object.keys(ICON_SIZES) },
  },
  args: { name: 'ArrowRight', size: 'm' },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tamaños: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
      {(Object.keys(ICON_SIZES) as (keyof typeof ICON_SIZES)[]).map((s) => (
        <div key={s} style={{ textAlign: 'center' }}>
          <Icon {...args} size={s} />
          <div className="type-label-1">{s} · {ICON_SIZES[s]}px</div>
        </div>
      ))}
    </div>
  ),
};

export const Color: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 20 }}>
      <Icon {...args} className="text-(--text-base)" size="l" />
      <Icon {...args} className="text-(--text-accent-base)" size="l" />
      <Icon {...args} className="text-(--text-success)" size="l" />
      <Icon {...args} className="text-(--text-error)" size="l" />
    </div>
  ),
};

export const Todos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, maxWidth: 520 }}>
      {iconNames.map((n) => (
        <div key={n} style={{ width: 92, textAlign: 'center' }}>
          <Icon name={n} size="m" />
          <div className="type-label-1" style={{ marginTop: 4 }}>{n}</div>
        </div>
      ))}
    </div>
  ),
};
