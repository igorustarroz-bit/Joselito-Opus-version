import ButtonActionLink, { SIZES, TYPES } from './ButtonActionLink';
import { ICON_NAMES } from '../Icon/Icon';

export default {
  title: 'Components/Button-Action-Link',
  component: ButtonActionLink,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'Button', size: 'L', showIconLeft: false, showIconRight: false, disabled: false },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    state: { control: 'select', options: [undefined, ...TYPES] },
    iconLeft: { control: 'select', options: ICON_NAMES },
    iconRight: { control: 'select', options: ICON_NAMES },
    href: { control: 'text' },
  },
};

export const Default = {};

export const DefaultL = { args: { size: 'L' } };
export const HoverL = { args: { size: 'L', state: 'Hover' } };
export const FocusL = { args: { size: 'L', state: 'Focus' } };
export const DisabledL = { args: { size: 'L', disabled: true } };

export const DefaultM = { args: { size: 'M' } };
export const HoverM = { args: { size: 'M', state: 'Hover' } };
export const FocusM = { args: { size: 'M', state: 'Focus' } };
export const DisabledM = { args: { size: 'M', disabled: true } };

export const DefaultS = { args: { size: 'S' } };
export const HoverS = { args: { size: 'S', state: 'Hover' } };
export const FocusS = { args: { size: 'S', state: 'Focus' } };
export const DisabledS = { args: { size: 'S', disabled: true } };

/** Iconos opcionales (Show Icon Left / Show Icon Right en Figma): Star y ArrowRight a 20 px. */
export const ConIconos = { args: { showIconLeft: true, showIconRight: true } };

/** Como enlace (`href`): se renderiza `<a>`. */
export const ComoEnlace = { args: { href: '#', showIconRight: true } };
