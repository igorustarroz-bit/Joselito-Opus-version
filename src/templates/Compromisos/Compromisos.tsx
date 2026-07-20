import { Navigation } from '@/modules/Navigation';
import { SectionHeader } from '@/modules/SectionHeader';
import { ListCharacteristics } from '@/modules/ListCharacteristics';
import { ContentTextImage } from '@/modules/ContentTextImage';
import { CardsAccordion } from '@/modules/CardsAccordion';
import { Footer } from '@/modules/Footer';
import { Icon } from '@/components/Icon';
import { grad, navItems, footerColumns, copyright } from '@/templates/shared/demo';

/** Template Compromisos — "Sostenibilidad / Happy Pigs / Salud". */
export function Compromisos() {
  const social = <><a href="#" aria-label="Facebook"><Icon name="FacebookLogo" size="m" /></a><a href="#" aria-label="Email"><Icon name="Envelope" size="m" /></a></>;
  return (
    <div>
      <Navigation brand="JOSELITO" items={navItems} />
      <SectionHeader eyebrow="Compromisos" title="Un compromiso con la naturaleza" description="Sostenibilidad, bienestar animal y salud guían todo lo que hacemos." />
      <ListCharacteristics heading="Nuestros pilares" theme="light-grey" items={[
        { icon: 'Recycle', title: 'Sostenibilidad', description: 'Gestión responsable de la dehesa.' },
        { icon: 'HandHeart', title: 'Happy Pigs', description: 'Cerdos criados en libertad y sin estrés.' },
        { icon: 'Microscope', title: 'Salud', description: 'Grasa infiltrada rica en ácido oleico.' },
      ]} />
      <ContentTextImage eyebrow="Sostenibilidad" title="Cuidamos la dehesa" body={<p style={{ margin: 0 }}>Un ecosistema que preservamos para las próximas generaciones.</p>} linkLabel="Nuestro compromiso" image={grad('#373a2c', '#9ba084')} />
      <CardsAccordion heading="Preguntas frecuentes" items={[
        { id: 'a', title: '¿Qué es la dehesa?', content: 'Un bosque mediterráneo de encinas donde crían nuestros cerdos.' },
        { id: 'b', title: '¿Por qué es saludable?', content: 'Su grasa es rica en ácido oleico, como el aceite de oliva.' },
      ]} />
      <Footer brand="Joselito" columns={footerColumns} social={social} copyright={copyright} />
    </div>
  );
}
export default Compromisos;
