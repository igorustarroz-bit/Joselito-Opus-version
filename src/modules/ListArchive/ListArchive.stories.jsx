import ListArchive from './ListArchive.jsx';

const meta = {
  title: 'Módulos/List · Archive table',
  component: ListArchive,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista por defecto, fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop — fecha a la izquierda, titular a la derecha. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — fecha y titular apilados. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

/** Con enlaces — cada fila es un enlace (realce en hover). */
export const ConEnlaces = {
  name: 'Con enlaces',
  args: {
    items: [
      { date: 'Diciembre 2025', headline: 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis donec est auctor diam ac morbi semper.', href: '#' },
      { date: 'Noviembre 2025', headline: 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis donec est auctor diam ac morbi semper.', href: '#' },
    ],
  },
  parameters: { viewport: { value: 'xl' } },
};
