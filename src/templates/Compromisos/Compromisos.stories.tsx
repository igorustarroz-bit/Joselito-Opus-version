import type { Meta, StoryObj } from '@storybook/react-vite';
import { Compromisos } from './Compromisos';
const meta = { title: 'Templates/Compromisos', component: Compromisos, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Compromisos>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
