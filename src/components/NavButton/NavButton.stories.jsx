import NavButton, { STATES } from './NavButton';
import { ICON_NAMES } from '../Icon/Icon';

import meta from './NavButton.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

export default {
  title: 'Components/NavButton',
  component: NavButton,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'Item', selected: false, disabled: false, showIcon: false, showCaret: false },
  argTypes: argTypesFromMeta(meta, {
    state: { control: 'select', options: [undefined, ...STATES] },
    icon: { control: 'select', options: ICON_NAMES },
    caret: { control: 'select', options: ICON_NAMES },
    href: { control: 'text' },
  }),
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

/** Eje «State»: todas las opciones juntas (página Doc → Variantes). */
export const AxisState = axisStory(NavButton, [
  { label: "Default", story: StateDefault },
  { label: "Selected", story: StateSelected },
  { label: "Hover", story: StateHover },
  { label: "Focus", story: StateFocus },
  { label: "Disable", story: StateDisable },
], { name: "Eje · State" });

/** Eje «Selected»: todas las opciones juntas (página Doc → Variantes). */
export const AxisSelected = axisStory(NavButton, [
  { label: "No", story: StateDefault },
  { label: "Yes", story: StateSelected },
], { name: "Eje · Selected" });
