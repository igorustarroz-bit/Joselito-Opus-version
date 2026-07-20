import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardsProductCarousel } from './CardsProductCarousel';
import { CardProduct } from '../../components/CardProduct';
const img = <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#481815,#e23f36)' }} />;
const names = ['Jamón de bellota','Paleta de bellota','Lomo de bellota','Chorizo ibérico','Salchichón ibérico'];
const meta = { title: 'Módulos/CardsProductCarousel', component: CardsProductCarousel, parameters: { layout: 'fullscreen' },
  args: { heading: 'Productos destacados', children: null } } satisfies Meta<typeof CardsProductCarousel>;
export default meta; type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <CardsProductCarousel {...args}>
      {names.map((n) => <CardProduct key={n} category="Ibéricos" name={n} price="—" image={img} />)}
    </CardsProductCarousel>
  ),
};
