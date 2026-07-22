import CardProduct from './CardProduct.jsx';

const meta = {
  title: 'Componentes/Card Product',
  component: CardProduct,
  args: {
    title: 'Jamón Gran Reserva',
    price: 'Desde 380€',
    address: 'Calle Velázquez, 30',
    badge: 'TOP VENTAS',
    locations: ['Barcelona', 'España'],
    stars: 3,
    cta: 'Descubrir',
  },
};
export default meta;

export const Default = { render: (a) => <div style={{ width: 324 }}><CardProduct {...a} /></div> };

export const SinExtras = {
  render: () => <div style={{ width: 324 }}><CardProduct title="Paleta Ibérica" price="Desde 240€" cta="Ver ficha" /></div>,
};
