import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentImage } from './ContentImage';
const img = <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#481815,#e23f36)' }} />;
const meta = { title: 'Módulos/ContentImage', component: ContentImage, parameters: { layout: 'fullscreen' },
  argTypes: { width: { control: 'inline-radio', options: ['contained','full'] } },
  args: { image: img, caption: 'Dehesa de Guijuelo, Salamanca.', ratio: '16:9', width: 'contained' } } satisfies Meta<typeof ContentImage>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const AnchoCompleto: Story = { args: { width: 'full' } };
