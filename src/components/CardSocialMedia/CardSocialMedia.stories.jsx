import CardSocialMedia from './CardSocialMedia';

import meta from './CardSocialMedia.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default { title: 'Components/Card-Social-media', component: CardSocialMedia, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' } };

export const Default = { decorators: [(Story) => <div style={{ width: 204 }}><Story /></div>] };
export const VerticalYes = { args: { vertical: true }, decorators: [(Story) => <div style={{ width: 204 }}><Story /></div>] };
export const VerticalNo = { args: { vertical: false }, decorators: [(Story) => <div style={{ width: 268 }}><Story /></div>] };

/** Eje «Vertical»: todas las opciones juntas (página Doc → Variantes). */
export const AxisVertical = axisStory(CardSocialMedia, [
  { label: "Yes", story: VerticalYes },
  { label: "No", story: VerticalNo },
], { name: "Eje · Vertical" });
