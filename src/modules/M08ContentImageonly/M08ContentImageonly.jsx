import AspectRatio from '../../components/AspectRatio/AspectRatio';
import wide from '../../assets/images/m08-content-imageonly.webp';
import left from '../../assets/images/m08-content-imageonly-3.webp';
import right from '../../assets/images/m08-content-imageonly-2.webp';
import './M08ContentImageonly.css';

export const TYPES = ['Full Screen', 'Borders', 'Split'];

/**
 * Bloque solo de imagen. Full Screen: a sangre (16:9 en escritorio, 9:16 en móvil). Borders: con
 * márgenes del wrapper. Split: dos imágenes 3:4, cada una en media pantalla con márgenes (apiladas en móvil).
 */
export default function M08ContentImageonly({
  type = 'Full Screen', image = wide, imageAlt = '', images = [{ src: left, alt: '' }, { src: right, alt: '' }],
  theme, className = '', ...rest
}) {
  const slug = type.toLowerCase().replace(/\s+/g, '-');
  return (
    <section className={['m08-content', `m08-content--${slug}`, className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {type === 'Split'
        ? images.map((im, i) => (
          <div key={i} className="m08-content__half"><AspectRatio size="3:4" src={im.src} alt={im.alt ?? ''} /></div>
        ))
        : <AspectRatio className="m08-content__media" size="Fill" src={image} alt={imageAlt} />}
    </section>
  );
}
