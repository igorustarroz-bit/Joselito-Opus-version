import Menu from './Menu.jsx';

const meta = {
  title: 'Módulos/Navigation · Menu',
  component: Menu,
  parameters: { layout: 'fullscreen' },
};
export default meta;

/** Default — vista por defecto (Product), fluida para comprobar el responsive. */
export const Default = { args: { type: 'product' } };

/** Desktop · Product — cabecera + lista de productos + imagen + destacado
 *  (máster 58182:4348). Ver en viewport ≥768. */
export const DesktopProduct = {
  name: 'Desktop · Product',
  args: { type: 'product' },
  parameters: { viewport: { value: 'xl' } },
};

/** Desktop · About — cabecera + fila de 4 tarjetas (máster 58182:4349). */
export const DesktopAbout = {
  name: 'Desktop · About',
  args: { type: 'about' },
  parameters: { viewport: { value: 'xl' } },
};

/** Mobile · Default — cajón con acordeón de secciones cerrado (máster 58512:86748). */
export const MobileDefault = {
  name: 'Mobile · Default',
  parameters: { viewport: { value: 'xs' } },
};

/** Mobile · Product — sección PRODUCTOS abierta (máster 58525:37049). */
export const MobileProduct = {
  name: 'Mobile · Product',
  args: { defaultOpen: 'productos' },
  parameters: { viewport: { value: 'xs' } },
};

/** Mobile · About — sección EXCELENCIA abierta con grid de tarjetas (máster 58525:37139). */
export const MobileAbout = {
  name: 'Mobile · About',
  args: { defaultOpen: 'excelencia' },
  parameters: { viewport: { value: 'xs' } },
};

/** Subtema oscuro: el mismo módulo bajo `data-theme` heredado del contenedor. */
export const SubtemaOscuro = {
  name: 'Subtema oscuro',
  args: { type: 'product' },
  parameters: { viewport: { value: 'xl' } },
  render: (args) => (
    <div data-theme="dark-black-neutral">
      <Menu {...args} />
    </div>
  ),
};
