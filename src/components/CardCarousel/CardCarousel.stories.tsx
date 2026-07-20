import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardCarousel } from './CardCarousel';
import { CardProduct } from '../CardProduct';

const img = <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#481815,#e23f36)' }} />;
const products = ['Jamón de bellota', 'Paleta de bellota', 'Lomo de bellota', 'Chorizo ibérico', 'Salchichón ibérico'];

const meta = {
  title: 'Componentes/CardCarousel',
  component: CardCarousel,
  parameters: { layout: 'padded' },
  args: { children: null },
} satisfies Meta<typeof CardCarousel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <CardCarousel ariaLabel="Productos destacados">
        {products.map((p) => (
          <CardProduct key={p} category="Ibéricos" name={p} price="—" image={img} />
        ))}
      </CardCarousel>
    </div>
  ),
};
