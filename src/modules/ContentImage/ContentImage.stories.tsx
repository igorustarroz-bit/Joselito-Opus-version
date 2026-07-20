import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentImage } from './ContentImage';

const img = (c: string) => <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg,#373a2c,${c})` }} />;

const meta = {
  title: 'Módulos/ContentImage',
  component: ContentImage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    video: { control: 'boolean' },
    theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] },
  },
  args: { images: img('#9ba084'), video: true, theme: 'dark-red-primary' },
} satisfies Meta<typeof ContentImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DosImagenes: Story = { args: { images: [img('#9ba084'), img('#e23f36')], video: false, ratio: '3:4', theme: 'light-white' } };
