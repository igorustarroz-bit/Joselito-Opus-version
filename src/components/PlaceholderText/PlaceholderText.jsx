/**
 * UI14-Placeholder-Text — texto de relleno/slot (estilo Body/02 por defecto).
 * Componente base usado como marcador de texto dentro de otros componentes.
 */
export default function PlaceholderText({ children = 'Text', textStyle = 'body-2', as = 'span', className = '', ...rest }) {
  const Tag = as;
  return (
    <Tag className={`ts-${textStyle} ${className}`} style={{ color: 'var(--text-base)', ...rest.style }} {...rest}>
      {children}
    </Tag>
  );
}
