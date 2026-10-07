import BlockAddress from './BlockAddress';

import meta from './BlockAddress.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/Block Address', component: BlockAddress, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 342, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
/** Show CreditCard = false (dirección de envío). */
export const SinTarjeta = { args: { title: 'Dirección de envío', showCreditCard: false } };
