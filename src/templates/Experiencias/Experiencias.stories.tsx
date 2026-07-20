import type { Meta, StoryObj } from '@storybook/react-vite';
import { Experiencias } from './Experiencias';
const meta = { title: 'Templates/Experiencias', component: Experiencias, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Experiencias>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
