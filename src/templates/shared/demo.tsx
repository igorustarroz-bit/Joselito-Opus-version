/* Datos de ejemplo compartidos por los templates (solo para Storybook). */
import type { ReactNode } from 'react';
export const grad = (a: string, b: string): ReactNode => (
  <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${a}, ${b})` }} />
);
export const navItems = [
  { label: 'Productos', active: true }, { label: 'Origen' }, { label: 'Excelencia' }, { label: 'Compromisos' }, { label: 'Contacto' },
];
export const footerColumns = [
  { title: 'Productos', links: [{ label: 'Jamón' }, { label: 'Paleta' }, { label: 'Lomo' }, { label: 'Embutidos' }] },
  { title: 'Joselito', links: [{ label: 'Origen' }, { label: 'Excelencia' }, { label: 'Sostenibilidad' }] },
  { title: 'Ayuda', links: [{ label: 'Contacto' }, { label: 'Envíos' }, { label: 'FAQ' }] },
];
export const copyright = '© 2026 Joselito. Todos los derechos reservados.';
