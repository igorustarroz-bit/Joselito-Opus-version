import type { Meta, StoryObj } from '@storybook/react-vite';
import { PreviousNext } from './PreviousNext';

const meta = {
  title: 'Módulos/PreviousNext',
  component: PreviousNext,
  parameters: { layout: 'fullscreen' },
  args: {
    prev: { caption: 'Anterior', label: 'La dehesa' },
    next: { caption: 'Siguiente', label: 'La curación' },
  },
} satisfies Meta<typeof PreviousNext>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
