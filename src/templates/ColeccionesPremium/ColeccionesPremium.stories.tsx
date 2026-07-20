import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColeccionesPremium } from './ColeccionesPremium';
const meta = { title: 'Templates/ColeccionesPremium', component: ColeccionesPremium, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof ColeccionesPremium>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
