import IntroText from './IntroText.jsx';

const meta = {
  title: 'Módulos/Content · Intro text',
  component: IntroText,
  parameters: { layout: 'fullscreen' },
  args: {
    eyebrow: 'Un legado único',
    title: 'Seis generaciones y más de 150 años de historia han convertido el tiempo en el mayor valor de Joselito',
    body: 'En la misma dehesa, tradición y saber hacer dan vida a un jamón único, fruto de aquello que nunca puede acelerarse.',
    boxes: [{ label: 'Email', value: 'reservas@joselito.com' }, { label: 'Teléfono', value: '619 160 052' }],
    buttonText: 'Nuestra historia',
  },
};
export default meta;

export const Default = {};
export const SoloTexto = { args: { boxes: [], buttonText: '' } };
