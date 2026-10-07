import ButtonIcon from '../ButtonIcon/ButtonIcon';
import './BlockRowAddress.css';

/**
 * Fila de dirección guardada (área de cliente): calle (Title/01) con botón para editar/ver a la
 * derecha, código postal y ciudad (Body/04) y titular (Body/04, Neutral 2).
 */
export default function BlockRowAddress({ title = 'Gran Vía, 68 9 C', address = '28013 Madrid, Madrid, ES', user = 'Elmer Fuud', href, onAction, actionLabel = 'Ver dirección', theme, className = '', ...rest }) {
  return (
    <div className={['block-row-address', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="block-row-address__head">
        <p className="block-row-address__title ts-title-01">{title}</p>
        <ButtonIcon type="Terciary" size="S" icon="arrow-right" label={`${actionLabel}: ${title}`} href={href} onClick={onAction} />
      </div>
      <p className="block-row-address__lines ts-body-04">
        <span>{address}</span>
        <span className="block-row-address__user">{user}</span>
      </p>
    </div>
  );
}
