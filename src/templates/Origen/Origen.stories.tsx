import type { Meta, StoryObj } from '@storybook/react-vite';
import { Origen } from './Origen';
const meta = { title: 'Templates/Origen', component: Origen, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Origen>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
