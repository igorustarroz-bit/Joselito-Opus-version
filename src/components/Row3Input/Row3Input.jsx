import Input from '../Input/Input';
import '../Row2Input/RowInputs.css';

/** Fila de tres campos (Input Big sin mensaje) con separación FX-4; se apilan en móvil. */
export default function Row3Input({ fields = [{ label: 'Label' }, { label: 'Label' }, { label: 'Label' }], children, theme, className = '', ...rest }) {
  return (
    <div className={['row-inputs', 'row-inputs--3', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {children ?? fields.slice(0, 3).map((f, i) => <Input key={i} showInfo={false} {...f} />)}
    </div>
  );
}
