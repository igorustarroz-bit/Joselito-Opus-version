import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlaceholderText } from './PlaceholderText';

const meta = {
  title: 'Componentes/PlaceholderText',
  component: PlaceholderText,
  parameters: { layout: 'padded' },
  argTypes: { lines: { control: { type: 'range', min: 1, max: 8, step: 1 } } },
  args: { lines: 3 },
} satisfies Meta<typeof PlaceholderText>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div style={{ maxWidth: 480 }}><PlaceholderText {...args} /></div> };
