import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Módulos/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
  args: { items: [{ label: 'Inicio' }, { label: 'Productos' }, { label: 'Jamón' }, { label: 'Jamón de bellota 100% ibérico' }] },
} satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
