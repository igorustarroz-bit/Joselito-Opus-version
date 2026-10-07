import CardCarrusel from './CardCarrusel';

export default { title: 'Components/Card Carrusel', component: CardCarrusel, parameters: { defaultTheme: 'light-white' } };

export const Default = { decorators: [(Story) => <div style={{ width: 1000, maxWidth: '100%' }}><Story /></div>] };
/** Device=Desktop: a partir de 700 px de ancho de la tarjeta. */
export const Desktop = { decorators: [(Story) => <div style={{ width: 1000, maxWidth: '100%' }}><Story /></div>] };
/** Device=Mobile: tarjeta estrecha (249 px en Figma). */
export const Mobile = { decorators: [(Story) => <div style={{ width: 249 }}><Story /></div>] };
