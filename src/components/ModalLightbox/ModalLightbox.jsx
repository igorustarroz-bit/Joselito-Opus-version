import { useEffect, useId, useRef } from 'react';
import Alert from '../Alert/Alert';
import AspectRatio from '../AspectRatio/AspectRatio';
import Button from '../Button/Button';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import ListboxItem from '../ListboxItem/ListboxItem';
import Overlay from '../Overlay/Overlay';
import RowButtons from '../RowButtons/RowButtons';
import videoPoster from '../../assets/images/modal-lightbox.webp';
import productImg from '../../assets/images/modal-lightbox-3.webp';
import './ModalLightbox.css';

export const STATUSES = ['Collapsed', 'Basic', 'Ticket', 'List', 'Video'];
const TEXT = 'Este producto se gestiona directamente desde la fábrica. Para comprar este producto llámanos al +34 923 580 375 o Whatsapp  + 34 638 124 648.\n\nAtendemos las consultas lunes a sábado, de 9:00 a 18:00.';
const OPTIONS = [{ text: '50g', description: '27,00 €' }, { text: '100g', description: '54,00 €' }, { text: '150g', description: '81,00 €' }, { text: '200g', description: '108,00 €' }];

/**
 * Ventana emergente. `Basic`: cabecera (título + cerrar) y texto. `Ticket`: además, pie con dos botones.
 * `List`: opciones de selección única (listbox_Item_Dropdown) + pie. `Video`: vídeo/imagen 16:9 con
 * botón de cerrar encima. `Collapsed`: barra de producto (foto, nombre, precio, "elige").
 * Con `modal` se muestra centrada sobre Overlay, con Esc y clic fuera para cerrar y foco atrapado en el diálogo.
 */
export default function ModalLightbox({
  status = 'Basic', title = 'Title', text = TEXT, children, options = OPTIONS, name, value, onChange,
  primaryText = 'SEGUIR COMPRANDO', secondaryText = 'IR A LA CESTA', onPrimary, onSecondary,
  video, poster = videoPoster, product = { image: productImg, name: 'Jamón Gran Reserva', price: '599,00 €', cta: 'elige' }, onChoose,
  showAlert = false, alertProps, modal = false, open = true, onClose, theme, className = '', ...rest
}) {
  const id = useId();
  const ref = useRef(null);
  useEffect(() => {
    if (!modal || !open) return undefined;
    const prev = document.activeElement;
    ref.current?.querySelector('button, [href], input, select, textarea')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key !== 'Tab' || !ref.current) return;
      const f = [...ref.current.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select, textarea')];
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [modal, open, onClose]);
  if (!open) return null;

  if (status === 'Collapsed') {
    return (
      <div className={['modal-collapsed', 'fx-elevation-on-light-m', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
        <div className="modal-collapsed__info">
          {product.image && <AspectRatio className="modal-collapsed__img" size="1:1" src={product.image} alt="" />}
          <span className="modal-collapsed__texts ts-body-02">
            <span className="modal-collapsed__name">{product.name}</span>
            <span className="modal-collapsed__price">{product.price}</span>
          </span>
        </div>
        <Button type="Primary" size="S" text={product.cta} onClick={onChoose} />
      </div>
    );
  }

  const close = <ButtonIcon className="modal__close" type="Terciary" size="XS" icon="x" label="Cerrar" onClick={onClose} />;
  const box = status === 'Video' ? (
    <div className={['modal', 'modal--video', className].filter(Boolean).join(' ')} ref={ref} role="dialog" aria-modal={modal || undefined} aria-label={title} data-theme={theme} {...rest}>
      {video ? <video className="modal__video" src={video} poster={poster} controls /> : <AspectRatio size="16:9" src={poster} alt="" />}
      {close}
    </div>
  ) : (
    <div className={['modal', className].filter(Boolean).join(' ')} ref={ref} role="dialog" aria-modal={modal || undefined} aria-labelledby={`${id}-t`} data-theme={theme} {...rest}>
      {showAlert && <Alert {...alertProps} />}
      <div className="modal__header">
        <p id={`${id}-t`} className="modal__title ts-body-03">{title}</p>
        {close}
      </div>
      <div className="modal__body">
        {children ?? (status === 'List'
          ? <div className="modal__list" role="radiogroup" aria-labelledby={`${id}-t`}>
              {options.map((o, i) => <ListboxItem key={i} showDescription name={name ?? `${id}-opt`} value={o.value ?? o.text}
                checked={value !== undefined ? value === (o.value ?? o.text) : undefined} onChange={() => onChange?.(o.value ?? o.text)} {...o} />)}
            </div>
          : <p className="modal__text ts-body-02">{text}</p>)}
      </div>
      {(status === 'Ticket' || status === 'List') && (
        <div className="modal__footer">
          <RowButtons className="modal__buttons">
            <Button type="Primary" size="M" text={primaryText} onClick={onPrimary} />
            <Button type="Secondary" size="M" text={secondaryText} onClick={onSecondary} />
          </RowButtons>
        </div>
      )}
    </div>
  );
  return modal ? <Overlay onClose={onClose}><div className="modal__center">{box}</div></Overlay> : box;
}
