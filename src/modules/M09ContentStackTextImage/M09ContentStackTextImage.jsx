import { useId, useState } from 'react';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import Button from '../../components/Button/Button';
import photo from '../../assets/images/toast.webp';
import './M09ContentStackTextImage.css';

export const IMAGES = ['Horizontal', 'Vertical', 'None'];
export const MODES = ['Collapsed', 'Expanded', 'Collapsed Hover'];

/**
 * Elemento de una pila de contenidos desplegables (se usan varios seguidos). Plegado: título y número;
 * al pasar el ratón cambia al subtema Dark - Red - Primary. Desplegado: texto, botón, número e imagen
 * (Horizontal 4:3, Vertical 3:4 o None). El título conmuta el estado.
 */
export default function M09ContentStackTextImage({
  title = 'Salazón', number = '01', text = 'Un leve proceso de salado permite la estabilización de las enzimas y la perfecta conversación de las piezas. Los Jamones y Paletas Joselito se caracterizan por su baja salinidad, llegando a ser considerados dulces.',
  buttonText = 'LOREM IPSUM', onButton, showButton = true, showDescription = true, showNumber = true,
  image = 'Vertical', src = photo, imageAlt = '', mode, expanded, defaultExpanded = false, onToggle,
  theme, className = '', ...rest
}) {
  const id = useId();
  const [inner, setInner] = useState(defaultExpanded);
  const [hover, setHover] = useState(false);
  const isOpen = expanded ?? (mode ? mode === 'Expanded' : inner);
  const isHover = !isOpen && (mode === 'Collapsed Hover' || (!mode && hover));
  const toggle = () => { if (expanded === undefined && !mode) setInner(!isOpen); onToggle?.(!isOpen); };
  const num = showNumber && <span className="m09-stack__number ts-title-03" aria-hidden="true">{number}</span>;
  const cls = ['m09-stack', isOpen ? 'is-expanded' : 'is-collapsed', isHover ? 'is-hover' : '', isOpen && image !== 'None' ? `has-image--${image.toLowerCase()}` : '', className];
  return (
    <section className={cls.filter(Boolean).join(' ')} data-theme={isHover ? 'dark-red-primary' : theme}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      <div className="m09-stack__main">
        <div className="m09-stack__content">
          <div className="m09-stack__texts">
            <h2 className="m09-stack__title ts-title-03">
              <button type="button" aria-expanded={isOpen} aria-controls={`${id}-body`} onClick={toggle}>{title}</button>
            </h2>
            {isOpen && showDescription && <p className="m09-stack__text ts-body-04">{text}</p>}
          </div>
          {isOpen && showButton && <Button type="Secondary" size="S" text={buttonText} onClick={onButton} />}
        </div>
        {num}
      </div>
      {isOpen && image !== 'None' && (
        <AspectRatio id={`${id}-body`} className="m09-stack__media" size={image === 'Vertical' ? '3:4' : '4:3'} src={src} alt={imageAlt} />
      )}
    </section>
  );
}
