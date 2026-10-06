import './AspectRatio.css';

/** Proporciones del máster "Aspect Ratio" de Figma (propiedad Size). */
export const SIZES = ['16:9', '9:16', '4:3', '3:4', '3:2', '2:3', '1:1', 'Fill'];

/**
 * Marco de proporción para imágenes y medios. La imagen cubre el marco (object-fit: cover).
 * `Fill` no impone proporción: ocupa el alto y el ancho de su contenedor.
 */
export default function AspectRatio({ size = '16:9', src, alt = '', loading = 'lazy', className = '', children, ...rest }) {
  const ratio = size === 'Fill' ? undefined : size.replace(':', ' / ');
  const empty = !src && !children;
  return (
    <div
      className={['aspect-ratio', size === 'Fill' && 'aspect-ratio--fill', empty && 'aspect-ratio--empty', className].filter(Boolean).join(' ')}
      style={ratio ? { aspectRatio: ratio } : undefined}
      data-size={size}
      {...rest}
    >
      {src && <img className="aspect-ratio__media" src={src} alt={alt} loading={loading} />}
      {children}
    </div>
  );
}
