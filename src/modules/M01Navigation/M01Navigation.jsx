import BrandLogo from '../../components/BrandLogo/BrandLogo';
import Icon from '../../components/Icon/Icon';
import NavButton from '../../components/NavButton/NavButton';
import './M01Navigation.css';

export const MODES = ['Light', 'Dark', 'Grey'];
// Mode de Figma → subtema + fondo: Light pinta Backgrounds/Base; Dark y Grey son transparentes (sobre un hero).
const THEME = { Light: 'light-white', Dark: 'dark-black-neutral', Grey: 'light-white' };
const MENU = [{ text: 'Tienda' }, { text: 'Origen' }, { text: 'Excelencia' }, { text: 'Compromisos' }, { text: 'Experiencias' }];
const TOOLS = [{ text: 'Buscar', showIcon: true }, { text: 'Cuenta' }, { text: 'Cesta (3)' }];

/**
 * Cabecera principal. Escritorio (desde 1024 px): menú a la izquierda, logo centrado y herramientas
 * (Buscar, Cuenta, Cesta) a la derecha. Móvil: hamburguesa, logo centrado, buscar y cesta.
 * `mode` = eje Mode de Figma (fija el subtema; Dark y Grey sin fondo para ir sobre un hero).
 */
export default function M01Navigation({ mode = 'Light', menu = MENU, tools = TOOLS, cartCount = 3, onMenu, onSearch, onCart, homeHref = '/', theme, className = '', ...rest }) {
  return (
    <header className={['m01-nav', `m01-nav--${mode.toLowerCase()}`, className].filter(Boolean).join(' ')} data-theme={theme ?? THEME[mode]} {...rest}>
      <nav className="m01-nav__desktop" aria-label="Principal">
        <ul className="m01-nav__list">{menu.map((m, i) => <li key={i}><NavButton href={m.href ?? '#'} {...m} /></li>)}</ul>
        <ul className="m01-nav__list">{tools.map((t, i) => <li key={i}><NavButton href={t.href ?? '#'} {...t} /></li>)}</ul>
      </nav>
      <div className="m01-nav__mobile">
        <button type="button" className="m01-nav__icon" aria-label="Abrir menú" onClick={onMenu}><Icon name="equals" size="M" /></button>
        <span className="m01-nav__tools">
          <button type="button" className="m01-nav__icon" aria-label="Buscar" onClick={onSearch}><Icon name="magnifying-glass" size="M" /></button>
          <button type="button" className="m01-nav__icon" aria-label={`Cesta (${cartCount})`} onClick={onCart}><Icon name="bag" size="M" /></button>
        </span>
      </div>
      <a className="m01-nav__logo" href={homeHref} aria-label="Joselito, inicio"><BrandLogo horizontal="Yes" width={126} /></a>
    </header>
  );
}
