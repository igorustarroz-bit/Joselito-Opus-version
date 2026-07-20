import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardProduct } from './CardProduct';

const img = <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#481815,#e23f36)' }} />;

const meta = {
  title: 'Componentes/CardProduct',
  component: CardProduct,
  parameters: { layout: 'padded' },
  args: { category: 'Jamón', name: 'Jamón de bellota 100% ibérico', price: '189,00 €', badge: 'Nuevo', image: img, onAdd: () => {} },
} satisfies Meta<typeof CardProduct>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div style={{ maxWidth: 300 }}><CardProduct {...args} /></div> };
export const Grid: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 960 }}>
      <CardProduct {...args} />
      <CardProduct {...args} name="Paleta de bellota" price="119,00 €" badge={undefined} />
      <CardProduct {...args} name="Lomo de bellota" price="59,00 €" badge={undefined} />
    </div>
  ),
};
