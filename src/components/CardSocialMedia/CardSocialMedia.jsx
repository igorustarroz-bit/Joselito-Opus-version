import AspectRatio from '../AspectRatio/AspectRatio';
import photo from '../../assets/images/card-social-media.webp';
import './CardSocialMedia.css';

/** Publicación de redes sociales: foto (3:4 vertical u 16:9 horizontal) y la cuenta (@jamonjoselito). */
export default function CardSocialMedia({ vertical = true, image = photo, imageAlt = '', tag = '@jamonjoselito', showTag = true, href, theme, className = '', ...rest }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag className={['card-social', vertical ? '' : 'card-social--horizontal', className].filter(Boolean).join(' ')} href={href} data-theme={theme} {...rest}>
      <AspectRatio size={vertical ? '3:4' : '16:9'} src={image} alt={imageAlt} />
      {showTag && <span className="card-social__tag ts-body-03">{tag}</span>}
    </Tag>
  );
}
