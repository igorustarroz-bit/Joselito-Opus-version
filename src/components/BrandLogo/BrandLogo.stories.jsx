import BrandLogo, { HORIZONTAL, LOGO_NAMES, Logo } from './BrandLogo';

export default {
  title: 'Brand Assets/Brand Logo',
  component: BrandLogo,
  args: { horizontal: 'Yes', title: 'Joselito' },
  argTypes: { horizontal: { control: 'inline-radio', options: HORIZONTAL }, width: { control: { type: 'number', min: 40, max: 600 } } },
};

export const Default = {};
export const HorizontalYes = { args: { horizontal: 'Yes' } };
export const HorizontalNo = { args: { horizontal: 'No' } };

const grid = (names) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
    {names.map((n) => (
      <figure key={n} style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: n.startsWith('logo-junta') ? 'var(--backgrounds-inverse)' : undefined, width: '100%' }}>
          <Logo name={n} title={n} style={{ maxHeight: 140, width: 'auto', maxWidth: '100%' }} />
        </div>
        <figcaption className="ts-body-01" style={{ textAlign: 'center', wordBreak: 'break-word' }}>{n}</figcaption>
      </figure>
    ))}
  </div>
);

/** Logos, sellos y certificaciones de Figma (Brand Assets). Visa y Ekomi son raster: están en `src/assets/images`. */
export const Galeria = { render: () => grid(LOGO_NAMES.filter((n) => !n.startsWith('firma-'))) };

/** Firmas de chefs (9). Color `--texts-accent-base`. */
export const Firmas = { render: () => grid(LOGO_NAMES.filter((n) => n.startsWith('firma-'))) };
