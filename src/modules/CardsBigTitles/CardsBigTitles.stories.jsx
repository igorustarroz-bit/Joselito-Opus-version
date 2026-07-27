import CardsBigTitles from './CardsBigTitles.jsx';

const meta = {
  title: 'Módulos/Cards · Big Titles',
  component: CardsBigTitles,
  parameters: { layout: 'fullscreen', defaultTheme: 'dark-black-neutral' },
};
export default meta;

/** Default — vista por defecto, fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop — banda tipográfica sobre fondo oscuro. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — tipografía reducida. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };
