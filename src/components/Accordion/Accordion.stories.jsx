import Accordion from './Accordion.jsx';

const items = [
  { title: 'Denominación de origen', content: 'Jamón 100% ibérico de bellota, curado de forma natural.', defaultOpen: true },
  { title: 'Curación', content: 'Curación mínima de 36 meses en bodega.' },
  { title: 'Conservación', content: 'Conservar en lugar fresco y seco.' },
];

const meta = {
  title: 'Componentes/UI13-Accordion',
  component: Accordion,
  args: { items },
};
export default meta;

export const Default = { render: (a) => <div style={{ width: 368 }}><Accordion {...a} /></div> };
