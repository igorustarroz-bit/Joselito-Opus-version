import ButtonIcon, { TYPES, SIZES, STATES } from './ButtonIcon';
import { ICON_NAMES } from '../Icon/Icon';

export default {
  title: 'Components/Button-Icon',
  component: ButtonIcon,
  parameters: { defaultTheme: 'light-white' },
  args: { type: 'Primary', size: 'L', icon: 'arrow-right', label: 'Siguiente', selected: false, disabled: false },
  argTypes: {
    type: { control: 'inline-radio', options: TYPES },
    size: { control: 'inline-radio', options: SIZES },
    state: { control: 'select', options: [undefined, ...STATES] },
    icon: { control: 'select', options: ICON_NAMES },
    href: { control: 'text' },
  },
};

export const Default = {};

export const PrimaryDefault = { args: { type: 'Primary', size: 'L' } };
export const PrimaryHover = { args: { type: 'Primary', size: 'L', state: 'Hover' } };
export const PrimaryFocussed = { args: { type: 'Primary', size: 'L', state: 'Focussed' } };
export const PrimarySelected = { args: { type: 'Primary', size: 'L', selected: true } };
export const PrimaryDisabled = { args: { type: 'Primary', size: 'L', disabled: true } };

export const SecondaryDefault = { args: { type: 'Secondary', size: 'L' } };
export const SecondaryHover = { args: { type: 'Secondary', size: 'L', state: 'Hover' } };
export const SecondaryFocussed = { args: { type: 'Secondary', size: 'L', state: 'Focussed' } };
export const SecondarySelected = { args: { type: 'Secondary', size: 'L', selected: true } };
export const SecondaryDisabled = { args: { type: 'Secondary', size: 'L', disabled: true } };

export const TerciaryDefault = { args: { type: 'Terciary', size: 'L' } };
export const TerciaryHover = { args: { type: 'Terciary', size: 'L', state: 'Hover' } };
export const TerciaryFocussed = { args: { type: 'Terciary', size: 'L', state: 'Focussed' } };
export const TerciarySelected = { args: { type: 'Terciary', size: 'L', selected: true } };
export const TerciaryDisabled = { args: { type: 'Terciary', size: 'L', disabled: true } };

export const SizeXL = { args: { size: 'XL' } };
export const SizeL = { args: { size: 'L' } };
export const SizeM = { args: { size: 'M' } };
export const SizeS = { args: { size: 'S' } };
export const SizeXS = { args: { size: 'XS' } };

/** Tamaños de Secondary y Terciary (en Figma no existe XL para ellos). */
export const SecondarySizes = { render: (args) => (<div style={{ display: 'flex', gap: 'var(--layout-spacers-responsive-2)', alignItems: 'center' }}>{['L', 'M', 'S', 'XS'].map((s) => <ButtonIcon key={s} {...args} type="Secondary" size={s} />)}</div>) };
export const TerciarySizes = { render: (args) => (<div style={{ display: 'flex', gap: 'var(--layout-spacers-responsive-2)', alignItems: 'center' }}>{['L', 'M', 'S', 'XS'].map((s) => <ButtonIcon key={s} {...args} type="Terciary" size={s} />)}</div>) };

/** Como enlace (`href`): se renderiza `<a>`. */
export const ComoEnlace = { args: { href: '#', type: 'Secondary' } };
