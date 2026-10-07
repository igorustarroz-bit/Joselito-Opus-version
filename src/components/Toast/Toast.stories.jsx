import Toast from './Toast';

export default { title: 'Components/Toast', component: Toast, parameters: { defaultTheme: 'light-grey' }, decorators: [(Story) => <div style={{ width: 343, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
/** Segundo aviso de tres. */
export const SegundoPaso = { args: { current: 1 } };
