import M01Navigation, { MODES } from './M01Navigation';
import hero from '../../assets/images/m14-hero-sectionheader.webp';

export default {
  title: 'Modules/M01-Navigation',
  component: M01Navigation,
  parameters: { layout: 'fullscreen', defaultTheme: 'light-white' },
  args: { mode: 'Light' },
  argTypes: { mode: { control: 'inline-radio', options: MODES } },
};

const onHero = (Story) => <div style={{ background: `center / cover url(${hero})`, minHeight: 200 }}><Story /></div>;
export const Default = {};
/** Device=Desktop (desde 960 px) · Mode=Light */
export const DesktopLight = {};
export const DesktopDark = { args: { mode: 'Dark' }, decorators: [onHero] };
export const DesktopGrey = { args: { mode: 'Grey' }, decorators: [(Story) => <div style={{ background: 'var(--backgrounds-neutral-1)' }}><Story /></div>] };
/** Device=Mobile (ver con el viewport XS): hamburguesa, logo y buscar/cesta. */
export const MobileLight = {};
export const MobileDark = { args: { mode: 'Dark' }, decorators: [onHero] };
export const MobileGrey = { args: { mode: 'Grey' } };
