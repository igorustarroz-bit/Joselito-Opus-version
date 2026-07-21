import Icon, { ICON_NAMES, ICON_SIZES } from './Icon.jsx';

const meta = {
  title: 'Componentes/Icon',
  component: Icon,
  argTypes: {
    name: { control: 'select', options: ICON_NAMES },
    size: { control: 'select', options: [...Object.keys(ICON_SIZES), 48, 64] },
    color: { control: 'color' },
  },
  args: { name: ICON_NAMES[0], size: 'M' },
};
export default meta;

export const Default = {};

export const Sizes = {
  name: 'Tamaños (Icon Sizer)',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
      {Object.entries(ICON_SIZES).map(([k, px]) => (
        <div key={k} style={{ textAlign: 'center' }}>
          <Icon name="Star" size={k} />
          <div style={{ fontSize: 11, marginTop: 6 }}>{k} · {px}px</div>
        </div>
      ))}
    </div>
  ),
};

export const Color = {
  name: 'Color (currentColor)',
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Icon name="HeartStraight" size="L" style={{ color: 'var(--color-primary-40)' }} />
      <Icon name="Check" size="L" style={{ color: 'var(--color-system-success-02)' }} />
      <Icon name="Star" size="L" style={{ color: 'var(--color-secondary-3-50)' }} />
    </div>
  ),
};

export const Gallery = {
  name: 'Galería completa',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 8 }}>
      {ICON_NAMES.map((n) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 10, border: '1px solid var(--stroke-neutral-3)', borderRadius: 6 }}>
          <Icon name={n} size="M" />
          <code style={{ fontSize: 10, textAlign: 'center', wordBreak: 'break-word' }}>{n}</code>
        </div>
      ))}
    </div>
  ),
};
