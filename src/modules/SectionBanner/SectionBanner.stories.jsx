import SectionBanner from './SectionBanner.jsx';

const meta = {
  title: 'Módulos/Banners · Section banner',
  component: SectionBanner,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Desktop — imagen a sangre (720px) con tarjeta blanca flotante a la derecha. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — apilado: imagen 4:3, después título + cuerpo + botón. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

/** Sin enlace "Ver todos" en la cabecera. */
export const SinEnlace = {
  name: 'Sin enlace',
  args: { linkText: '' },
  parameters: { viewport: { value: 'xl' } },
};

/** Contenido personalizado. */
export const ContenidoPersonalizado = {
  name: 'Contenido personalizado',
  args: {
    eyebrow: 'Colecciones premium',
    linkText: 'Ver todas',
    title: 'Gran Reserva\n2018',
    body: 'Una añada excepcional curada durante más de 48 meses en las bodegas naturales de Guijuelo.',
    ctaText: 'Descubrir',
  },
  parameters: { viewport: { value: 'xl' } },
};
