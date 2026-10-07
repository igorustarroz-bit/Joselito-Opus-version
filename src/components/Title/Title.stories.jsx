import Title from './Title';

import meta from './Title.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default {
  title: 'Components/Title',
  component: Title, argTypes: argTypesFromMeta(meta),
  parameters: { defaultTheme: 'light-white', layout: 'fullscreen' },
  args: { eyebrow: 'Nuestra colección', title: 'Lorem ipsum dolor sit amet cucuster', showTitle: true, showLink: true, linkText: 'Ver todos', href: '#' },
  decorators: [(Story) => <div className="wrapper"><Story /></div>],
};

export const Default = {};

/** Device=Desktop (1280 px de contenido). */
export const Desktop = {};

/** Device=Mobile (ver con el viewport XS): en Figma el máster incluye el margen del wrapper y un espacio superior (Spacers Responsive/11). */
export const Mobile = {
  args: { eyebrow: 'Perfil sensorial' },
  decorators: [(Story) => <div style={{ paddingTop: 'var(--layout-spacers-responsive-11)' }}><Story /></div>],
};

export const SinEnlace = { args: { showLink: false } };
export const SinTitulo = { args: { showTitle: false } };
