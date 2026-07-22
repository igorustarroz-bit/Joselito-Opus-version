import CardCarrusel from './CardCarrusel.jsx';

const meta = {
  title: 'Componentes/Card Carrusel',
  component: CardCarrusel,
  argTypes: { orientation: { control: 'radio', options: ['horizontal', 'vertical'] } },
  args: {
    title: 'Joselitos Velázquez',
    body: 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis serum.',
    tags: ['Restaurante', 'Madrid'],
    cta: 'Descubrir',
    orientation: 'horizontal',
  },
};
export default meta;

export const Horizontal = { args: { orientation: 'horizontal' }, render: (a) => <div style={{ maxWidth: 1000 }}><CardCarrusel {...a} /></div> };
export const Vertical = { args: { orientation: 'vertical' }, render: (a) => <div style={{ width: 260 }}><CardCarrusel {...a} /></div> };
