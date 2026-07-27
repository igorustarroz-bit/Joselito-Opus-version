import ProductAccordion from './ProductAccordion.jsx';

const meta = {
  title: 'Módulos/Cards · Accordion (colección)',
  component: ProductAccordion,
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
