import BlockArchiveList from './BlockArchiveList';

import meta from './BlockArchiveList.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default { title: 'Components/Block Archive List', component: BlockArchiveList, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, args: { href: '#' } };

export const Default = {};
export const LeftInactive = { args: { type: 'Left' } };
export const LeftActive = { args: { type: 'Left', active: true } };
export const RightInactive = { args: { type: 'Right', label: 'Collection 2008', title: 'Vista Alegre' } };
export const RightActive = { args: { type: 'Right', label: 'Collection 2008', title: 'Vista Alegre', active: true } };
/** Device=Mobile (ver con el viewport XS): etiqueta encima en Neutral 2 y nombre en Texts/Base. */
export const Mobile = { args: { label: 'Collection 2020', title: 'Vista Alegre' } };

/** Eje «Type»: todas las opciones juntas (página Doc → Variantes). */
export const AxisType = axisStory(BlockArchiveList, [
  { label: "Right", story: RightActive },
  { label: "Left", story: LeftActive },
  { label: "fragmentM-List", story: Mobile },
], { name: "Eje · Type" });

/** Eje «State»: todas las opciones juntas (página Doc → Variantes). */
export const AxisState = axisStory(BlockArchiveList, [
  { label: "Active", story: RightActive },
  { label: "Inactive", story: RightInactive },
], { name: "Eje · State" });
