import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentTextImage } from './ContentTextImage';

const img = <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#89906f,#dcded4)' }} />;

const meta = {
  title: 'Módulos/ContentTextImage',
  component: ContentTextImage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    reverse: { control: 'boolean' },
    theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] },
  },
  args: {
    eyebrow: 'La dehesa',
    title: 'Cría en libertad',
    body: <p style={{ margin: 0 }}>Nuestros cerdos crecen en la dehesa, alimentándose de bellota durante la montanera. Así se forma la grasa infiltrada que da su sabor único.</p>,
    linkLabel: 'Conocer el origen',
    image: img,
  },
} satisfies Meta<typeof ContentTextImage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Invertido: Story = { args: { reverse: true, theme: 'light-grey' } };
