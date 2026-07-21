import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';

const img = <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#2b2b1a,#6f7a4b)' }} />;

const meta = {
  title: 'Módulos/Banner',
  component: Banner,
  parameters: { layout: 'fullscreen' },
  argTypes: { theme: { control: 'select', options: ['light-white','light-grey','dark-red-primary','dark-black-neutral','light-yellow'] } },
  args: {
    sectionTitle: 'Experiencias y eventos',
    seeAll: { label: 'Ver todos' },
    image: img,
    title: 'Eventos Privados y Bodas',
    description: 'Joselito’s te ofrece la esencia y todo el sabor del Jamón Joselito de la mano de un auténtico maestro cortador.',
    ctaLabel: 'Saber más',
    theme: 'light-white',
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
