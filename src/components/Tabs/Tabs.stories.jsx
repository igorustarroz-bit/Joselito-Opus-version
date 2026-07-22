import Tabs from './Tabs.jsx';

const items = [
  { label: 'Añadas' },
  { label: 'Curación' },
  { label: 'Manual de corte' },
  { label: 'Deshabilitado', disabled: true },
];

const meta = {
  title: 'Componentes/UI05-Tabs',
  component: Tabs,
  argTypes: { type: { control: 'radio', options: ['primary', 'secondary'] } },
  args: { items, type: 'primary', defaultValue: 0 },
};
export default meta;

export const Primary = { args: { type: 'primary' } };
export const Secondary = { args: { type: 'secondary' } };

export const ConIconos = {
  args: {
    items: [
      { label: 'Calendario', iconLeft: 'CalendarBlank' },
      { label: 'Menú', iconRight: 'CaretDown' },
      { label: 'Info', iconLeft: 'Info' },
    ],
  },
};
