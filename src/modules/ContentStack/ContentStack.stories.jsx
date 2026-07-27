import ContentStack from './ContentStack.jsx';

const meta = {
  title: 'Módulos/Content · Stack (Text + Image)',
  component: ContentStack,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista fluida (sin viewport fijo) para comprobar el responsive. */
export const Default = {};

/** Desktop — una fila abierta (dos columnas) + filas colapsadas. Pulsa una fila para abrirla. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — apilado: texto sobre imagen en la fila abierta. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };

/** Segunda fila abierta por defecto (prop `defaultActive`). */
export const AbiertaLa3 = {
  name: 'Abre la 3ª',
  args: { defaultActive: 2 },
  parameters: { viewport: { value: 'xl' } },
};
