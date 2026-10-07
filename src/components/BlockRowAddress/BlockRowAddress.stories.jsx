import BlockRowAddress from './BlockRowAddress';

export default { title: 'Components/Block Row Address', component: BlockRowAddress, parameters: { defaultTheme: 'light-white' }, decorators: [(Story) => <div style={{ width: 774, maxWidth: '100%' }}><Story /></div>] };

export const Default = {};
/** Device=Desktop, Type=Horizontal */
export const DesktopHorizontal = { args: { href: '#' } };
