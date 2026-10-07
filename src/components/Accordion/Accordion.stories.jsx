import Accordion from './Accordion';

import meta from './Accordion.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/accordion',
  component: Accordion, argTypes: argTypesFromMeta(meta),
  parameters: { defaultTheme: 'light-white' },
  args: { title: 'item', subtitle: 'Text', showSubtitle: false },
  decorators: [(Story) => <div style={{ width: 368, maxWidth: '100%' }}><Story /></div>],
};

export const Default = {};
export const OpenNo = { args: { defaultOpen: false } };
export const OpenYes = { args: { defaultOpen: true } };
/** Show Subtitle activado. */
export const ConSubtitulo = { args: { showSubtitle: true } };

/** Eje «Open»: todas las opciones juntas (página Doc → Variantes). */
export const AxisOpen = axisStory(Accordion, [
  { label: "No", story: OpenNo },
  { label: "Yes", story: OpenYes },
], { name: "Eje · Open" });
