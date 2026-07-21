import './Tag.css';

/**
 * UI12-Tag — etiqueta. Tipos: transaction (fondo claro + borde), new (acento rojo),
 * aseptic (solo borde). Tamaños L / XS. Texto en mayúsculas (Label).
 */
export default function Tag({ children = 'Label', type = 'transaction', size = 'l', className = '', ...rest }) {
  return (
    <span className={`jl-tag jl-tag--${type} jl-tag--${size} ${className}`} {...rest}>
      {children}
    </span>
  );
}
