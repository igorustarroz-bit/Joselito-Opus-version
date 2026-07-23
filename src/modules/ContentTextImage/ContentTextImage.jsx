import './ContentTextImage.css';
import Button from '../../components/Button/Button.jsx';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';
import textImg from '../../assets/images/generic-filler.webp';

/**
 * Módulo Content / Text + Image — bloque de texto + imagen, a 100% de ancho.
 * Variantes (máster Figma 58363:34365): `half` (imagen a media página + panel de
 * texto amplio con nota al pie), `left` (imagen a la izquierda) y `right`
 * (imagen a la derecha). Reutiliza UI02-Button (secondary) y AspectRatio.
 */
export default function ContentTextImage({
  type = 'half',
  label = 'THIS IS A LABEL',
  title = 'En Joselito solo hacemos productos 100% naturales',
  text = 'Productos procedentes de cerdos criados en libertad y alimentados de manera natural, su carne es rica en ácido oleico, un tipo de grasa monoinsaturada beneficiosa para el corazón.',
  cta = 'Button',
  footnote,
  image = textImg,
  imageAlt = '',
  className = '',
  ...rest
}) {
  const isHalf = type === 'half';
  const ratio = isHalf ? '3:4' : '4:3';
  return (
    <section className={`jl-txtimg jl-txtimg--${type} ${className}`} {...rest}>
      <AspectRatio ratio={ratio} className="jl-txtimg__media">
        {image ? <img src={image} alt={imageAlt} /> : null}
      </AspectRatio>

      <div className="jl-txtimg__panel">
        <div className="jl-txtimg__group">
          {label && <p className="jl-txtimg__label ts-body-3">{label}</p>}
          <h2 className="jl-txtimg__title ts-title-3">{title}</h2>
          {text && <p className="jl-txtimg__text ts-body-3">{text}</p>}
        </div>
        {cta && <Button type="secondary" size="s">{cta}</Button>}
        {isHalf && footnote && (
          <div className="jl-txtimg__note ts-body-2">
            <p>*</p>
            <p>{footnote}</p>
          </div>
        )}
      </div>
    </section>
  );
}
