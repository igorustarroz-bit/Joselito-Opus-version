import type { Meta, StoryObj } from '@storybook/react-vite';
import { SecondaryMenu } from './SecondaryMenu';
const items = [{ label: 'Origen', active: true }, { label: 'Excelencia' }, { label: 'Añadas' }, { label: 'Curación' }, { label: 'Manual de corte' }];
const meta = { title: 'Módulos/SecondaryMenu', component: SecondaryMenu, parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: { items, theme: 'light-white' } } satisfies Meta<typeof SecondaryMenu>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
