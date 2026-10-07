import InputCode, { STATES } from './InputCode';

import meta from './InputCode.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/Input-Code',
  component: InputCode,
  parameters: { defaultTheme: 'light-white' },
  args: { length: 6, info: 'Message', showInfo: true },
  argTypes: argTypesFromMeta(meta, { state: { control: 'select', options: [undefined, ...STATES] }, length: { control: { type: 'range', min: 3, max: 6 } } }),
};

export const Default = {};
export const StateDefault = { args: { state: 'Default' } };
export const StateHover = { args: { state: 'Hover' } };
export const StateFocused = { args: { state: 'Focused', defaultValue: '1' } };
export const StateFilled = { args: { state: 'Filled', defaultValue: '111111' } };
export const StateError = { args: { state: 'Error', defaultValue: '111111' } };
export const StateValidated = { args: { state: 'Validated', defaultValue: '111111' } };
export const StateDisabled = { args: { state: 'Disabled' } };
/** Show 5 / Show 6 desactivados: código de 4 dígitos. */
export const CuatroDigitos = { args: { length: 4 } };

/** Eje «State»: todas las opciones juntas (página Doc → Variantes). */
export const AxisState = axisStory(InputCode, [
  { label: "Default", story: StateDefault },
  { label: "Hover", story: StateHover },
  { label: "Focused", story: StateFocused },
  { label: "Filled", story: StateFilled },
  { label: "Error", story: StateError },
  { label: "Validated", story: StateValidated },
  { label: "Disabled", story: StateDisabled },
], { name: "Eje · State" });
