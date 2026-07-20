import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandLogo } from './BrandLogo';

const meta = {
  title: 'Componentes/BrandLogo',
  component: BrandLogo,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['horizontal', 'isotype'] },
    height: { control: { type: 'range', min: 24, max: 160, step: 4 } },
  },
  args: { variant: 'horizontal', height: 80 },
} satisfies Meta<typeof BrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
      <BrandLogo {...args} variant="horizontal" />
      <BrandLogo {...args} variant="isotype" />
    </div>
  ),
};

export const Color: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <BrandLogo {...args} variant="isotype" className="text-(--text-base)" />
      <BrandLogo {...args} variant="isotype" className="text-(--text-accent-base)" />
      <div data-theme="dark-black-neutral" style={{ padding: 16, background: 'var(--bg-base)' }}>
        <BrandLogo {...args} variant="isotype" className="text-(--text-base)" />
      </div>
    </div>
  ),
};
