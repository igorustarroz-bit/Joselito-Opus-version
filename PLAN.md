# PLAN.md — Joselito

Estados: `[ ]` pendiente · `[~]` en progreso · `[x]` hecho · `[!]` bloqueado · `[-]` fuera de alcance.
Nada se marca hecho sin cumplir la **Definition of Done** (CONTEXT.md / references/dod.md).
Generado por `scripts/plan.mjs` desde `.ai/index.json`: para cambiar estados usa `npm run plan -- --set <clave>=done --fp` o marca el checkbox (se respeta al regenerar).

**Progreso:** 58/107 hechos · 0 en curso · 0 bloqueados

## Fase 0 — Setup

- [x] Configuración del proyecto (hanzo.config.json, permisos, git, MCP, plan Figma) <!-- k:setup:config -->
- [x] Scaffold del perfil de salida (react-storybook) + despliegue <!-- k:setup:scaffold -->
- [x] Tipografías: Google Fonts si existen, fonts-raw/ si no (npm run fonts) <!-- k:setup:webfonts -->

## Fase 1 — Tokens (antes que cualquier componente)

- [x] Volcado de variables y estilos (.ai/figma/variables.json) <!-- k:tokens:dump -->
- [x] Generar tokens (npm run tokens) y documentarlos: primitivas, responsive/breakpoints, subtemas, tipografía, espaciados, grid, efectos <!-- k:tokens:generate -->

## Fase 2 — Foundations

- [x] Aspect Ratio `50942:37236` — 8 variantes · 8 img <!-- k:foundation:aspect-ratio -->

## Fase 2b — Iconos y brand assets

- [x] Set de iconos (137) → SVGR/SVGO <!-- k:icons:set -->
- [x] Visa `63609:144103` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:visa -->
- [x] Brand Logo `58073:6883` — 2 variantes · confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:brand-logo -->
- [x] Logo Grid `51027:8208` — 2 variantes · confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:logo-grid -->
- [x] Logo Riu `52007:6841` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:logo-riu -->
- [x] Logo UFV `49722:3620` — 4 variantes · confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:logo-ufv -->
- [x] PEFC CERTIFICATE `58786:48814` — 3 variantes · confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:pefc-certificate -->
- [x] Customer Award Ekomi `58786:48912` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:customer-award-ekomi -->
- [x] Logo_junta_de_castilla_y_leon `58799:2555` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:logo-junta-de-castilla-y-leon -->
- [x] firma_ferran_adria `62303:284950` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:firma-ferran-adria -->
- [x] firma_nou_manolín `62348:109683` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:firma-nou-manolin -->
- [x] firma_eneko_atxa `62348:110429` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:firma-eneko-atxa -->
- [x] firma_bittor_arginzoniz `62348:110843` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:firma-bittor-arginzoniz -->
- [x] firma_yannick_alleno `62348:111288` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:firma-yannick-alleno -->
- [x] firma_joaquim_wissler `62348:111452` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:firma-joaquim-wissler -->
- [x] firma_seiji_yamamoto `62348:111667` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:firma-seiji-yamamoto -->
- [x] firma_jonnie_boer `62348:111829` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:firma-jonnie-boer -->
- [x] firma_massimiliano_alajmo `62348:111888` — confirmar alcance (logos de terceros, certificaciones…) <!-- k:brand:firma-massimiliano-alajmo -->

## Fase 2.5 — HITO de imágenes (justo después de los iconos; no se salta)

- [x] HITO: descarga de imágenes raster → WebP + maps/images.json (npm run images) — 242 img <!-- k:milestone:images -->

## Fase 3 — Componentes (ordenados: primero los que son base de otros)

- [x] Button-Action-Link `49038:9486` — 12 variantes <!-- k:component:button-action-link -->
- [x] Button-Icon `49038:9364` — 65 variantes <!-- k:component:button-icon -->
- [x] Button `49038:9189` — 60 variantes <!-- k:component:button -->
- [x] Tag `49723:4763` — 9 variantes <!-- k:component:tag -->
- [x] Title `61387:120074` — 2 variantes <!-- k:component:title -->
- [x] NavButton `59214:48916` — 5 variantes <!-- k:component:nav-button -->
- [x] Checkboxes-Radios `49722:19804` — 20 variantes · autolayout 11/20 → análisis de geometría <!-- k:component:checkboxes-radios -->
- [x] InputQuantity `63264:120792` <!-- k:component:input-quantity -->
- [x] Card Product `61276:118038` — 4 variantes · 4 img · usa: Aspect Ratio, Button, Button-Action-Link, InputQuantity, Tag <!-- k:component:card-product -->
- [x] listbox_Item_Dropdown `49650:11827` — 7 variantes · 7 img · usa: Aspect Ratio, Checkboxes-Radios <!-- k:component:listbox-item-dropdown -->
- [x] Listbox `49650:12399` — usa: listbox_Item_Dropdown <!-- k:component:listbox -->
- [x] Input `49118:2300` — 28 variantes · usa: Listbox, listbox_Item_Dropdown <!-- k:component:input -->
- [x] menu-item-list `59289:58053` — 2 variantes <!-- k:component:menu-item-list -->
- [x] RowButtons `63609:144479` — 2 variantes · usa: Button <!-- k:component:row-buttons -->
- [x] Checkbox-Label `43246:12097` — 12 variantes · usa: Checkboxes-Radios <!-- k:component:checkbox-label -->
- [x] Stepper_for_toast `59964:130709` — 3 variantes · autolayout 0/3 → análisis de geometría <!-- k:component:stepper-for-toast -->
- [x] Divider `63480:2560` — autolayout 0/1 → análisis de geometría <!-- k:component:divider -->
- [x] Go_Back `63191:162092` — 2 variantes · usa: Button-Icon <!-- k:component:go-back -->
- [x] mobile_menu_accordion `58512:82775` — 3 variantes · 2 img · usa: Aspect Ratio, Button-Action-Link, menu-item-list <!-- k:component:mobile-menu-accordion -->
- [ ] 404_picture `63681:482695` — 6 variantes · 6 img · usa: Aspect Ratio · autolayout 0/6 → análisis de geometría <!-- k:component:404-picture -->
- [x] accordion `57943:46054` — 2 variantes <!-- k:component:accordion -->
- [x] Add_to_list `63192:173727` — 2 variantes · usa: Button-Action-Link <!-- k:component:add-to-list -->
- [x] Alert `58786:10976` — 4 variantes · usa: Button-Action-Link <!-- k:component:alert -->
- [x] Block Address `63606:143410` — 1 img · usa: Visa <!-- k:component:block-address -->
- [x] Block Archive List `59966:84496` — 5 variantes <!-- k:component:block-archive-list -->
- [x] Block best price `59966:4909` <!-- k:component:block-best-price -->
- [x] Block Big Numbers `59966:84230` — 1 img · usa: Aspect Ratio <!-- k:component:block-big-numbers -->
- [x] Card Carrusel `58182:24262` — 2 variantes · 2 img · usa: Aspect Ratio, Button, Button-Action-Link <!-- k:component:card-carrusel -->
- [x] Card-Social-media `63911:364852` — 2 variantes · 2 img · usa: Aspect Ratio <!-- k:component:card-social-media -->
- [x] Checkbox-List `57947:46573` — 2 variantes · usa: Checkbox-Label, Checkboxes-Radios <!-- k:component:checkbox-list -->
- [ ] Form `57947:46433` — usa: Button, Button-Action-Link, Checkbox-Label, Checkbox-List, Checkboxes-Radios, Input… <!-- k:component:form -->
- [ ] InputAndButton `58786:21956` — 14 variantes · usa: Button-Icon <!-- k:component:input-and-button -->
- [x] subnavigation-item `59289:60784` — 2 variantes <!-- k:component:subnavigation-item -->
- [x] tab_primary `57943:37527` — 5 variantes <!-- k:component:tab-primary -->
- [x] tab_secondary `57943:45626` — 5 variantes <!-- k:component:tab-secondary -->
- [ ] Toast `58182:23548` — 1 img · usa: Aspect Ratio, Button-Action-Link, Stepper_for_toast <!-- k:component:toast -->
- [ ] Accordion `57943:46123` — usa: accordion <!-- k:component:accordion -->
- [ ] Block Row Address `63609:148071` — usa: Button-Icon <!-- k:component:block-row-address -->
- [ ] Card Link `58182:23781` — 1 img · usa: Aspect Ratio <!-- k:component:card-link -->
- [ ] Input-Code `63264:50565` — 7 variantes <!-- k:component:input-code -->
- [ ] Input-Phone `63309:351579` — 14 variantes <!-- k:component:input-phone -->
- [ ] Modal_Lightbox `60581:102087` — 10 variantes · 11 img · usa: Alert, Aspect Ratio, Button, Button-Icon, Checkboxes-Radios, RowButtons… <!-- k:component:modal-lightbox -->
- [ ] Order by Day `63559:58027` — 2 variantes · 8 img · usa: Aspect Ratio, Button-Action-Link, Button-Icon, Card Product, Tag <!-- k:component:order-by-day -->
- [ ] Order Summary `63609:146051` — 2 variantes · 8 img · usa: Aspect Ratio, Button-Action-Link, Card Product, Tag <!-- k:component:order-summary -->
- [ ] Overlay `58786:13661` — autolayout 0/1 → análisis de geometría <!-- k:component:overlay -->
- [ ] Placeholder-Text `57961:792` <!-- k:component:placeholder-text -->
- [ ] row_2_input `57953:9134` — usa: Input <!-- k:component:row-2-input -->
- [ ] row_3_input `57953:9192` — usa: Input <!-- k:component:row-3-input -->
- [ ] Sending Details `63609:144166` — 2 variantes · 2 img · usa: Block Address, Visa <!-- k:component:sending-details -->
- [x] Tabs `57943:45783` — 2 variantes · usa: tab_primary, tab_secondary <!-- k:component:tabs -->

## Fase 4 — Módulos (100% ancho, grid de columnas del sistema, por breakpoint)

- [ ] M01-Navigation `58182:4143` — 6 variantes · usa: Brand Logo, NavButton <!-- k:module:m01-navigation -->
- [ ] M02-Menu `58182:4350` — 5 variantes · 10 img · usa: Aspect Ratio, Brand Logo, Button-Action-Link, M01-Navigation, NavButton, menu-item-list… <!-- k:module:m02-menu -->
- [ ] M06-Navigation-Secondarymenu `60634:75153` — 5 variantes · 1 img · usa: Aspect Ratio, M02-Menu, NavButton, menu-item-list, subnavigation-item <!-- k:module:m06-navigation-secondarymenu -->
- [ ] M03-Navigation-Footer `58163:33397` — 2 variantes · 2 img · usa: Aspect Ratio, Button-Action-Link, Button-Icon, Checkbox-Label, Checkboxes-Radios, Customer Award Ekomi… <!-- k:module:m03-navigation-footer -->
- [ ] M04-Login `63727:483351` — 2 variantes · usa: Aspect Ratio, Brand Logo, Button, Divider, Form, Input… <!-- k:module:m04-login -->
- [ ] M05-Filter-Secondary Menu `61276:141868` — 8 variantes · usa: Button, Button-Action-Link, Button-Icon, Checkboxes-Radios, Tag, listbox_Item_Dropdown <!-- k:module:m05-filter-secondary-menu -->
- [ ] M07-Content-Text+Image `58363:34365` — 12 variantes · 12 img · usa: Aspect Ratio, Divider, RowButtons <!-- k:module:m07-content-text-image -->
- [ ] M08-Content-Imageonly `59895:103739` — 6 variantes · 8 img · usa: Aspect Ratio · autolayout 5/6 → análisis de geometría <!-- k:module:m08-content-imageonly -->
- [ ] M09-ContentStack-Text+ Image `58468:60216` — 7 variantes · 7 img · usa: Aspect Ratio, Button <!-- k:module:m09-content-stack-text-image -->
- [ ] M10-Errors `63688:482735` — 2 variantes · 2 img · usa: 404_picture, Aspect Ratio, Button-Action-Link · autolayout 0/2 → análisis de geometría <!-- k:module:m10-errors -->
- [ ] M11-Content-Textonly `58163:39972` — 5 variantes · usa: button <!-- k:module:m11-content-textonly -->
- [ ] M12-Content-Introtext `58153:32094` — 2 variantes · usa: Button-Action-Link <!-- k:module:m12-content-introtext -->
- [ ] M13-Hero-Homepagehero `58182:4353` — 4 variantes · 2 img · usa: Aspect Ratio, Brand Logo, M01-Navigation, NavButton, Stepper_for_toast, Toast · autolayout 0/4 → análisis de geometría <!-- k:module:m13-hero-homepagehero -->
- [ ] M14-Hero-Sectionheader `58508:6679` — 6 variantes · 9 img · usa: Aspect Ratio, Button, Button-Action-Link, Button-Icon, Go_Back, Tag… <!-- k:module:m14-hero-sectionheader -->
- [ ] M15-Hero-Sectionhero `58508:35830` — 12 variantes · usa: Aspect Ratio, Brand Logo, Button-Action-Link, Button-Icon, M01-Navigation, NavButton · autolayout 4/12 → análisis de geometría <!-- k:module:m15-hero-sectionhero -->
- [ ] M16-Hero-Productdetail `61365:56297` — 4 variantes · 11 img · usa: Add_to_list, Aspect Ratio, Brand Logo, Button, Button-Action-Link, Button-Icon… · autolayout 2/4 → análisis de geometría <!-- k:module:m16-hero-productdetail -->
- [ ] M17-Banners-Sectionbanner `58182:4380` — 8 variantes · 8 img · usa: Aspect Ratio, Button-Action-Link, Tag · autolayout 6/8 → análisis de geometría <!-- k:module:m17-banners-sectionbanner -->
- [ ] M18-Banners-Full Screen Slider `59895:79904` — 14 variantes · 26 img · usa: Aspect Ratio, Button-Action-Link, Tag, Title · autolayout 2/14 → análisis de geometría <!-- k:module:m18-banners-full-screen-slider -->
- [ ] M19-Card-Grid `61387:153548` — 2 variantes · 12 img · usa: Aspect Ratio, Card Product, Tag, Title <!-- k:module:m19-card-grid -->
- [ ] M20-List `60186:9313` — 2 variantes · usa: Arrow, Arrow Dropdown, Block best price, Main_Secondary-Link, Title <!-- k:module:m20-list -->
- [ ] M21-List-Numbers `58627:43781` — 2 variantes · 2 img · usa: Aspect Ratio, Block Big Numbers, Title <!-- k:module:m21-list-numbers -->
- [ ] M22-NavigationDirectLink `60603:144636` — 8 variantes · 2 img · usa: Aspect Ratio, Button-Icon, Tag <!-- k:module:m22-navigation-direct-link -->
- [ ] M23-Cards-Gallery `60054:12474` — 6 variantes · 16 img · usa: Aspect Ratio, Button-Icon, Card-Social-media, Title · autolayout 5/6 → análisis de geometría <!-- k:module:m23-cards-gallery -->
- [ ] M24-Cards-Productcarousel `60286:43172` — 2 variantes · 7 img · usa: Arrow, Aspect Ratio, Card Product, Title <!-- k:module:m24-cards-productcarousel -->
- [ ] M25-Cards-Links `58182:4396` — 4 variantes · 6 img · usa: Aspect Ratio, Button, Button-Action-Link, Card Carrusel, Title <!-- k:module:m25-cards-links -->
- [ ] M26-Buscador `61439:232705` — 6 variantes · usa: Brand Logo, Button, Button-Action-Link, Button-Icon <!-- k:module:m26-buscador -->
- [ ] M27-Cards-Categories `58163:40311` — 2 variantes · 6 img · usa: Aspect Ratio, Button-Icon, Card Product <!-- k:module:m27-cards-categories -->
- [ ] M28-Cards-Accordion `58512:9289` — 5 variantes · 13 img · usa: */Overrides/Stars/Star, Aspect Ratio, Button, Button-Action-Link, Tag, Title <!-- k:module:m28-cards-accordion -->
- [ ] M29-User-Profile `63559:53572` — 2 variantes · usa: M06-Navigation-Secondarymenu, menu-item-list <!-- k:module:m29-user-profile -->
- [ ] M30-Hero-Joselito-Lab `63928:325885` — 2 variantes · 12 img · usa: Aspect Ratio, Brand Logo, M01-Navigation, NavButton · autolayout 0/2 → análisis de geometría <!-- k:module:m30-hero-joselito-lab -->
- [ ] M31-Navigation-PreviousNext `58464:36878` — 2 variantes · usa: Button-Icon <!-- k:module:m31-navigation-previous-next -->
- [ ] M32-List-ArchiveList `59895:46608` — 2 variantes · 2 img · usa: Aspect Ratio, Block Archive List, Button, Title · autolayout 1/2 → análisis de geometría <!-- k:module:m32-list-archive-list -->
