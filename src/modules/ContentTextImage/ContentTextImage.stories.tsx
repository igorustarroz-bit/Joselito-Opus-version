import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentTextImage } from './ContentTextImage';

const img = <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#260200,#e23f36)' }} />;

const meta = {
  title: 'Módulos/ContentTextImage',
  component: ContentTextImage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    type: { control: 'inline-radio', options: ['left', 'right', 'half'] },
    theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] },
  },
  args: {
    label: 'This is a label',
    title: 'Declarado el mejor jamón del mundo',
    body: <p style={{ margin: 0 }}>Apasionados por la perfección en cada detalle del proceso: desde la cría del cerdo en libertad hasta la curación natural en bodegas centenarias.</p>,
    ctaLabel: 'Saber más',
    image: img,
    type: 'left',
  },
} satisfies Meta<typeof ContentTextImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {};
export const Right: Story = { args: { type: 'right' } };
export const Half: Story = { args: { type: 'half' } };
