import './CardsCategories.css';
import Icon from '../../components/Icon/Icon.jsx';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';

/**
 * Módulo Cards / Categories — feed de redes sociales: cabecera con antetítulo e
 * iconos sociales, y una fila escalonada de miniaturas con su handle. Máster Figma
 * 58182:4401 (Desktop/Mobile × RRSS / Instagram).
 *
 * Las miniaturas alternan orientación (retrato 3:4 / apaisado 3:2) y se alinean por
 * abajo, creando un efecto escalonado. Reutiliza Icon (redes) y AspectRatio.
 *
 * Nota de máster: la variante "Instagram" usa un set de iconos distinto (solo
 * Instagram); aquí se controla con la prop `socials`.
 */
const DEFAULT_ITEMS = [
  { handle: '@neonflight', ratio: '3:4' },
  { handle: '@autecuisine', ratio: '3:2' },
  { handle: '@jamonjoselito', ratio: '3:4' },
  { handle: '@elbulli', ratio: '3:2' },
  { handle: '@jamonjoselito', ratio: '3:4' },
];

export default function CardsCategories({
  eyebrow = 'Síguenos en redes sociales',
  socials = ['XLogo', 'FacebookLogo', 'InstagramLogo', 'LinkedinLogo', 'TiktokLogo'],
  items = DEFAULT_ITEMS,
  className = '',
  ...rest
}) {
  return (
    <section className={`jl-categories ${className}`.trim()} {...rest}>
      <div className="jl-categories__head">
        {eyebrow && <p className="jl-categories__eyebrow ts-body-4">{eyebrow}</p>}
        {socials?.length > 0 && (
          <div className="jl-categories__socials">
            {socials.map((s) => (
              <a key={s} href="#" aria-label={s.replace('Logo', '')}>
                <Icon name={s} size={28} />
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="jl-categories__track">
        {items.map((it, i) => {
          const landscape = it.ratio === '3:2';
          return (
            <figure
              key={i}
              className={`jl-categories__thumb ${landscape ? 'jl-categories__thumb--landscape' : ''}`.trim()}
            >
              <div className="jl-categories__media">
                <AspectRatio ratio={it.ratio || '3:4'} className="jl-categories__ar">
                  {it.image ? <img src={it.image} alt={it.handle} /> : null}
                </AspectRatio>
              </div>
              <figcaption className="jl-categories__handle ts-body-3">{it.handle}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
