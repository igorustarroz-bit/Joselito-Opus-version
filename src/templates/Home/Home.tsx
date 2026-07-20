import { Navigation } from '@/modules/Navigation';
import { HomepageHero } from '@/modules/HomepageHero';
import { ContentIntro } from '@/modules/ContentIntro';
import { CardsCategories } from '@/modules/CardsCategories';
import { CardsProductCarousel } from '@/modules/CardsProductCarousel';
import { Banner } from '@/modules/Banner';
import { Footer } from '@/modules/Footer';
import { CardProduct } from '@/components/CardProduct';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Icon } from '@/components/Icon';
import { BrandLogo } from '@/components/BrandLogo';
import { grad, navItems, footerColumns, copyright } from '@/templates/shared/demo';

/** Template Home — página de inicio compuesta por módulos. */
export function Home() {
  const actions = <><ButtonIcon variant="terciary" size="s" label="Buscar" icon={<Icon name="MagnifyingGlass" size="s" />} /><ButtonIcon variant="terciary" size="s" label="Cesta" icon={<Icon name="Bag" size="s" />} /></>;
  const social = <><a href="#" aria-label="Facebook"><Icon name="FacebookLogo" size="m" /></a><a href="#" aria-label="Email"><Icon name="Envelope" size="m" /></a></>;
  return (
    <div>
      <Navigation brand={<BrandLogo height={36} />} items={navItems} actions={actions} />
      <HomepageHero background={grad('#260200', '#e23f36')} eyebrow="Desde 1868" title="El mejor jamón del mundo" description="Tradición, dehesa y una curación paciente en cada pieza." actions={[{ label: 'Descubrir' }, { label: 'Comprar', variant: 'secondary' }]} />
      <ContentIntro eyebrow="Un legado único" title="Cinco generaciones dedicadas a elaborar el mejor jamón del mundo, con el mismo respeto por la tradición y la naturaleza." />
      <CardsCategories heading="Categorías" theme="light-grey" items={[
        { image: grad('#481815', '#e23f36'), label: 'Jamón' },
        { image: grad('#373a2c', '#9ba084'), label: 'Paleta' },
        { image: grad('#7a5706', '#f9d999'), label: 'Embutidos' },
      ]} />
      <CardsProductCarousel heading="Productos destacados">
        {['Jamón de bellota', 'Paleta de bellota', 'Lomo de bellota', 'Chorizo ibérico', 'Salchichón ibérico'].map((n) => (
          <CardProduct key={n} category="Ibéricos" name={n} price="—" image={grad('#481815', '#e23f36')} />
        ))}
      </CardsProductCarousel>
      <Banner title="Descubre nuestras colecciones premium" description="Ediciones limitadas para las mejores ocasiones." actions={[{ label: 'Ver colecciones' }, { label: 'Contactar', variant: 'secondary' }]} />
      <Footer brand={<BrandLogo variant="isotype" height={48} />} columns={footerColumns} social={social} copyright={copyright} />
    </div>
  );
}
export default Home;
