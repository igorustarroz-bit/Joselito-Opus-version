import BlockAddress from './BlockAddress';

export default { title: 'Components/Block Address', component: BlockAddress, parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 342, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
/** Show CreditCard = false (dirección de envío). */
export const SinTarjeta = { args: { title: 'Dirección de envío', showCreditCard: false } };
