import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio, ASPECT_RATIOS } from './AspectRatio';

const meta = {
  title: 'Componentes/AspectRatio',
  component: AspectRatio,
  parameters: { layout: 'centered' },
  argTypes: {
    ratio: { control: 'select', options: ASPECT_RATIOS },
  },
  args: { ratio: '16:9' },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

const Placeholder = () => (
  <div className="flex items-center justify-center bg-(--bg-neutral-2) text-(--text-base)">
    <span className="type-label-2">contenido</span>
  </div>
);

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <AspectRatio {...args}>
        <Placeholder />
      </AspectRatio>
    </div>
  ),
};

export const AllRatios: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {ASPECT_RATIOS.map((r) => (
        <div key={r} style={{ width: 160 }}>
          <AspectRatio ratio={r}>
            <Placeholder />
          </AspectRatio>
          <div className="type-label-1 mt-fx-1 text-center">{r}</div>
        </div>
      ))}
    </div>
  ),
};
