import BrandLogo from './BrandLogo.jsx';

const meta = {
  title: 'Componentes/Brand Logo',
  component: BrandLogo,
  argTypes: {
    variant: { control: 'radio', options: ['horizontal', 'isotipo'] },
    height: { control: { type: 'range', min: 16, max: 160, step: 4 } },
    color: { control: 'color' },
  },
  args: { variant: 'horizontal', height: 48 },
};
export default meta;

export const Default = {};

export const Variantes = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
      <div style={{ textAlign: 'center' }}>
        <BrandLogo variant="horizontal" height={48} />
        <div style={{ fontSize: 11, marginTop: 8 }}>horizontal</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <BrandLogo variant="isotipo" height={64} />
        <div style={{ fontSize: 11, marginTop: 8 }}>isotipo</div>
      </div>
    </div>
  ),
};

export const SobreFondo = {
  name: 'Sobre fondo (currentColor)',
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <div style={{ background: 'var(--bg-base)', color: 'var(--text-base)', padding: 24, borderRadius: 8, border: '1px solid var(--stroke-neutral-3)' }}>
        <BrandLogo height={40} />
      </div>
      <div data-theme="dark-black-neutral" style={{ background: 'var(--bg-base)', color: 'var(--text-base)', padding: 24, borderRadius: 8 }}>
        <BrandLogo height={40} />
      </div>
      <div style={{ background: 'var(--color-primary-40)', color: 'var(--color-neutral-white)', padding: 24, borderRadius: 8 }}>
        <BrandLogo variant="isotipo" height={48} />
      </div>
    </div>
  ),
};
