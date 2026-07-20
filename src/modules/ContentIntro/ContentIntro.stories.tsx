import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentIntro } from './ContentIntro';

const img = <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#373a2c,#9ba084)' }} />;

const meta = {
  title: 'Módulos/ContentIntro',
  component: ContentIntro,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: {
    eyebrow: 'Un legado único',
    title: 'Seis generaciones y más de 150 años de historia han convertido el tiempo en el mayor valor de Joselito.',
    image: img,
    actionLabel: 'Nuestra historia',
    theme: 'light-white',
  },
} satisfies Meta<typeof ContentIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SoloTexto: Story = { args: { image: undefined, actionLabel: undefined } };
