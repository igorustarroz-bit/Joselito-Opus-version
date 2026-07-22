import TextOnly from './TextOnly.jsx';

const p1 = 'Lorem ipsum dolor sit amet consectetur. Tempor enim quis turpis amet nunc sed tincidunt egestas. Arcu pulvinar neque a est amet morbi.';
const p2 = 'Morbi mauris at fermentum sapien massa orci. Tellus nulla sit senectus rhoncus facilisis convallis. Volutpat eget sit eget quis laoreet tortor.';

const meta = {
  title: 'Módulos/Content · Text only',
  component: TextOnly,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const DosColumnas = { args: { label: 'This is a label', title: 'Lorem ipsum dolor sit amet consectetur.', columns: [[p1, p2], [p1]] } };
export const UnaColumna = { args: { label: 'This is a label', title: 'Arte e instinto', columns: [[p1, p2]] } };
export const Split = { args: { variant: 'split', label: 'Lorem ipsum', title: 'Lorem ipsum dolor sit amet consectetur.', columns: [[p1]] } };
