import './ActionLink.css';
import Icon from '../Icon/Icon.jsx';

/**
 * UI04-Button-Action-Link — enlace de acción con subrayado. Texto CTA en
 * mayúsculas, iconos opcionales. Renderiza <a> si se pasa href, si no <button>.
 */
export default function ActionLink({
  children = 'Button',
  href,
  disabled = false,
  iconLeft,
  iconRight,
  className = '',
  ...rest
}) {
  const Tag = href && !disabled ? 'a' : 'button';
  const tagProps = href && !disabled ? { href } : { type: 'button', disabled };
  return (
    <Tag className={`jl-actionlink ${className}`} {...tagProps} {...rest}>
      {iconLeft && <span className="jl-actionlink__icon"><Icon name={iconLeft} size="S" /></span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="jl-actionlink__icon"><Icon name={iconRight} size="S" /></span>}
    </Tag>
  );
}
