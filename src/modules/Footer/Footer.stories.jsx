import Footer from './Footer.jsx';

const meta = {
  title: 'Módulos/Navigation · Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Máster por defecto (Light-White). Usa el selector de breakpoint de la toolbar
 *  para ver desktop (≥768) y mobile (acordeón). */
export const Default = {};

/** Subtema oscuro: el mismo módulo bajo `data-theme` heredado del contenedor. */
export const SubtemaOscuro = {
  name: 'Subtema oscuro',
  render: (args) => (
    <div data-theme="dark-black-neutral">
      <Footer {...args} />
    </div>
  ),
};
