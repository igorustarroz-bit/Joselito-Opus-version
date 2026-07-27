import CardsAccordion from './CardsAccordion.jsx';

const meta = {
  title: 'Módulos/Cards · Accordion',
  component: CardsAccordion,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop — fila horizontal: ficha abierta + paneles colapsados (título rotado + número). */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — pila vertical: ficha abierta arriba, colapsados como barras. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

/** Abre la 2ª ficha por defecto (prop `defaultActive`). */
export const AbreLa2 = {
  name: 'Abre la 2ª',
  args: { defaultActive: 1 },
  parameters: { viewport: { value: 'xl' } },
};

/** Carrousel — variante `Type=Carrousel`: carril con ficha central + vecinas asomando y flechas prev/next. */
export const Carrousel = {
  args: { type: 'carrousel' },
  parameters: { viewport: { value: 'xl' } },
};

/** Carrousel · Mobile — misma variante, apilada; la siguiente ficha asoma por la derecha. */
export const CarrouselMobile = {
  name: 'Carrousel · Mobile',
  args: { type: 'carrousel' },
  parameters: { viewport: { value: 'xs' } },
};
