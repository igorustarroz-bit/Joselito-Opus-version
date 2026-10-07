import CheckboxList from '../CheckboxList/CheckboxList';
import Input from '../Input/Input';
import RowButtons from '../RowButtons/RowButtons';
import Button from '../Button/Button';
import './Form.css';

/**
 * Formulario genérico: cabecera (título Title/01 + descripción), cliente identificado opcional, campos
 * (slot de Input), casillas (Checkbox-List) y fila de botones (RowButtons). Es un `<form>` real.
 */
export default function Form({
  title = 'Title Form', description = 'Description', showHeader = true, showDescription = true,
  showClient = false, client = 'cliente@ejemplo.es', inputs = [{ label: 'Label' }, { label: 'Label' }], children,
  showCheckbox = true, checkboxes = ['Label'], showButtonRow = true, primaryText = 'Button', secondaryText = 'Button',
  onSubmit, onCancel, theme, className = '', ...rest
}) {
  return (
    <form className={['form', className].filter(Boolean).join(' ')} data-theme={theme} noValidate
      onSubmit={(e) => { if (onSubmit) { e.preventDefault(); onSubmit(new FormData(e.currentTarget)); } }} {...rest}>
      {showHeader && (
        <div className="form__header">
          <h2 className="form__title ts-title-01">{title}</h2>
          {showDescription && <p className="form__desc ts-body-03">{description}</p>}
        </div>
      )}
      {showClient && <p className="form__client ts-body-03">{client}</p>}
      <div className="form__inputs">
        {children ?? inputs.map((f, i) => <Input key={i} showInfo={false} {...f} />)}
      </div>
      {showCheckbox && <CheckboxList items={checkboxes} />}
      {showButtonRow && (
        <RowButtons className="form__buttons">
          <Button type="Primary" size="M" text={primaryText} htmlType="submit" />
          <Button type="Secondary" size="M" text={secondaryText} onClick={onCancel} />
        </RowButtons>
      )}
    </form>
  );
}
