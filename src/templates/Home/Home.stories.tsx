import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home } from './Home';
const meta = { title: 'Templates/Home', component: Home, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Home>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
