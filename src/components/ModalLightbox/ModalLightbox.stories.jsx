import { useState } from 'react';
import ModalLightbox, { STATUSES } from './ModalLightbox';
import Button from '../Button/Button';

export default {
  title: 'Components/Modal_Lightbox',
  component: ModalLightbox,
  parameters: { defaultTheme: 'light-white' },
  args: { status: 'Basic', title: 'Title' },
  argTypes: { status: { control: 'inline-radio', options: STATUSES } },
  decorators: [(Story) => <div style={{ width: 624, maxWidth: '100%' }}><Story /></div>],
};

export const Default = {};
export const DesktopCollapsed = { args: { status: 'Collapsed' } };
export const DesktopBasic = { args: { status: 'Basic' } };
export const DesktopTicket = { args: { status: 'Ticket' } };
export const DesktopList = { args: { status: 'List' } };
export const DesktopVideo = { args: { status: 'Video' } };
/** Device=Mobile: 342 px de ancho (la barra Collapsed oculta la foto por debajo de 768 px). */
export const MobileBasic = { args: { status: 'Basic' }, decorators: [(Story) => <div style={{ width: 342 }}><Story /></div>] };
export const MobileCollapsed = { args: { status: 'Collapsed' }, decorators: [(Story) => <div style={{ width: 342 }}><Story /></div>] };

/** Como modal real: abre con el botón; Esc, clic fuera o la X lo cierran. */
export const ComoModal = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button text="Abrir" onClick={() => setOpen(true)} />
        <ModalLightbox {...args} status="Ticket" modal open={open} onClose={() => setOpen(false)} onPrimary={() => setOpen(false)} />
      </>
    );
  },
};
