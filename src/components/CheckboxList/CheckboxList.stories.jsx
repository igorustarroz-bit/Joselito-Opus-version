import CheckboxList from './CheckboxList';

export default { title: 'Components/Checkbox-List', component: CheckboxList, parameters: { defaultTheme: 'light-white' }, args: { items: ['Jamón', 'Paleta', 'Embutidos'] } };

export const Default = {};
export const VerticalYes = { args: { vertical: true } };
export const VerticalNo = { args: { vertical: false } };
