import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHero } from './SectionHero';

const img = <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#481815,#e23f36)' }} />;

const meta = {
  title: 'Módulos/SectionHero',
  component: SectionHero,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    theme: { control: 'select', options: ['light-white', 'light-grey', 'dark-red-primary', 'dark-black-neutral', 'light-yellow'] },
    reverse: { control: 'boolean' },
  },
  args: {
    eyebrow: 'Desde 1868',
    title: 'El mejor jamón del mundo',
    description: 'Cría en libertad, bellota y una curación paciente. Así nace cada pieza de Joselito.',
    actions: [{ label: 'Descubrir' }, { label: 'Comprar' }],
    image: img,
    theme: 'light-white',
  },
} satisfies Meta<typeof SectionHero>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Oscuro: Story = { args: { theme: 'dark-black-neutral', reverse: true } };
export const Marca: Story = { args: { theme: 'dark-red-primary' } };
