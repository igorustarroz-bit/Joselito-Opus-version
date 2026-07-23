import ContentTitle from './ContentTitle.jsx';

const meta = {
  title: 'Módulos/Content · Title',
  component: ContentTitle,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista por defecto, fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop — etiqueta arriba; fila título | descripción + enlace. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — etiqueta + título apilados; descripción + enlace debajo. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

/** Solo título (sin etiqueta, descripción ni enlace). */
export const SoloTitulo = {
  name: 'Solo título',
  args: { label: null, description: null, link: null },
  parameters: { viewport: { value: 'xl' } },
};
