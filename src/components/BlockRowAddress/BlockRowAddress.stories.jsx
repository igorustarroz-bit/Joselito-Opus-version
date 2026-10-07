import BlockRowAddress from './BlockRowAddress';

import meta from './BlockRowAddress.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default { title: 'Components/Block Row Address', component: BlockRowAddress, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 774, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
/** Device=Desktop, Type=Horizontal */
export const DesktopHorizontal = { args: { href: '#' } };

/** Eje «Type»: todas las opciones juntas (página Doc → Variantes). */
export const AxisType = axisStory(BlockRowAddress, [
  { label: "Horizontal", story: DesktopHorizontal },
], { name: "Eje · Type" });
