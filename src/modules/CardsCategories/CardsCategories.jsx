import './CardsCategories.css';
import Icon from '../../components/Icon/Icon.jsx';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';

/**
 * Módulo Cards / Categories — feed de redes sociales con miniaturas escalonadas.
 * Máster Figma 58182:4401 (Desktop/Mobile × RRSS / Instagram).
 *
 * Dos variantes (`variant`):
 *  - `rrss`: antetítulo + iconos sociales. En desktop los iconos van en la cabecera
 *    (derecha) y las miniaturas llevan handle; en mobile los iconos van **abajo**
 *    centrados y las miniaturas **sin handle**.
 *  - `instagram`: sin iconos; miniaturas centradas + pie "SÍGUENOS / @cuenta".
 *
 * Miniaturas: imagen (retrato 3:4 / apaisado 3:2) alineadas por abajo (escalonado).
 * Reutiliza Icon y AspectRatio.
 */
const DEFAULT_ITEMS = [
  { handle: '@neonflight', ratio: '3:4' },
  { handle: '@autecuisine', ratio: '3:2' },
  { handle: '@jamonjoselito', ratio: '3:4' },
  { handle: '@elbulli', ratio: '3:2' },
  { handle: '@jamonjoselito', ratio: '3:4' },
];
const DEFAULT_SOCIALS = ['XLogo', 'FacebookLogo', 'InstagramLogo', 'LinkedinLogo', 'TiktokLogo'];

function Socials({ socials, place }) {
  return (
    <div className={`jl-categories__socials jl-categories__socials--${place}`}>
      {socials.map((s) => (
        <a key={s} href="#" aria-label={s.replace('Logo', '')}><Icon name={s} size={28} /></a>
      ))}
    </div>
  );
}

export default function CardsCategories({
  variant = 'rrss',
  eyebrow = 'Síguenos en redes sociales',
  socials = DEFAULT_SOCIALS,
  followLabel = 'Síguenos',
  account = '@jamonjoselito',
  items = DEFAULT_ITEMS,
  className = '',
  ...rest
}) {
  const isRRSS = variant === 'rrss';
  return (
    <section className={`jl-categories jl-categories--${variant} ${className}`.trim()} {...rest}>
      {isRRSS && (
        <div className="jl-categories__head">
          {eyebrow && <p className="jl-categories__eyebrow">{eyebrow}</p>}
          {socials?.length > 0 && <Socials socials={socials} place="head" />}
        </div>
      )}

      <div className="jl-categories__track">
        {items.map((it, i) => {
          const landscape = it.ratio === '3:2';
          return (
            <figure key={i} className={`jl-categories__thumb ${landscape ? 'jl-categories__thumb--landscape' : ''}`.trim()}>
              <div className="jl-categories__media">
                <AspectRatio ratio={it.ratio || '3:4'} className="jl-categories__ar">
                  {it.image ? <img src={it.image} alt={it.handle} /> : null}
                </AspectRatio>
              </div>
              {it.handle && <figcaption className="jl-categories__handle ts-body-3">{it.handle}</figcaption>}
            </figure>
          );
        })}
      </div>

      {isRRSS && socials?.length > 0 && <Socials socials={socials} place="foot" />}

      {!isRRSS && (
        <div className="jl-categories__follow">
          {followLabel && <p className="jl-categories__follow-label ts-body-3">{followLabel}</p>}
          {account && <p className="jl-categories__follow-account ts-body-3">{account}</p>}
        </div>
      )}
    </section>
  );
}
