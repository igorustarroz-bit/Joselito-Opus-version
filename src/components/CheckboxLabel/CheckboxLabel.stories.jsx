import CheckboxLabel, { SIZES, STATES } from './CheckboxLabel';

import meta from './CheckboxLabel.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/Checkbox-Label',
  component: CheckboxLabel,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'Label', size: 'Medium', showLabel: true },
  argTypes: argTypesFromMeta(meta, { size: { control: 'inline-radio', options: SIZES }, state: { control: 'select', options: [undefined, ...STATES] } }),
};

export const Default = {};
const row = (size) => (args) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--layout-spacers-responsive-6)' }}>
    {STATES.map((s) => <CheckboxLabel key={s} {...args} size={size} state={s} text={s} />)}
  </div>
);
/** Default · Hover · Selected · Undefined · Disabled · Disabled Selected */
export const Medium = { render: row('Medium') };
export const Small = { render: row('Small') };
/** Interactivo. */
export const Interactivo = { args: { text: 'Acepto la política de privacidad' } };

/** Eje «Size»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSize = axisStory(CheckboxLabel, [
  { label: "Medium", story: Medium },
  { label: "Small", story: Small },
], { name: "Eje · Size" });

/** Eje «Estado»: todas las opciones juntas (página Doc → Variantes). */
export const AxisEstado = axisStory(CheckboxLabel, [
  { label: "Default", args: {"state":"Default"} },
  { label: "Hover", args: {"state":"Hover"} },
  { label: "Selected", args: {"state":"Selected"} },
  { label: "Undefined", args: {"state":"Undefined"} },
  { label: "Disabled", args: {"state":"Disabled"} },
  { label: "Disabled Selected", args: {"state":"Disabled Selected"} },
], { name: "Eje · Estado" });

/** Eje «Selected»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSelected = axisStory(CheckboxLabel, [
  { label: "No", args: {"defaultChecked":false} },
  { label: "Yes", args: {"defaultChecked":true} },
], { name: "Eje · Selected" });
