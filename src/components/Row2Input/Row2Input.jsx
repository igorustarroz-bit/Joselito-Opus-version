import Input from '../Input/Input';
import './RowInputs.css';

/** Fila de dos campos (Input Big sin mensaje) con separación FX-4; se apilan en móvil. `fields` = props de cada Input, o hijos. */
export default function Row2Input({ fields = [{ label: 'Label' }, { label: 'Label' }], children, theme, className = '', ...rest }) {
  return (
    <div className={['row-inputs', 'row-inputs--2', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {children ?? fields.slice(0, 2).map((f, i) => <Input key={i} showInfo={false} {...f} />)}
    </div>
  );
}
