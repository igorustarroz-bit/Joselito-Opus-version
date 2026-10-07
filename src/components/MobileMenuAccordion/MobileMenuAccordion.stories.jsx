import MobileMenuAccordion from './MobileMenuAccordion';

export default {
  title: 'Components/mobile_menu_accordion',
  component: MobileMenuAccordion,
  parameters: { defaultTheme: 'light-white' },
  args: { title: 'PRODUCTOS' },
  decorators: [(Story) => <div style={{ width: 348, maxWidth: '100%' }}><Story /></div>],
};

export const Default = {};
export const StateClose = {};
export const StateOpen1 = { args: { defaultOpen: true, content: 'links' } };
export const StateOpen2 = { args: { defaultOpen: true, content: 'photos' } };
