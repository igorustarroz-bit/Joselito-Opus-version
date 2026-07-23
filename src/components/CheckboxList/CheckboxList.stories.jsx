import CheckboxList from './CheckboxList.jsx';

const items = [
  { label: 'Bellota', checked: true },
  { label: 'Cebo de campo' },
  { label: 'Cebo' },
  { label: 'No disponible', disabled: true },
];

const meta = {
  title: 'Componentes/UI08-Checkbox-List',
  component: CheckboxList,
  argTypes: { vertical: { control: 'boolean' }, size: { control: 'radio', options: ['m', 's'] } },
  args: { items, vertical: true, size: 'm' },
};
export default meta;

/** Default — vista por defecto (vertical). */
export const Default = { args: { vertical: true } };

export const Vertical = { args: { vertical: true } };
export const Horizontal = { args: { vertical: false } };
