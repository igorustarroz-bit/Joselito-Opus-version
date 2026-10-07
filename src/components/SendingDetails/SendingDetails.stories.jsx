import SendingDetails from './SendingDetails';

export default { title: 'Components/Sending Details', component: SendingDetails, parameters: { defaultTheme: 'light-white' } };

export const Default = { decorators: [(Story) => <div style={{ width: 693, maxWidth: '100%' }}><Story /></div>] };
/** Device=Desktop: dos columnas cuando el bloque mide 600 px o más. */
export const Desktop = { decorators: [(Story) => <div style={{ width: 693, maxWidth: '100%' }}><Story /></div>] };
/** Device=Mobile: una columna. */
export const Mobile = { decorators: [(Story) => <div style={{ width: 390, maxWidth: '100%' }}><Story /></div>] };
