import ListAccordion from './ListAccordion';

export default { title: 'Components/list_accordion', component: ListAccordion, parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 368, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
export const Preguntas = { args: { items: [{ title: 'Envíos' }, { title: 'Devoluciones', defaultOpen: true }, { title: 'Formas de pago' }] } };
