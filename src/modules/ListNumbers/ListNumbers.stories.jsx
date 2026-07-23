import ListNumbers from './ListNumbers.jsx';

const meta = {
  title: 'Módulos/List · Numbers',
  component: ListNumbers,
  globals: { theme: 'light-grey' }, // el módulo fija este subtema en su raíz
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Desktop — cifra a la izquierda, descripción a la derecha. */
export const Desktop = { parameters: { viewport: { value: 'xl' } } };

/** Mobile — cifra y descripción apiladas. */
export const Mobile = { parameters: { viewport: { value: 'xs' } } };
