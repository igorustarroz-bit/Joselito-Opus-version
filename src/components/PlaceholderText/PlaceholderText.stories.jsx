import PlaceholderText from './PlaceholderText.jsx';

const meta = {
  title: 'Componentes/UI14-Placeholder-Text',
  component: PlaceholderText,
  argTypes: {
    children: { control: 'text' },
    textStyle: { control: 'select', options: ['body-1', 'body-2', 'body-3', 'body-4', 'label-1', 'label-2'] },
  },
  args: { children: 'Text', textStyle: 'body-2' },
};
export default meta;

export const Default = {};
