import OrderSummary from './OrderSummary';
import photo from '../../assets/images/card-product.webp';

import meta from './OrderSummary.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';
import { axisStory } from '@/docs/axis';

const products = Array.from({ length: 4 }, () => ({ image: photo }));
export default { title: 'Components/Order Summary', component: OrderSummary, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, args: { products } };

export const Default = { decorators: [(Story) => <div style={{ width: 774, maxWidth: '100%' }}><Story /></div>] };
export const Desktop = { decorators: [(Story) => <div style={{ width: 774, maxWidth: '100%' }}><Story /></div>] };
export const Mobile = { decorators: [(Story) => <div style={{ width: 390 }}><Story /></div>] };

/** Eje «Property 1»: todas las opciones juntas (página Doc → Variantes). */
export const AxisProperty1 = axisStory(OrderSummary, [
  { label: "Desktop", story: Desktop },
  { label: "Mobile", story: Mobile },
], { name: "Eje · Property 1" });
