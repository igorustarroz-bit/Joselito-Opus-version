import M22NavigationDirectLink, { STATES, TYPES } from './M22NavigationDirectLink';

export default {
  title: 'Modules/M22-NavigationDirectLink',
  component: M22NavigationDirectLink,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { type: 'Direct Link', soldOut: true, showArrow: true },
  argTypes: { type: { control: 'inline-radio', options: TYPES }, state: { control: 'inline-radio', options: STATES } },
};

export const Default = {};
/** Type=Direct Link · State=Default (Desktop; Mobile con el viewport XS). */
export const DirectLink = {};
/** Type=Direct Link · State=Hover: subtema Dark - Red - Primary. */
export const DirectLinkHover = { args: { state: 'Hover' } };
/** Type=Deploy · State=Default. */
export const Deploy = { args: { type: 'Deploy' } };
export const DeployHover = { args: { type: 'Deploy', state: 'Hover' } };
/** Type=Deploy · State=Deployed: texto e imagen. */
export const Deployed = { args: { type: 'Deploy', state: 'Deployed', title: 'Fernando Bellver' } };
/** Uso real: lista de filas desplegables. */
export const Lista = {
  render: () => ['Etsuro Sotoo', 'Fernando Bellver', 'Jaime Hayon'].map((t) => <M22NavigationDirectLink key={t} type="Deploy" title={t} />),
};
