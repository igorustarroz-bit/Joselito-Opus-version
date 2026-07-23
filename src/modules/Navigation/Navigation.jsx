import './Navigation.css';
import Icon from '../../components/Icon/Icon.jsx';
import BrandLogo from '../../components/BrandLogo/BrandLogo.jsx';

/**
 * Módulo Navigation (header principal) — máster Figma `58182:4143`
 * (set: Device=Desktop/Mobile × Mode=Light/Dark).
 *
 * Contenedor a 100% de ancho. Desktop (1440×70, padding 24/40): enlaces de sección
 * (izq, Body/02, gap 20) · logo centrado en absoluto · acciones a la derecha (gap 20):
 * Buscar (icono S + texto) · Cuenta · Cesta (n) en color de acento. Mobile (390×56,
 * padding 12/24): hamburguesa de 2 barras (izq) · logo centrado · buscar + cesta (M, gap 12).
 * `mode="dark"` (sobre imagen, texto blanco y fondo transparente) o `light` (fondo base).
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
    <header className={`jl-nav ${mode === 'dark' ? 'jl-nav--dark' : ''} ${className}`.trim()} {...rest}>
      {/* Desktop */}
      <div className="jl-nav__desktop ts-body-2">
        <nav className="jl-nav__links">
          {links.map((l) => <a key={l} className="jl-nav__link" href="#">{l}</a>)}
        </nav>
        <div className="jl-nav__actions">
          <button className="jl-nav__action" type="button"><Icon name="MagnifyingGlass" size="S" />Buscar</button>
          <a className="jl-nav__action" href="#">Cuenta</a>
          <a className="jl-nav__action jl-nav__cart" href="#">Cesta <span>({cartCount})</span></a>
        </div>
      </div>

      {/* Mobile */}
      <div className="jl-nav__mobile ts-body-2">
        <button className="jl-nav__iconbtn jl-nav__burger" type="button" aria-label="Menú" onClick={onMenu}>
          <span></span><span></span>
        </button>
        <div className="jl-nav__mobile-right">
          <button className="jl-nav__iconbtn" type="button" aria-label="Buscar"><Icon name="MagnifyingGlass" size="M" /></button>
          <button className="jl-nav__iconbtn" type="button" aria-label="Cesta"><Icon name="Bag" size="M" /></button>
        </div>
      </div>

      {/* Logo centrado (caja 126×84 del máster; el wordmark ocupa la franja central) */}
      <a className="jl-nav__logo" href="#" aria-label="Joselito — inicio">
        <BrandLogo variant="horizontal" height={84} />
      </a>
    </header>
  );
}
