import { useId, useState } from 'react';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import Tag from '../../components/Tag/Tag';
import art from '../../assets/images/m22-navigation-direct-link.webp';
import './M22NavigationDirectLink.css';

export const TYPES = ['Direct Link', 'Deploy'];
export const STATES = ['Default', 'Hover', 'Deployed'];
const TEXT = 'Lorem ipsum dolor sit amet consectetur. At gravida egestas sem diam sed ac aliquet odio senectus. Enim vitae nibh et tincidunt mauris in leo pulvinar. Purus nisi maecenas etiam consequat proin dignissim imperdiet ut arcu. Tristique vitae molestie quam quisque sed ut. Facilisi nunc velit sagittis lobortis a quis ultrices.';

/**
 * Fila de listado (colecciones, artistas…): etiqueta, título y, a la derecha, flecha (Direct Link: toda la
 * fila es un enlace, con etiqueta "SOLD OUT" opcional) o +/− (Deploy: despliega texto e imagen).
 * Al pasar el ratón la fila cambia al subtema Dark - Red - Primary. Varias filas forman una lista.
 */
export default function M22NavigationDirectLink({
  type = 'Direct Link', state, label = 'COLECCIÓN 2018', title, href = '#', soldOut = true, soldOutText = 'SOLD OUT', showArrow = true,
  text = TEXT, image = art, imageAlt = '', open, defaultOpen = false, onToggle, theme, className = '', ...rest
}) {
  const id = useId();
  const deploy = type === 'Deploy';
  const [inner, setInner] = useState(defaultOpen);
  const [hover, setHover] = useState(false);
  const isOpen = deploy && (open ?? (state ? state === 'Deployed' : inner));
  const isHover = !isOpen && (state ? state === 'Hover' : hover);
  const toggle = () => { if (open === undefined && !state) setInner(!isOpen); onToggle?.(!isOpen); };
  const name = title ?? (deploy ? 'Etsuro Sotoo' : 'Fernando Bellver');
  const head = (
    <>
      <p className="m22-row__label ts-labels-02">{label}</p>
      <h3 className="m22-row__title ts-title-02">{name}</h3>
    </>
  );
  return (
    <div className={['m22-row', deploy ? 'm22-row--deploy' : 'm22-row--link', isOpen ? 'is-open' : '', isHover ? 'is-hover' : '', className].filter(Boolean).join(' ')}
      data-theme={isHover ? 'dark-red-primary' : theme} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      <div className="m22-row__main">
        <span className="m22-row__head">{head}</span>
        {!deploy && soldOut && <Tag className="m22-row__tag" type="Aseptic" size="XL" text={soldOutText} />}
        {deploy ? (
          <ButtonIcon className="m22-row__icon" type="Terciary" size="S" icon={isOpen ? 'minus' : 'plus'} label={name}
            aria-expanded={isOpen} aria-controls={`${id}-panel`} onClick={toggle} />
        ) : showArrow ? (
          <ButtonIcon className="m22-row__icon" type="Primary" size="S" icon="arrow-right" label={name} href={href} />
        ) : (
          <a className="m22-row__icon m22-row__link" href={href} aria-label={name} />
        )}
      </div>
      {deploy && (
        <div id={`${id}-panel`} className="m22-row__panel" hidden={!isOpen}>
          <p className="m22-row__text ts-body-03">{text}</p>
          {image && <AspectRatio className="m22-row__img" size="3:4" src={image} alt={imageAlt} />}
        </div>
      )}
    </div>
  );
}
