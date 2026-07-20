import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardsAccordion } from './CardsAccordion';
const items = [
  { id: 'a', title: '¿Cómo conservo el jamón?', content: 'En un lugar fresco y seco; cúbrelo con su grasa una vez empezado.' },
  { id: 'b', title: '¿Cuánto dura la curación?', content: 'Entre 36 y 48 meses según la pieza.' },
  { id: 'c', title: '¿Hacéis envíos internacionales?', content: 'Sí, enviamos a la mayoría de países de la UE.' },
];
const meta = { title: 'Módulos/CardsAccordion', component: CardsAccordion, parameters: { layout: 'fullscreen' },
  args: { heading: 'Preguntas frecuentes', items } } satisfies Meta<typeof CardsAccordion>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {};
