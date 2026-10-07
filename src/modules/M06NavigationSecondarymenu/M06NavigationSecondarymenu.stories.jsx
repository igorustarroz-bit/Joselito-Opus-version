import M06NavigationSecondarymenu, { TYPES } from './M06NavigationSecondarymenu';

export default {
  title: 'Modules/M06-Navigation-Secondarymenu',
  component: M06NavigationSecondarymenu,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { type: 'One line', showMenu: true },
  argTypes: { type: { control: 'inline-radio', options: TYPES }, open: { control: 'boolean' } },
};

export const Default = {};
/** Device=Desktop (desde 1024 px) · Type=One line: fila centrada de subnavigation-item. */
export const DesktopOneLine = {};
/** Device=Desktop · Type=Dropdown · Open=Yes: filtros con caret y panel con lista y foto. */
export const DesktopDropdownOpen = { args: { type: 'Dropdown', defaultOpen: true } };
/** Device=Mobile (ver con el viewport XS) · Type=One line: fila desplazable en horizontal. */
export const MobileOneLine = {};
/** Device=Mobile · Type=Dropdown · Open=No: título con +. */
export const MobileDropdownClosed = { args: { type: 'Dropdown' } };
/** Device=Mobile · Type=Dropdown · Open=Yes: lista de enlaces. */
export const MobileDropdownOpen = { args: { type: 'Dropdown', defaultOpen: true } };
