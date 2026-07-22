import Navigation from './Navigation.jsx';

const meta = {
  title: 'Módulos/Navigation · Header',
  component: Navigation,
  parameters: { layout: 'fullscreen' },
  argTypes: { mode: { control: 'radio', options: ['light', 'dark'] }, cartCount: { control: 'number' } },
  args: { mode: 'light', cartCount: 3 },
};
export default meta;

export const Light = { args: { mode: 'light' } };
export const Dark = {
  args: { mode: 'dark' },
  render: (a) => <div style={{ background: 'var(--color-neutral-10)' }}><Navigation {...a} /></div>,
};
