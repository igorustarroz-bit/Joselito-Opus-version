import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentTitle } from './ContentTitle';
const meta = { title: 'Módulos/ContentTitle', component: ContentTitle, parameters: { layout: 'fullscreen' },
  argTypes: { align: { control: 'inline-radio', options: ['left','center'] }, level: { control: 'inline-radio', options: [3,4,5,6] } },
  args: { title: 'Nuestra historia', align: 'left', level: 5 } } satisfies Meta<typeof ContentTitle>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Centrado: Story = { args: { align: 'center' } };
