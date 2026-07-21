import { Navigation } from '@/modules/Navigation';
import { BrandLogo } from '@/components/BrandLogo';
import { HomepageHero } from '@/modules/HomepageHero';
import { CardsShowcase } from '@/modules/CardsShowcase';
import { CardsProductCarousel } from '@/modules/CardsProductCarousel';
import { Banner } from '@/modules/Banner';
import { Footer } from '@/modules/Footer';
import { CardProduct } from '@/components/CardProduct';
import { Icon } from '@/components/Icon';
import { grad, navItems, footerColumns, copyright } from '@/templates/shared/demo';

/** Template Colecciones Premium. */
export function ColeccionesPremium() {
  const social = <><a href="#" aria-label="Facebook"><Icon name="FacebookLogo" size="m" /></a><a href="#" aria-label="Email"><Icon name="Envelope" size="m" /></a></>;
  return (
    <div>
      <Navigation brand={<BrandLogo height={36} />} items={navItems} />
      <HomepageHero background={grad('#0a0a0a', '#481815')} eyebrow="Ediciones limitadas" title="Colecciones Premium" description="Nuestro mejor jamón, para las ocasiones más especiales." actions={[{ label: 'Explorar' }]} minHeight="60vh" align="left" />
      <CardsShowcase heading="Destacado" featured={{ image: grad('#260200', '#e23f36'), title: 'Gran Reserva 2019', description: 'Añada excepcional con 48 meses de curación.' }} items={[
        { image: grad('#481815', '#e23f36'), title: 'Estuche regalo', description: 'Presentación de lujo.' },
        { image: grad('#373a2c', '#9ba084'), title: 'Selección del maestro', description: 'Piezas escogidas a mano.' },
      ]} />
      <CardsProductCarousel heading="La colección" theme="light-grey">
        {['Gran Reserva', 'Estuche Premium', 'Selección Maestro', 'Edición Aniversario'].map((n) => (
          <CardProduct key={n} category="Premium" name={n} price="—" badge="Limitado" image={grad('#260200', '#e23f36')} />
        ))}
      </CardsProductCarousel>
      <Banner sectionTitle="Contacto" image={grad('#0a0a0a', '#481815')} title="¿Necesitas asesoramiento?" description="Nuestro equipo te ayuda a elegir la pieza perfecta." ctaLabel="Contactar" />
      <Footer brand={<BrandLogo variant="isotype" height={48} />} columns={footerColumns} social={social} copyright={copyright} />
    </div>
  );
}
export default ColeccionesPremium;
