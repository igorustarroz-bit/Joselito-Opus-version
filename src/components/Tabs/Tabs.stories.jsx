import Tabs from './Tabs';

export default { title: 'Components/Tabs', component: Tabs, parameters: { defaultTheme: 'light-white' }, args: { items: ['item', 'item'] } };

export const Default = {};
export const TypePrimary = { args: { type: 'Primary', items: ['Jamón', 'Paleta', 'Embutidos'] } };
export const TypeSecondary = { args: { type: 'Secondary', items: ['Jamón', 'Paleta', 'Embutidos'] } };
