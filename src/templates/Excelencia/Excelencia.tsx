import { Navigation } from '@/modules/Navigation';
import { SectionHeader } from '@/modules/SectionHeader';
import { SecondaryMenu } from '@/modules/SecondaryMenu';
import { ListNumbers } from '@/modules/ListNumbers';
import { ContentTextImage } from '@/modules/ContentTextImage';
import { ListArchiveTable } from '@/modules/ListArchiveTable';
import { Banner } from '@/modules/Banner';
import { Footer } from '@/modules/Footer';
import { Icon } from '@/components/Icon';
import { grad, navItems, footerColumns, copyright } from '@/templates/shared/demo';

/** Template Excelencia — "Añadas / Curación / Manual de Corte". */
export function Excelencia() {
  const social = <><a href="#" aria-label="Facebook"><Icon name="FacebookLogo" size="m" /></a><a href="#" aria-label="Email"><Icon name="Envelope" size="m" /></a></>;
  return (
    <div>
      <Navigation brand="JOSELITO" items={navItems} />
      <SecondaryMenu items={[{ label: 'Añadas' }, { label: 'Curación', active: true }, { label: 'Manual de corte' }]} />
      <SectionHeader eyebrow="Excelencia" title="Un proceso paciente" description="Cada pieza se cura de forma natural durante años hasta alcanzar su punto óptimo." />
      <ListNumbers heading="Nuestro proceso" theme="light-grey" items={[
        { title: 'Crianza', description: 'Cerdos 100% ibéricos en libertad.' },
        { title: 'Montanera', description: 'Alimentación a base de bellota.' },
        { title: 'Curación', description: 'Entre 36 y 48 meses.' },
      ]} />
      <ContentTextImage reverse eyebrow="Curación" title="El tiempo como aliado" body={<p style={{ margin: 0 }}>Las bodegas naturales marcan el ritmo de una curación lenta y precisa.</p>} linkLabel="Ver añadas" image={grad('#481815', '#e23f36')} />
      <ListArchiveTable columns={['Añada', 'Descripción', 'Curación']} rows={[
        { cells: ['2019', 'Añada excepcional', '48 meses'], href: '#' },
        { cells: ['2018', 'Gran cosecha de bellota', '46 meses'], href: '#' },
        { cells: ['2017', 'Clima ideal de montanera', '44 meses'], href: '#' },
      ]} />
      <Banner title="Aprende a cortar como un profesional" description="Descarga nuestro manual de corte." actions={[{ label: 'Descargar manual' }]} />
      <Footer brand="Joselito" columns={footerColumns} social={social} copyright={copyright} />
    </div>
  );
}
export default Excelencia;
