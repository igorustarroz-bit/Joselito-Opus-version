import type { Meta, StoryObj } from '@storybook/react-vite';
import { Excelencia } from './Excelencia';
const meta = { title: 'Templates/Excelencia', component: Excelencia, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Excelencia>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
