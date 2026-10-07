import AspectRatio from '../AspectRatio/AspectRatio';
import CheckboxRadio from '../CheckboxRadio/CheckboxRadio';
import Icon from '../Icon/Icon';
import './ListboxItem.css';

export const SELECTIONS = ['Radio Button', 'Checkbox', 'Delete'];
export const STATUSES = ['Default', 'Hover', 'Selected'];

/**
 * Opción de una lista desplegable (listbox_Item_Dropdown): texto (Body/03) con descripción e imagen
 * opcionales y, a la derecha, un radio, una casilla o una X de borrar. Con radio/casilla toda la fila es
 * la etiqueta del input (clic en cualquier punto). `status` solo fuerza la apariencia en documentación.
 */
export default function ListboxItem({
  text = 'Label',
  description = 'Description',
  showDescription = false,
  showImage = false,
  image,
  imageAlt = '',
  selection = 'Radio Button',
  showControl = true,
  checked,
  defaultChecked,
  onChange,
  name,
  value,
  onDelete,
  status,
  theme,
  className = '',
  ...rest
}) {
  const isDelete = selection === 'Delete';
  const cls = ['listbox-item', status === 'Hover' ? 'is-hover' : '', className].filter(Boolean).join(' ');
  const body = (
    <span className="listbox-item__content">
      {showImage && <AspectRatio className="listbox-item__img" size="1:1" src={image} alt={imageAlt} />}
      <span className="listbox-item__texts">
        <span className="listbox-item__label ts-body-03">{text}</span>
        {showDescription && <span className="listbox-item__desc ts-body-03">{description}</span>}
      </span>
    </span>
  );
  if (isDelete || !showControl) {
    return (
      <div className={cls} data-theme={theme} {...rest}>
        {body}
        {isDelete && showControl && (
          <button type="button" className="listbox-item__delete" aria-label={`Eliminar ${text}`} onClick={onDelete}>
            <Icon name="x" size="S" />
          </button>
        )}
      </div>
    );
  }
  const forced = status ? (status === 'Selected' ? 'Selected' : status === 'Hover' ? 'Hover' : 'Not Selected') : undefined;
  return (
    <label className={cls} data-theme={theme} {...rest}>
      {body}
      <CheckboxRadio type={selection === 'Checkbox' ? 'Checkboxes' : 'Radio'} state={forced} checked={checked}
        defaultChecked={defaultChecked} onChange={onChange} name={name} value={value} className={status === 'Hover' ? 'is-hover' : ''} />
    </label>
  );
}
