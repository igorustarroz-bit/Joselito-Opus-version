import CardLink from './CardLink.jsx';

const meta = {
  title: 'Componentes/Card Link',
  component: CardLink,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    ratio: { control: 'select', options: ['3:4', '1:1', '4:3', '16:9'] },
  },
  args: { title: 'Jamón Gran Reserva', subtitle: 'Desde 380€', ratio: '3:4' },
};
export default meta;

export const Default = { render: (a) => <div style={{ width: 320 }}><CardLink {...a} /></div> };

export const Galeria = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 900 }}>
      <CardLink title="Jamón Gran Reserva" subtitle="Desde 380€" />
      <CardLink title="Paleta Ibérica" subtitle="Desde 240€" />
      <CardLink title="Lomo de Bellota" subtitle="Desde 95€" />
    </div>
  ),
};
