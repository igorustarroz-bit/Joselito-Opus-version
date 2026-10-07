import Input from '../Input/Input';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

export { STATES } from '../Input/Input';

/**
 * Campo con botón de enviar pegado a la derecha (newsletter, código de descuento): Input + Button-Icon
 * Primary con flecha, del alto del campo. Mismos estados y tamaños que Input.
 */
export default function InputAndButton({ showButton = true, buttonLabel = 'Enviar', buttonIcon = 'arrow-right', onSubmit, ...props }) {
  const action = showButton ? (
    <ButtonIcon type="Primary" size="L" icon={buttonIcon} label={buttonLabel} disabled={props.disabled || props.state === 'Disabled'} onClick={onSubmit} />
  ) : null;
  return <Input type="Default" action={action} {...props} />;
}
