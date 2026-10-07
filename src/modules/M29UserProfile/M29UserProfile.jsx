import MenuItemList from '../../components/MenuItemList/MenuItemList';
import M06NavigationSecondarymenu from '../M06NavigationSecondarymenu/M06NavigationSecondarymenu';
import './M29UserProfile.css';

const MENU = [
  { text: 'Pedidos', href: '#' }, { text: 'Lista de deseos', href: '#' }, { text: 'Direcciones', href: '#' },
  { text: 'Datos personales', href: '#' }, { text: 'Cerrar sesión', href: '#' },
];

/**
 * Área de cliente: menú lateral (menu-item-list) y contenido de la sección. En móvil el menú pasa a un
 * desplegable M06-Navigation-Secondarymenu con la sección actual como título.
 */
export default function M29UserProfile({ menu = MENU, selected = 'Pedidos', title = 'Placeholder',
  text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit cursus felis vel egestas. In pellentesque erat nec nibh congue eleifend. Donec tristique imperdiet felis vitae porta. Aliquam aliquam turpis vitae nunc ornare, sit amet tempor orci mollis. Fusce sed ex vitae orci consectetur posuere vel at leo. Ut eu purus nec eros pellentesque egestas. Aenean mattis libero mauris, in commodo lorem ullamcorper sit amet.',
  children, theme, className = '', ...rest }) {
  return (
    <section className={['m29-profile', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="m29-profile__mobile-nav">
        <M06NavigationSecondarymenu type="Dropdown" title={selected} links={menu.filter((m) => m.text !== selected)} />
      </div>
      <nav className="m29-profile__menu" aria-label="Mi cuenta">
        <ul>
          {menu.map((m) => <li key={m.text}><MenuItemList text={m.text} href={m.href} selected={m.text === selected} /></li>)}
        </ul>
      </nav>
      <div className="m29-profile__content">
        {children ?? (
          <>
            <h1 className="m29-profile__title ts-title-01">{title}</h1>
            <p className="m29-profile__text ts-body-03">{text}</p>
          </>
        )}
      </div>
    </section>
  );
}
