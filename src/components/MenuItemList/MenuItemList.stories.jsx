import MenuItemList from './MenuItemList';

import meta from './MenuItemList.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/menu-item-list',
  component: MenuItemList, argTypes: argTypesFromMeta(meta),
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'Producto', selected: false, href: '#' },
};

export const Default = {};
export const SelectedNo = { args: { selected: false } };
export const SelectedYes = { args: { selected: true } };

/** Eje «Selected»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSelected = axisStory(MenuItemList, [
  { label: "No", story: SelectedNo },
  { label: "Yes", story: SelectedYes },
], { name: "Eje · Selected" });
