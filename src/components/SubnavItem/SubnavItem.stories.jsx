import SubnavItem from './SubnavItem';

export default { title: 'Components/subnavigation-item', component: SubnavItem, parameters: { defaultTheme: 'light-white' }, args: { text: 'Tienda', selected: false } };

export const Default = {};
export const SelectedNo = { args: { selected: false } };
export const SelectedYes = { args: { selected: true } };
export const ConIconoYCaret = { args: { showIcon: true, showCaret: true } };
