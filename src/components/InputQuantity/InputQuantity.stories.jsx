import InputQuantity from './InputQuantity';

export default {
  title: 'Components/InputQuantity',
  component: InputQuantity,
  parameters: { defaultTheme: 'light-white' },
  args: { defaultValue: 1, min: 1, max: 99, showMinus: true, showPlus: true },
};

export const Default = {};
/** Show Minus = false */
export const SinMenos = { args: { showMinus: false } };
/** Show Plus = false */
export const SinMas = { args: { showPlus: false } };
/** En el máximo: el botón + se desactiva. */
export const EnElMaximo = { args: { defaultValue: 5, max: 5 } };
