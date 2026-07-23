import CardsCategories from './CardsCategories.jsx';

const meta = {
  title: 'Módulos/Cards · Categories',
  component: CardsCategories,
  parameters: { layout: 'fullscreen' },
  argTypes: { variant: { control: 'inline-radio', options: ['rrss', 'instagram'] } },
  args: { variant: 'rrss' },
};
export default meta;

/** Desktop · RRSS — antetítulo + iconos en cabecera; miniaturas con handle. */
export const RRSS = { name: 'RRSS', parameters: { viewport: { value: 'xl' } } };

/** Desktop · Instagram — sin iconos; miniaturas centradas + pie "SÍGUENOS / @cuenta". */
export const Instagram = { args: { variant: 'instagram' }, parameters: { viewport: { value: 'xl' } } };

/** Mobile · RRSS — iconos abajo centrados; miniaturas sin handle. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };
