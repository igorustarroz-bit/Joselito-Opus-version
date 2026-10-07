import Icon from '../../components/Icon/Icon';
import '../../components/ButtonIcon/ButtonIcon.css';
import './M31NavigationPreviousNext.css';

/**
 * Navegación entre fichas: enlace "Anterior" a la izquierda y "Siguiente" a la derecha, cada uno con su
 * flecha (aspecto Button-Icon Terciary L) y título. Toda la mitad es clicable. En móvil se apilan.
 */
export default function M31NavigationPreviousNext({
  previous = { title: 'Ara Malikian', href: '#' }, next = { title: 'Swarovski Edition', href: '#' },
  previousLabel = 'ANTERIOR', nextLabel = 'SIGUIENTE', theme, className = '', ...rest
}) {
  const item = (dir, data, label) => data && (
    <a className={`m31-nav__item m31-nav__item--${dir}`} href={data.href ?? '#'} rel={dir === 'prev' ? 'prev' : 'next'}>
      <span className="m31-nav__icon button-icon button-icon--terciary button-icon--l" aria-hidden="true">
        <Icon name={dir === 'prev' ? 'arrow-left' : 'arrow-right'} size="M" />
      </span>
      <span className="m31-nav__texts">
        <span className="m31-nav__label ts-body-03">{label}</span>
        <span className="m31-nav__title ts-title-03">{data.title}</span>
      </span>
    </a>
  );
  return (
    <nav className={['m31-nav', className].filter(Boolean).join(' ')} aria-label="Anterior y siguiente" data-theme={theme} {...rest}>
      {item('prev', previous, previousLabel)}
      {item('next', next, nextLabel)}
    </nav>
  );
}
