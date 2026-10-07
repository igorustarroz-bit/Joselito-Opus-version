import OrderByDay from './OrderByDay';
import photo from '../../assets/images/card-product.webp';

import meta from './OrderByDay.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

const products = Array.from({ length: 4 }, () => ({ image: photo }));
export default { title: 'Components/Order by Day', component: OrderByDay, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, args: { products, href: '#' } };

export const Default = { decorators: [(Story) => <div style={{ width: 774, maxWidth: '100%' }}><Story /></div>] };
export const DesktopHorizontal = { decorators: [(Story) => <div style={{ width: 774, maxWidth: '100%' }}><Story /></div>] };
/** Device=Mobile: las tarjetas se desplazan en horizontal (por debajo de 481 px). */
export const MobileHorizontal = { decorators: [(Story) => <div style={{ width: 390 }}><Story /></div>] };

/** Eje «Type»: todas las opciones juntas (página Doc → Variantes). */
export const AxisType = axisStory(OrderByDay, [
  { label: "Horizontal", story: DesktopHorizontal },
], { name: "Eje · Type" });
