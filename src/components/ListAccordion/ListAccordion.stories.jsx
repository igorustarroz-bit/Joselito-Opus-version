import ListAccordion from './ListAccordion';

import meta from './ListAccordion.meta.json';
import { argTypesFromMeta } from '@/docs/DocKit';

export default { title: 'Components/list_accordion', component: ListAccordion, argTypes: argTypesFromMeta(meta), parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 368, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
export const Preguntas = { args: { items: [{ title: 'Envíos' }, { title: 'Devoluciones', defaultOpen: true }, { title: 'Formas de pago' }] } };
