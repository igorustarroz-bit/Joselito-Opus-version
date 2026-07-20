import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardsShowcase } from './CardsShowcase';
const img = (c: string) => <div style={{ width:'100%', height:'100%', background:`linear-gradient(135deg,#260200,${c})` }} />;
const meta = { title: 'Módulos/CardsShowcase', component: CardsShowcase, parameters: { layout: 'fullscreen' },
  args: {
    heading: 'Historias',
    featured: { image: img('#e23f36'), title: 'El arte de la montanera', description: 'Cómo la bellota define el sabor de nuestro jamón.' },
    items: [
      { image: img('#89906f'), title: 'La dehesa', description: 'Un ecosistema único.' },
      { image: img('#cc0a00'), title: 'La curación', description: 'Paciencia y tiempo.' },
      { image: img('#7a5706'), title: 'El corte', description: 'Un ritual con maestría.' },
    ],
  } } satisfies Meta<typeof CardsShowcase>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
