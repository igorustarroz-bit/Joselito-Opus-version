import { Navigation } from '@/modules/Navigation';
import { BrandLogo } from '@/components/BrandLogo';
import { SectionHero } from '@/modules/SectionHero';
import { CardsGrid } from '@/modules/CardsGrid';
import { FormSection } from '@/modules/FormSection';
import { Footer } from '@/modules/Footer';
import { FormRow } from '@/components/Form';
import { Input } from '@/components/Input';
import { CheckboxLabel } from '@/components/CheckboxLabel';
import { Button } from '@/components/Button';
import { CardLink } from '@/components/CardLink';
import { Icon } from '@/components/Icon';
import { grad, navItems, footerColumns, copyright } from '@/templates/shared/demo';

/** Template Experiencias y eventos. */
export function Experiencias() {
  const social = <><a href="#" aria-label="Facebook"><Icon name="FacebookLogo" size="m" /></a><a href="#" aria-label="Email"><Icon name="Envelope" size="m" /></a></>;
  return (
    <div>
      <Navigation brand={<BrandLogo height={36} />} items={navItems} />
      <SectionHero eyebrow="Experiencias" title="Vive Joselito" description="Catas, visitas a la dehesa y eventos exclusivos." image={grad('#481815', '#e23f36')} theme="dark-red-primary" />
      <CardsGrid title="Próximos eventos" columns={3}>
        {['Cata maridaje', 'Visita a la dehesa', 'Taller de corte'].map((t) => (
          <CardLink key={t} eyebrow="Evento" title={t} description="Plazas limitadas." image={grad('#260200', '#e23f36')} />
        ))}
      </CardsGrid>
      <FormSection heading="Reserva tu experiencia" description="Déjanos tus datos y te contactaremos." onSubmit={(e) => e.preventDefault()}>
        <FormRow columns={2}>
          <Input label="Nombre" placeholder="Tu nombre" />
          <Input label="Email" type="email" placeholder="tucorreo@ejemplo.com" />
        </FormRow>
        <FormRow><Input label="Experiencia de interés" placeholder="Cata, visita…" /></FormRow>
        <FormRow><CheckboxLabel title="Acepto la política de privacidad" /></FormRow>
        <FormRow><Button htmlType="submit">Reservar</Button></FormRow>
      </FormSection>
      <Footer brand={<BrandLogo variant="isotype" height={48} />} columns={footerColumns} social={social} copyright={copyright} />
    </div>
  );
}
export default Experiencias;
