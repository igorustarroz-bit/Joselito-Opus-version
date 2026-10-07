import ErrorPicture from './ErrorPicture';

export default { title: 'Components/404_picture', component: ErrorPicture, parameters: { defaultTheme: 'light-white' } };

const desk = [(Story) => <div style={{ width: 377 }}><Story /></div>];
const mob = [(Story) => <div style={{ width: 280 }}><Story /></div>];
export const Default = { decorators: desk };
export const Desktop404 = { args: { type: '404' }, decorators: desk };
export const Desktop500 = { args: { type: '500' }, decorators: desk };
export const Desktop300 = { args: { type: '300' }, decorators: desk };
export const Mobile404 = { args: { type: '404' }, decorators: mob };
export const Mobile500 = { args: { type: '500' }, decorators: mob };
export const Mobile300 = { args: { type: '300' }, decorators: mob };
