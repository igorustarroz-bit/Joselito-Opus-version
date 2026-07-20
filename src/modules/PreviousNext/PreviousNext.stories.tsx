import type { Meta, StoryObj } from '@storybook/react-vite';
import { PreviousNext } from './PreviousNext';

const meta = {
  title: 'Módulos/PreviousNext',
  component: PreviousNext,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: { prev: { label: 'Anterior' }, next: { label: 'Siguiente' }, theme: 'light-white' },
} satisfies Meta<typeof PreviousNext>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
