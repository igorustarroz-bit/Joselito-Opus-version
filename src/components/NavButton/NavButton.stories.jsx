import NavButton, { STATES } from './NavButton';
import { ICON_NAMES } from '../Icon/Icon';

export default {
  title: 'Components/NavButton',
  component: NavButton,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'Item', selected: false, disabled: false, showIcon: false, showCaret: false },
  argTypes: {
    state: { control: 'select', options: [undefined, ...STATES] },
    icon: { control: 'select', options: ICON_NAMES },
    caret: { control: 'select', options: ICON_NAMES },
    href: { control: 'text' },
  },
};

export const Default = {};
export const StateDefault = {};
export const StateHover = { args: { state: 'Hover' } };
export const StateFocus = { args: { state: 'Focus' } };
export const StateSelected = { args: { selected: true } };
export const StateDisable = { args: { disabled: true } };

/** Show Icon (MagnifyingGlass) y Show Caret (CaretDown), 20 px. */
export const ConIconoYCaret = { args: { showIcon: true, showCaret: true } };

/** Como enlace de la página actual: `href` + `selected` → `aria-current="page"`. */
export const ComoEnlace = { args: { href: '#', selected: true, text: 'Tienda' } };
