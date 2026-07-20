import { Navigation } from '@/modules/Navigation';
import { BrandLogo } from '@/components/BrandLogo';
import { SectionHero } from '@/modules/SectionHero';
import { SecondaryMenu } from '@/modules/SecondaryMenu';
import { ContentText } from '@/modules/ContentText';
import { ListTimeline } from '@/modules/ListTimeline';
import { ContentTextImage } from '@/modules/ContentTextImage';
import { PreviousNext } from '@/modules/PreviousNext';
import { Footer } from '@/modules/Footer';
import { Icon } from '@/components/Icon';
import { grad, navItems, footerColumns, copyright } from '@/templates/shared/demo';

/** Template Origen — página de la sección "Nuestra Historia / La Dehesa". */
export function Origen() {
  const social = <><a href="#" aria-label="Facebook"><Icon name="FacebookLogo" size="m" /></a><a href="#" aria-label="Email"><Icon name="Envelope" size="m" /></a></>;
  return (
    <div>
      <Navigation brand={<BrandLogo height={36} />} items={navItems} />
      <SecondaryMenu items={[{ label: 'Nuestra historia', active: true }, { label: 'La dehesa' }, { label: 'La montanera' }]} />
      <SectionHero eyebrow="Origen" title="Nuestra historia" description="Desde 1868, cinco generaciones cuidando cada detalle." image={grad('#260200', '#e23f36')} theme="light-white" />
      <ContentText title="La dehesa" columns={2}>
        <p style={{ margin: 0 }}>La dehesa es un ecosistema único donde nuestros cerdos crecen en libertad.</p>
        <p style={{ margin: 0 }}>Su alimentación a base de bellota durante la montanera define el sabor inconfundible de Joselito.</p>
      </ContentText>
      <ListTimeline heading="Hitos" theme="light-grey" items={[
        { marker: '1868', title: 'Los orígenes', description: 'Comienza la historia en Guijuelo.' },
        { marker: '1980', title: 'Expansión', description: 'El nombre cruza fronteras.' },
        { marker: 'Hoy', title: 'Referente mundial', description: 'El mejor jamón del mundo.' },
      ]} />
      <ContentTextImage eyebrow="La dehesa" title="Cría en libertad" body={<p style={{ margin: 0 }}>Nuestros cerdos crecen en la dehesa, formando la grasa infiltrada que da su sabor.</p>} linkLabel="Conocer más" image={grad('#89906f', '#dcded4')} />
      <PreviousNext prev={{ caption: 'Anterior', label: 'Inicio' }} next={{ caption: 'Siguiente', label: 'Excelencia' }} />
      <Footer brand={<BrandLogo variant="isotype" height={48} />} columns={footerColumns} social={social} copyright={copyright} />
    </div>
  );
}
export default Origen;
