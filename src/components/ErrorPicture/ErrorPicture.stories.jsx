import ErrorPicture from './ErrorPicture';

import meta from './ErrorPicture.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default { title: 'Components/404_picture', component: ErrorPicture, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' } };

const desk = [(Story) => <div style={{ width: 377 }}><Story /></div>];
const mob = [(Story) => <div style={{ width: 280 }}><Story /></div>];
export const Default = { decorators: desk };
export const Desktop404 = { args: { type: '404' }, decorators: desk };
export const Desktop500 = { args: { type: '500' }, decorators: desk };
export const Desktop300 = { args: { type: '300' }, decorators: desk };
export const Mobile404 = { args: { type: '404' }, decorators: mob };
export const Mobile500 = { args: { type: '500' }, decorators: mob };
export const Mobile300 = { args: { type: '300' }, decorators: mob };

/** Eje «Type»: todas las opciones juntas (página Doc → Variantes). */
export const AxisType = axisStory(ErrorPicture, [
  { label: "404", story: Desktop404 },
  { label: "500", story: Desktop500 },
  { label: "300", story: Desktop300 },
], { name: "Eje · Type" });
