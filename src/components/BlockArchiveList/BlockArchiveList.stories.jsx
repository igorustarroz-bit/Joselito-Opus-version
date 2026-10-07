import BlockArchiveList from './BlockArchiveList';

export default { title: 'Components/Block Archive List', component: BlockArchiveList, parameters: { defaultTheme: 'light-white' }, args: { href: '#' } };

export const Default = {};
export const LeftInactive = { args: { type: 'Left' } };
export const LeftActive = { args: { type: 'Left', active: true } };
export const RightInactive = { args: { type: 'Right', label: 'Collection 2008', title: 'Vista Alegre' } };
export const RightActive = { args: { type: 'Right', label: 'Collection 2008', title: 'Vista Alegre', active: true } };
/** Device=Mobile (ver con el viewport XS): etiqueta encima en Neutral 2 y nombre en Texts/Base. */
export const Mobile = { args: { label: 'Collection 2020', title: 'Vista Alegre' } };
