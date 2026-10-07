import InputCode, { STATES } from './InputCode';

export default {
  title: 'Components/Input-Code',
  component: InputCode,
  parameters: { defaultTheme: 'light-white' },
  args: { length: 6, info: 'Message', showInfo: true },
  argTypes: { state: { control: 'select', options: [undefined, ...STATES] }, length: { control: { type: 'range', min: 3, max: 6 } } },
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
