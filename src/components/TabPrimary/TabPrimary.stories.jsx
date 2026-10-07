import TabPrimary, { STATES } from './TabPrimary';

export default {
  title: 'Components/tab_primary',
  component: TabPrimary,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'item', showIconLeft: true, showIconRight: true },
  argTypes: { state: { control: 'select', options: [undefined, ...STATES] } },
};

export const Default = {};
export const TypeDefault = {};
export const TypeHover = { args: { state: 'Hover' } };
export const TypeFocus = { args: { state: 'Focus' } };
export const TypeSelected = { args: { selected: true } };
export const TypeDisabled = { args: { disabled: true } };
