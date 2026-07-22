import Title from './Title.jsx';

const meta = {
  title: 'Componentes/Title',
  component: Title,
  argTypes: {
    children: { control: 'text' },
    showLink: { control: 'boolean' },
    linkText: { control: 'text' },
  },
  args: { children: 'Nuestra colección', showLink: true, linkText: 'Ver todos' },
};
export default meta;

export const Default = {
  render: (args) => <div style={{ maxWidth: 640 }}><Title {...args} /></div>,
};

export const SinEnlace = {
  render: () => <div style={{ maxWidth: 640 }}><Title showLink={false}>Nuestra historia</Title></div>,
};
