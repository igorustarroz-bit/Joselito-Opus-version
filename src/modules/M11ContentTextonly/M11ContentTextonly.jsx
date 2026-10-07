import './M11ContentTextonly.css';

export const VARIANTS = ['2-column', 'split', '1-Left-Column', '1-Center-Column'];
const LONG = 'Lorem ipsum dolor sit amet consectetur. Tempor enim quis turpis amet nunc sed tincidunt egestas. Arcu pulvinar neque a est amet morbi. Mi commodo viverra condimentum nullam vel vel risus sed etiam. A dictumst sed sed quis. Pretium imperdiet consectetur auctor vestibulum lorem tincidunt nulla. Nam pulvinar felis sed praesent. In at mi viverra morbi. Venenatis in aenean nunc mauris. Arcu donec vitae auctor non cursus. Nisl etiam bibendum id sit. Egestas aliquam et vestibulum diam. Malesuada elit auctor amet purus est. Morbi mauris at fermentum sapien massa orci. Tellus nulla sit senectus rhoncus facilisis convallis. Volutpat eget sit eget quis laoreet tortor laoreet. Enim arcu morbi mauris urna fusce.';
const LONG2 = 'Lorem ipsum dolor sit amet consectetur. Neque habitasse volutpat odio lacus mattis turpis nibh nibh. Egestas dolor felis arcu tellus. Nulla dictum sed risus sed. A semper sit sit rhoncus eget volutpat tristique. Eleifend cras odio molestie molestie nulla justo. Vulputate fringilla tincidunt rutrum enim mauris non nunc. Vitae in vel faucibus consequat pharetra magna amet. Facilisi in pulvinar id pellentesque amet gravida elit.';

/**
 * Bloque solo de texto. Escritorio: `2-column` (cabecera y dos columnas), `split` (título a la izquierda,
 * texto a la derecha), `1-Left-Column` o `1-Center-Column` (una columna de 5 u 8 columnas de rejilla).
 * Móvil: una sola columna. Los párrafos admiten contenido propio (slots).
 */
export default function M11ContentTextonly({
  variant = '2-column', label = 'THIS IS A LABEL', title = 'Lorem ipsum dolor sit amet consectetur.', showLabel = true, showTitle = true,
  showBoxTitle = true, body = LONG, body2 = LONG2, showSlot2, slot1, slot2, theme, className = '', ...rest
}) {
  const twoCols = showSlot2 ?? variant === '2-column';
  const small = variant === '1-Left-Column' || variant === '1-Center-Column';
  const textCls = `m11-text__body ${small ? 'ts-body-03' : 'ts-body-04'}`;
  const box = showBoxTitle && (showLabel || showTitle) && (
    <div className="m11-text__box">
      {showLabel && <p className="m11-text__label ts-body-03">{label}</p>}
      {showTitle && <h2 className="m11-text__title ts-title-03">{title}</h2>}
    </div>
  );
  const s1 = <div className="m11-text__slot">{slot1 ?? <p className={textCls}>{body}</p>}</div>;
  const s2 = twoCols && <div className="m11-text__slot">{slot2 ?? <p className={textCls}>{body2}</p>}</div>;
  const slug = variant.toLowerCase();
  return (
    <section className={['m11-text', `m11-text--${slug}`, className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {variant === 'split' ? (
        <>
          {showLabel && showBoxTitle && <p className="m11-text__label ts-body-03">{label}</p>}
          <div className="m11-text__row">
            {showTitle && showBoxTitle && <h2 className="m11-text__title ts-title-03">{title}</h2>}
            <div className="m11-text__cols">{s1}{s2}</div>
          </div>
        </>
      ) : (
        <div className="m11-text__inner">
          {box}
          <div className="m11-text__cols">{s1}{s2}</div>
        </div>
      )}
    </section>
  );
}
