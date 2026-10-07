import Alert, { TYPES } from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: { defaultTheme: 'light-white', layout: 'fullscreen' },
  args: { type: 'Default', showButton: true, showDropdown: true },
  argTypes: { type: { control: 'inline-radio', options: TYPES } },
};

export const Default = {};
/** Device=Desktop / Mobile se resuelven por ancho (ver con los viewports). */
export const DesktopDefault = {};
export const DesktopLanguage = { args: { type: 'Language' } };
export const MobileDefault = { decorators: [(Story) => <div style={{ width: 390 }}><Story /></div>] };
export const MobileLanguage = { args: { type: 'Language' }, decorators: [(Story) => <div style={{ width: 390 }}><Story /></div>] };
