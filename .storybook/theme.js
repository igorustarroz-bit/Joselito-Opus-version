// Tema de la interfaz de Storybook (barra, panel y páginas de doc): Inter por defecto + logo del cliente.
// Las stories usan las fuentes del proyecto (tokens), no esta.
import { create } from 'storybook/theming';

export const hanzoTheme = create({
  base: 'light',
  brandTitle: 'Joselito · Design system',
  // Logo del cliente arriba de la barra lateral. public/brand-logo.svg: el scaffold deja un provisional con el
  // nombre; en el paso de vectores de Brand Assets se sustituye por el máster «Brand Logo» (versión para fondo claro).
  brandImage: 'brand-logo.svg',
  brandUrl: './',
  brandTarget: '_self',
  fontBase: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  fontCode: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  colorSecondary: '#116dff',
  appBorderRadius: 6,
});
