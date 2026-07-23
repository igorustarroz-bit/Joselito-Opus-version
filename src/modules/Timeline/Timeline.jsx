import './Timeline.css';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon.jsx';
import Icon from '../../components/Icon/Icon.jsx';

/**
 * Módulo List / Timeline — banda a 100% de ancho con línea temporal. Máster Figma
 * 58363:35241 (6 variantes: Desktop/Mobile × imagen Horizontal / Vertical / None).
 *
 * Composición: cabecera (eyebrow + enlace "Ver todos"), una columna de años
 * gigantes de fondo (SangBleu, uno activo destacado), una fotografía rotada
 * superpuesta y una tarjeta blanca con título, descripción y navegación (prev/next).
 *
 * Subtema por variante (como en el máster): con imagen → fondo rojo de marca
 * (`data-theme="dark-red-primary"`); sin imagen (`image="none"`) → fondo oscuro
 * (`data-theme="dark-black-neutral"`).
 *
 * Reutiliza UI03-Button-Icon (prev/next) e Icon (CaretRight del enlace).
 *
 * Nota de máster: es un módulo muy art-directed (posiciones absolutas, años de
 * fondo con offsets concretos, foto rotada). Aquí se reproduce la estructura y el
 * lenguaje visual de forma fiel pero **aproximada** en los offsets decorativos y el
 * ángulo de rotación; pendiente de ajuste fino tras revisión visual en Pages.
 */
export default function Timeline({
  eyebrow = 'El legado de Joselito',
  link = 'Ver todos',
  linkHref = '#',
  years = [1920, 1868, 1948, 1964, 1972],
  activeYear = 1948,
  image = 'horizontal', // 'horizontal' | 'vertical' | 'none'
  imageSrc,
  alt = '',
  card = {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    description:
      'Lorem ipsum dolor sit amet consectetur. Neque pretium a ipsum venenatis dignissim quam lectus ultrices volutpat. Massa placerat pretium risus sagittis habitant cras.',
  },
  onPrev,
  onNext,
  className = '',
  ...rest
}) {
  const theme = image === 'none' ? 'dark-black-neutral' : 'dark-red-primary';
  return (
    <section
      className={`jl-timeline jl-timeline--${image} ${className}`.trim()}
      data-theme={theme}
      {...rest}
    >
      <div className="jl-timeline__head">
        <p className="jl-timeline__eyebrow ts-body-4">{eyebrow}</p>
        {link && (
          <a className="jl-timeline__link ts-body-3" href={linkHref}>
            {link}
            <Icon name="CaretRight" size="M" />
          </a>
        )}
      </div>

      <div className="jl-timeline__stage">
        <div className="jl-timeline__years" aria-hidden="true">
          {years.map((y, i) => (
            <span
              key={i}
              className={`jl-timeline__year${y === activeYear ? ' jl-timeline__year--active' : ''}`}
            >
              {y}
            </span>
          ))}
        </div>
        {image !== 'none' && (
          <div className={`jl-timeline__media jl-timeline__media--${image}`}>
            {imageSrc ? <img src={imageSrc} alt={alt} /> : null}
          </div>
        )}
      </div>

      <div className="jl-timeline__card">
        {card?.title && <h3 className="jl-timeline__card-title">{card.title}</h3>}
        {card?.description && <p className="jl-timeline__card-desc ts-body-3">{card.description}</p>}
        <div className="jl-timeline__nav">
          <ButtonIcon icon="CaretLeft" type="secondary" size="xs" label="Anterior" onClick={onPrev} />
          <ButtonIcon icon="CaretRight" type="secondary" size="xs" label="Siguiente" onClick={onNext} />
        </div>
      </div>
    </section>
  );
}
