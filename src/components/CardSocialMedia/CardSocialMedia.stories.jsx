import CardSocialMedia from './CardSocialMedia';

export default { title: 'Components/Card-Social-media', component: CardSocialMedia, parameters: { defaultTheme: 'light-white' } };

export const Default = { decorators: [(Story) => <div style={{ width: 204 }}><Story /></div>] };
export const VerticalYes = { args: { vertical: true }, decorators: [(Story) => <div style={{ width: 204 }}><Story /></div>] };
export const VerticalNo = { args: { vertical: false }, decorators: [(Story) => <div style={{ width: 268 }}><Story /></div>] };
