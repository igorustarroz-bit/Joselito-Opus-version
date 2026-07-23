import ContentImageOnly from './ContentImageOnly.jsx';

const meta = {
  title: 'Módulos/Content · Image only',
  component: ContentImageOnly,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista por defecto (1 imagen 16:9), fluida para comprobar el responsive. */
export const Default = { args: { count: 1, ratio: '16:9' } };

/** Una imagen a sangre (16:9). */
export const UnaImagen = { name: 'Una imagen', args: { count: 1, ratio: '16:9' }, parameters: { viewport: { value: 'xl' } } };

/** Una imagen con botón de reproducción (vídeo). */
export const ConVideo = { name: 'Con vídeo', args: { count: 1, ratio: '16:9', video: true }, parameters: { viewport: { value: 'xl' } } };

/** Dos imágenes contiguas. */
export const DosImagenes = { name: 'Dos imágenes', args: { count: 2 }, parameters: { viewport: { value: 'xl' } } };

/** Mobile — dos imágenes. */
export const DosImagenesMobile = { name: 'Dos imágenes (mobile)', args: { count: 2 }, parameters: { viewport: { value: 'xs' } } };
