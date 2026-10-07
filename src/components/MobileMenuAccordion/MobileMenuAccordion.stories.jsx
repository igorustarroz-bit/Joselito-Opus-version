import MobileMenuAccordion from './MobileMenuAccordion';

import meta from './MobileMenuAccordion.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/mobile_menu_accordion',
  component: MobileMenuAccordion, argTypes: argTypesFromMeta(meta),
  parameters: { defaultTheme: 'light-white' },
  args: { title: 'PRODUCTOS' },
  decorators: [(Story) => <div style={{ width: 348, maxWidth: '100%' }}><Story /></div>],
};

export const Default = {};
export const StateClose = {};
export const StateOpen1 = { args: { defaultOpen: true, content: 'links' } };
export const StateOpen2 = { args: { defaultOpen: true, content: 'photos' } };

/** Eje «State»: todas las opciones juntas (página Doc → Variantes). */
export const AxisState = axisStory(MobileMenuAccordion, [
  { label: "Close", story: StateClose },
  { label: "Open 1", story: StateOpen1 },
  { label: "Open 2", story: StateOpen2 },
], { name: "Eje · State" });
