import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomepageHero } from './HomepageHero';

const bg = <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#260200,#e23f36)' }} />;

const meta = {
  title: 'Módulos/HomepageHero',
  component: HomepageHero,
  parameters: { layout: 'fullscreen' },
  argTypes: { align: { control: 'inline-radio', options: ['left','center'] } },
  args: {
    background: bg, eyebrow: 'Desde 1868',
    title: 'El mejor jamón del mundo',
    description: 'Tradición, dehesa y una curación paciente en cada pieza.',
    actions: [{ label: 'Descubrir' }, { label: 'Comprar', variant: 'secondary' }],
    align: 'center',
  },
} satisfies Meta<typeof HomepageHero>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Izquierda: Story = { args: { align: 'left' } };
