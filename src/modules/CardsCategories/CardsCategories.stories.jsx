import CardsCategories from './CardsCategories.jsx';

const meta = {
  title: 'Módulos/Cards · Categories',
  component: CardsCategories,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Desktop · RRSS — todos los iconos sociales + feed escalonado. */
export const RRSS = { name: 'RRSS', parameters: { viewport: { value: 'xl' } } };

/** Desktop · Instagram — solo icono de Instagram. */
export const Instagram = {
  args: { socials: ['InstagramLogo'] },
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };
