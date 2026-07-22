import './Navigation.css';
import Icon from '../../components/Icon/Icon.jsx';
import BrandLogo from '../../components/BrandLogo/BrandLogo.jsx';

/**
 * Módulo Navigation (header principal) — a 100% de ancho. Desktop: enlaces de sección
 * (izq), logo centrado, acciones (Buscar / Cuenta / Cesta) a la derecha. Mobile:
 * hamburguesa + logo + iconos (búsqueda, cesta). Modo `light` (fondo base) o `dark`.
 */
export default function Navigation({
  links = ['Tienda', 'Origen', 'Excelencia', 'Compromisos', 'Experiencia'],
  cartCount = 3,
  mode = 'light',
  onMenu,
  className = '',
  ...rest
}) {
  return (
    <header className={`jl-nav ${mode === 'dark' ? 'jl-nav--dark' : ''} ${className}`} {...rest}>
      {/* Desktop */}
      <div className="jl-nav__desktop">
        <nav className="jl-nav__links ts-body-2">
          {links.map((l) => <a key={l} className="jl-nav__link" href="#">{l}</a>)}
        </nav>
        <div className="jl-nav__actions ts-body-2">
          <button className="jl-nav__action" type="button"><Icon name="MagnifyingGlass" size="S" />Buscar</button>
          <a className="jl-nav__action" href="#">Cuenta</a>
          <a className="jl-nav__action jl-nav__cart" href="#">Cesta <span>({cartCount})</span></a>
        </div>
      </div>

      {/* Mobile */}
      <div className="jl-nav__mobile ts-body-2">
        <button className="jl-nav__iconbtn" type="button" aria-label="Menú" onClick={onMenu}><Icon name="List" size="M" /></button>
        <div className="jl-nav__mobile-right">
          <button className="jl-nav__iconbtn" type="button" aria-label="Buscar"><Icon name="MagnifyingGlass" size="M" /></button>
          <button className="jl-nav__iconbtn" type="button" aria-label="Cesta"><Icon name="Bag" size="M" /></button>
        </div>
      </div>

      {/* Logo centrado */}
      <a className="jl-nav__logo" href="#" aria-label="Joselito — inicio">
        <BrandLogo variant="horizontal" height={56} />
      </a>
    </header>
  );
}
