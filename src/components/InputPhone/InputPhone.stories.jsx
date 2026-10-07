import InputPhone, { STATES } from './InputPhone';

import meta from './InputPhone.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/Input-Phone',
  component: InputPhone,
  parameters: { defaultTheme: 'light-white' },
  args: { size: 'Big', label: 'Teléfono', inputLabel: 'Phone Num', info: 'Message', showInfo: true },
  argTypes: argTypesFromMeta(meta, { size: { control: 'inline-radio', options: ['Big', 'Small'] }, state: { control: 'select', options: [undefined, ...STATES] } }),
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Default = {};
const grid = (size) => (args) => (
  <div style={{ display: 'grid', gap: 'var(--layout-spacers-responsive-6)' }}>
    {STATES.map((s) => <InputPhone key={s} {...args} size={size} state={s} defaultValue={['Filled', 'Focused', 'Error', 'Validated'].includes(s) ? '686 123 456' : ''} />)}
  </div>
);
export const Big = { render: grid('Big') };
export const Small = { render: grid('Small') };

/** Eje «Type»: todas las opciones juntas (página Doc → Variantes). */
export const AxisType = axisStory(InputPhone, [
  { label: "Default", args: {} },
], { name: "Eje · Type" });

/** Eje «Size»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSize = axisStory(InputPhone, [
  { label: "Big", story: Big },
  { label: "Small", story: Small },
], { name: "Eje · Size" });

/** Eje «State»: todas las opciones juntas (página Doc → Variantes). */
export const AxisState = axisStory(InputPhone, [
  { label: "Default", args: {"state":"Default"} },
  { label: "Hover", args: {"state":"Hover"} },
  { label: "Focused", args: {"state":"Focused","defaultValue":"686 123 456"} },
  { label: "Filled", args: {"state":"Filled","defaultValue":"686 123 456"} },
  { label: "Error", args: {"state":"Error","defaultValue":"686 123 456"} },
  { label: "Validated", args: {"state":"Validated","defaultValue":"686 123 456"} },
  { label: "Disabled", args: {"state":"Disabled"} },
], { name: "Eje · State" });
