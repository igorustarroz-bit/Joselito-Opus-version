import Listbox from './Listbox.jsx';

const items = [
  { label: 'Jamón de bellota' },
  { label: 'Paleta ibérica' },
  { label: 'Lomo' },
  { label: 'No disponible', disabled: true },
];

const meta = {
  title: 'Componentes/UI07-Listbox',
  component: Listbox,
  args: { items, defaultValue: 'Jamón de bellota' },
};
export default meta;

export const Default = { render: (a) => <div style={{ width: 320, border: '1px solid var(--stroke-neutral-3)' }}><Listbox {...a} /></div> };
