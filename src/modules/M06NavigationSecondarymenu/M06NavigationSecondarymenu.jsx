import { useId, useState } from 'react';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import Icon from '../../components/Icon/Icon';
import MenuItemList from '../../components/MenuItemList/MenuItemList';
import NavButton from '../../components/NavButton/NavButton';
import SubnavItem from '../../components/SubnavItem/SubnavItem';
import chef from '../../assets/images/m06-navigation-secondarymenu.webp';
import './M06NavigationSecondarymenu.css';

export const TYPES = ['One line', 'Dropdown'];
const ITEMS = ['Todos', 'Jamones', 'Paletas', 'Carne fresca', 'Embutidos', 'Loncheados', 'Regalos', 'Añadas', 'Accesorios', 'Colecciones'];
const LINKS = ['Jamones Joselito', 'Carne Fresca Joselito Nude', 'Embutidos y Elaborados', 'Loncheados', 'Regalos y Selecciones Especiales',
  'Añadas & Ediciones limitadas', 'Accesorios', 'Colecciones'];
const FILTERS = [{ text: 'TODOS LOS CHEFS' }, { text: 'TODAS LAS COCINAS', disabled: true }];
const PANEL = ['Nou Manolín', 'Eneko Atxa', 'Bittor Arginzoniz', 'Yannick Alleno', 'Joachim Wissler', 'Seiji Yamamoto', 'Jonnie Boer',
  'Massimiliano Alajmo', 'Ferran Adrià'];

const textOf = (x) => (typeof x === 'string' ? x : x.text);

/**
 * Menú secundario (subnavegación de una sección).
 * One line: fila de subnavigation-item (centrada en escritorio, desplazable en móvil).
 * Dropdown: en escritorio, filtros NavButton con caret que despliegan un panel tipo M02 (lista + foto);
 * en móvil, título con +/− que despliega la lista de enlaces.
 */
export default function M06NavigationSecondarymenu({
  type = 'One line', items = ITEMS, selected = 'Todos', title = 'Todos los productos', links = LINKS,
  filters = FILTERS, panelLinks = PANEL, panelSelected = 'Ferran Adrià', panelImage = chef, showMenu = true,
  open, defaultOpen = false, onToggle, theme, className = '', ...rest
}) {
  const id = useId();
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const toggle = () => { if (open === undefined) setInner(!isOpen); onToggle?.(!isOpen); };
  const cls = ['m06-nav', `m06-nav--${type === 'Dropdown' ? 'dropdown' : 'one-line'}`, isOpen ? 'is-open' : '', className].filter(Boolean).join(' ');

  if (type !== 'Dropdown') {
    return (
      <nav className={cls} aria-label="Secundario" data-theme={theme} {...rest}>
        <ul className="m06-nav__items">
          {items.map((it, i) => <li key={i}><SubnavItem text={textOf(it)} href={it.href ?? '#'} selected={textOf(it) === selected} /></li>)}
        </ul>
      </nav>
    );
  }

  return (
    <nav className={cls} aria-label="Secundario" data-theme={theme} {...rest}>
      {/* Escritorio */}
      <div className="m06-nav__desktop">
        <div className="m06-nav__bar">
          {filters.map((f, i) => (
            <NavButton key={i} text={f.text} disabled={f.disabled} showCaret caret={i === 0 && isOpen ? 'caret-up' : 'caret-down'}
              aria-expanded={i === 0 ? isOpen : undefined} aria-controls={i === 0 ? `${id}-panel` : undefined} onClick={i === 0 ? toggle : f.onClick} />
          ))}
        </div>
        {showMenu && (
          <div id={`${id}-panel`} className="m06-nav__panel" hidden={!isOpen}>
            <ul className="m06-nav__panel-links">
              {panelLinks.map((l, i) => <li key={i}><MenuItemList text={textOf(l)} href={l.href ?? '#'} selected={textOf(l) === panelSelected} /></li>)}
            </ul>
            {panelImage && <AspectRatio className="m06-nav__panel-img" size="3:4" src={panelImage} alt="" />}
          </div>
        )}
      </div>
      {/* Móvil */}
      <div className="m06-nav__mobile">
        <button type="button" className="m06-nav__head" aria-expanded={isOpen} aria-controls={`${id}-list`} onClick={toggle}>
          <span className="ts-body-04">{title}</span>
          <Icon name={isOpen ? 'minus' : 'plus'} size="M" />
        </button>
        <ul id={`${id}-list`} className="m06-nav__links" hidden={!isOpen}>
          {links.map((l, i) => <li key={i}><MenuItemList className="m06-nav__link" text={textOf(l)} href={l.href ?? '#'} /></li>)}
        </ul>
      </div>
    </nav>
  );
}
