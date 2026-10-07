import CheckboxLabel from '../CheckboxLabel/CheckboxLabel';
import './CheckboxList.css';

/** Lista de Checkbox-Label: vertical (FX-2) u horizontal (FX-4, salta de línea). `items` o hijos (slot). */
export default function CheckboxList({ vertical = true, items = ['Label'], children, name, label = 'Opciones', theme, className = '', ...rest }) {
  return (
    <div className={['checkbox-list', vertical ? '' : 'checkbox-list--horizontal', className].filter(Boolean).join(' ')} role="group" aria-label={label} data-theme={theme} {...rest}>
      {children ?? items.map((t, i) => <CheckboxLabel key={i} text={typeof t === 'string' ? t : t.text} name={name} {...(typeof t === 'object' ? t : {})} />)}
    </div>
  );
}
