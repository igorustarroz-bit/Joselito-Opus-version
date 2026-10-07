import MenuItemList from './MenuItemList';

export default {
  title: 'Components/menu-item-list',
  component: MenuItemList,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'Producto', selected: false, href: '#' },
};

export const Default = {};
export const SelectedNo = { args: { selected: false } };
export const SelectedYes = { args: { selected: true } };
