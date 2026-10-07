import Tabs from './Tabs';

import meta from './Tabs.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default { title: 'Components/Tabs', component: Tabs, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, args: { items: ['item', 'item'] } };

export const Default = {};
export const TypePrimary = { args: { type: 'Primary', items: ['Jamón', 'Paleta', 'Embutidos'] } };
export const TypeSecondary = { args: { type: 'Secondary', items: ['Jamón', 'Paleta', 'Embutidos'] } };

/** Eje «Type»: todas las opciones juntas (página Doc → Variantes). */
export const AxisType = axisStory(Tabs, [
  { label: "Primary", story: TypePrimary },
  { label: "Secondary", story: TypeSecondary },
], { name: "Eje · Type" });
