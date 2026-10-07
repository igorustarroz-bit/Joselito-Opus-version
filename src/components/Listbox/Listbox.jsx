import ListboxItem from '../ListboxItem/ListboxItem';
import './Listbox.css';

/**
 * Panel de lista desplegable: fondo base con borde de 1 px y padding lateral FX-6. Recibe las opciones
 * como `children` (slot de Figma) o como `items` (array de props de listbox_Item_Dropdown).
 */
export default function Listbox({ items, children, label = 'Opciones', theme, className = '', ...rest }) {
  return (
    <div className={['listbox', className].filter(Boolean).join(' ')} role="group" aria-label={label} data-theme={theme} {...rest}>
      {children ?? (items || []).map((it, i) => <ListboxItem key={it.value ?? i} showControl={false} {...it} />)}
    </div>
  );
}
