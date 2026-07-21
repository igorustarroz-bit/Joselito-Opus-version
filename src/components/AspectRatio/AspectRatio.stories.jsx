import AspectRatio, { RATIOS } from './AspectRatio.jsx';

const meta = {
  title: 'Componentes/Aspect Ratio',
  component: AspectRatio,
  argTypes: {
    ratio: { control: 'select', options: RATIOS },
  },
  args: { ratio: '1:1' },
};
export default meta;

const Demo = () => (
  <div style={{ background: 'var(--bg-accent-3)', width: '100%', height: '100%' }} />
);

export const Default = {
  render: (args) => (
    <div style={{ width: 240 }}>
      <AspectRatio {...args}>
        <Demo />
      </AspectRatio>
    </div>
  ),
};

export const Ratios = {
  name: 'Todas las proporciones',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
      {RATIOS.map((r) => (
        <div key={r} style={{ width: 160 }}>
          <AspectRatio ratio={r} style={{ borderRadius: 'var(--corner-s)' }}>
            <Demo />
          </AspectRatio>
          <code style={{ fontSize: 12 }}>{r}</code>
        </div>
      ))}
    </div>
  ),
};
