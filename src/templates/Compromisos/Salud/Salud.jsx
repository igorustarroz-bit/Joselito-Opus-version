import './Salud.css';

import Navigation from '../../../modules/Navigation/Navigation.jsx';
import SectionHero from '../../../modules/SectionHero/SectionHero.jsx';
import ContentTextImage from '../../../modules/ContentTextImage/ContentTextImage.jsx';
import List from '../../../modules/List/List.jsx';
import ListNumbers from '../../../modules/ListNumbers/ListNumbers.jsx';
import CardsShowcase from '../../../modules/CardsShowcase/CardsShowcase.jsx';
import Footer from '../../../modules/Footer/Footer.jsx';

/**
 * Page Template — Compromisos · Salud.
 * Máster Figma: página "↳ Compromisos…" (58080:18443), versión más a la izquierda:
 * desktop `58512:66781` (1440×6952) y mobile `58512:66792` (390×7329).
 *
 * COMPOSICIÓN (de arriba abajo):
 *   1. Navigation ................. header (claro)
 *   2. Hero / Section hero ........ `layout="full-bleed"` (claro)
 *   3. Content / Text + Image ..... `type="right"`, sin label ni CTA (claro)
 *   4. Main-Description ⚠️ ......... sección a medida → mapeada a `List` (título + columnas)
 *   5. List / Numbers ............. cifras destacadas (claro)
 *   6. Content / Text + Image ..... `type="right"`, sin label ni CTA (claro)
 *   7. Content / Text + Image ..... `type="left"`, sin label ni CTA (claro)
 *   8. Content / Text + Image ..... `type="right"`, sin label ni CTA (claro)
 *   9. Cards / Showcase ........... `type="many"` (claro)
 *  10. Navigation / Footer ........ footer
 *
 * Toda la página en Light-White.
 *
 * Nota de mapeo (decisión del equipo, Instrucciones §13): la franja 4 ("Beneficios
 * específicos": título + 3 columnas de características) está construida a medida en el
 * máster; se aproxima con el módulo `List` (título + ítems en columnas con divisores).
 */
export default function Salud({ className = '', ...rest }) {
  return (
    <div className={`jl-tmpl-salud ${className}`.trim()} {...rest}>
      <Navigation />
      <SectionHero layout="full-bleed" />
      <ContentTextImage type="right" label={null} cta={null} />
      {/* ⚠️ Main-Description a medida → List */}
      <List />
      <ListNumbers />
      <ContentTextImage type="right" label={null} cta={null} />
      <ContentTextImage type="left" label={null} cta={null} />
      <ContentTextImage type="right" label={null} cta={null} />
      <CardsShowcase type="many" />
      <Footer />
    </div>
  );
}
