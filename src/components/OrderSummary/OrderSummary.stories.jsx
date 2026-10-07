import OrderSummary from './OrderSummary';
import photo from '../../assets/images/card-product.webp';

const products = Array.from({ length: 4 }, () => ({ image: photo }));
export default { title: 'Components/Order Summary', component: OrderSummary, parameters: { defaultTheme: 'light-white' }, args: { products } };

export const Default = { decorators: [(Story) => <div style={{ width: 774, maxWidth: '100%' }}><Story /></div>] };
export const Desktop = { decorators: [(Story) => <div style={{ width: 774, maxWidth: '100%' }}><Story /></div>] };
export const Mobile = { decorators: [(Story) => <div style={{ width: 390 }}><Story /></div>] };
