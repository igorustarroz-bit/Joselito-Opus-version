import Button, { TYPES, SIZES, STATES } from './Button';
import { ICON_NAMES } from '../Icon/Icon';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: { defaultTheme: 'light-white' },
  args: { text: 'Button', type: 'Primary', size: 'L', showIconLeft: false, showIconRight: false, selected: false, disabled: false },
  argTypes: {
    type: { control: 'inline-radio', options: TYPES },
    size: { control: 'inline-radio', options: SIZES },
    state: { control: 'select', options: [undefined, ...STATES] },
    iconLeft: { control: 'select', options: ICON_NAMES },
    iconRight: { control: 'select', options: ICON_NAMES },
    href: { control: 'text' },
  },
};

export const Default = {};

export const PrimaryDefault = { args: { type: 'Primary' } };
export const PrimaryHover = { args: { type: 'Primary', state: 'Hover' } };
export const PrimaryFocus = { args: { type: 'Primary', state: 'Focus' } };
export const PrimarySelected = { args: { type: 'Primary', selected: true } };
export const PrimaryDisabled = { args: { type: 'Primary', disabled: true } };

export const SecondaryDefault = { args: { type: 'Secondary' } };
export const SecondaryHover = { args: { type: 'Secondary', state: 'Hover' } };
export const SecondaryFocus = { args: { type: 'Secondary', state: 'Focus' } };
export const SecondarySelected = { args: { type: 'Secondary', selected: true } };
export const SecondaryDisabled = { args: { type: 'Secondary', disabled: true } };

export const TerciaryDefault = { args: { type: 'Terciary' } };
export const TerciaryHover = { args: { type: 'Terciary', state: 'Hover' } };
export const TerciaryFocus = { args: { type: 'Terciary', state: 'Focus' } };
export const TerciarySelected = { args: { type: 'Terciary', selected: true } };
export const TerciaryDisabled = { args: { type: 'Terciary', disabled: true } };

export const PrimarySizes = { render: (args) => (<div style={{ display: 'flex', gap: 'var(--layout-spacers-responsive-2)', alignItems: 'center', flexWrap: 'wrap' }}>{SIZES.map((s) => <Button key={s} {...args} type="Primary" size={s} text={`Size ${s}`} />)}</div>) };
export const SecondarySizes = { render: (args) => (<div style={{ display: 'flex', gap: 'var(--layout-spacers-responsive-2)', alignItems: 'center', flexWrap: 'wrap' }}>{SIZES.map((s) => <Button key={s} {...args} type="Secondary" size={s} text={`Size ${s}`} />)}</div>) };
export const TerciarySizes = { render: (args) => (<div style={{ display: 'flex', gap: 'var(--layout-spacers-responsive-2)', alignItems: 'center', flexWrap: 'wrap' }}>{SIZES.map((s) => <Button key={s} {...args} type="Terciary" size={s} text={`Size ${s}`} />)}</div>) };

/** Show Icon Left / Show Icon Right (Figma: CalendarBlank y ArrowRight). */
export const ConIconos = { args: { showIconLeft: true, showIconRight: true } };

/** Como enlace (`href`): se renderiza `<a>`. */
export const ComoEnlace = { args: { href: '#', type: 'Secondary', showIconRight: true } };
