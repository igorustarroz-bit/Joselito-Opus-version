/**
 * AspectRatio — foundation. Mantiene una proporción fija y recorta el contenido.
 * Ratios del sistema (Figma): 1:1, 4:3, 3:4, 3:2, 2:3, 16:9, 9:16.
 * El hijo (habitualmente <img>) rellena el contenedor con object-cover.
 */
export const RATIOS = ['1:1', '4:3', '3:4', '3:2', '2:3', '16:9', '9:16'];

export default function AspectRatio({ ratio = '1:1', className = '', children, ...rest }) {
  const [w, h] = ratio.split(':');
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
      data-ratio={ratio}
      {...rest}
    >
      <div className="absolute inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:block">
        {children}
      </div>
    </div>
  );
}
