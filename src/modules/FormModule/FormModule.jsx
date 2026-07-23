import './FormModule.css';
import Form from '../../components/Form/Form.jsx';
import Input from '../../components/Input/Input.jsx';
import CheckboxList from '../../components/CheckboxList/CheckboxList.jsx';

/**
 * Módulo Form — máster Figma `58195:43756`
 * (Desktop `58195:43767` / Mobile `58195:43777`, layout `text-left`).
 *
 * Dos columnas: a la izquierda un bloque de texto (antetítulo `Body/06` +
 * título SangBleu `Title/04` + cuerpo `Body/05`); a la derecha el componente
 * `Form` (UI11): cabecera (título `Title/01` + descripción) + campos (una fila de
 * dos inputs + dos inputs a ancho completo) + una casilla + acciones
 * (CANCEL terciary / ACCEPT primary).
 *
 * - **Desktop (≥1024px):** texto y formulario lado a lado (`space-between`).
 * - **Mobile:** apilado (texto arriba, formulario debajo a ancho completo).
 *
 * Reutiliza `Form`, `Input`, `CheckboxList`. Hereda el subtema del contenedor;
 * prop opcional `theme` para fijarlo en producción.
 *
 * Notas de máster: (1) el máster incluye un botón azul `#0045ff` con tipografía
 * ajena al sistema (Neue Haas) tras el cuerpo → **omitido** por no pertenecer a
 * los tokens Joselito. (2) En mobile el párrafo del máster usa esa misma fuente
 * ajena; aquí se unifica con `Body/05`. (3) La fila de acciones se alinea a la
 * izquierda como en este máster (el componente `Form` la alinea a la derecha por
 * defecto → override local). Paddings verticales (120 desktop / 40-60 mobile)
 * literales del máster; márgenes laterales vía `--grid-wrapper`.
 */
const DEFAULT_BODY =
  'Lorem ipsum dolor sit amet consectetur. Leo proin nisi in neque hendrerit. Egestas nulla tortor pulvinar eget malesuada diam. Aenean auctor elementum gravida sit odio et eu. Sed sit diam nibh arcu facilisis nunc orci hac in. Dictum cras id erat sollicitudin pellentesque velit adipiscing diam. Purus tellus urna netus nulla duis.';

const DEFAULT_FIELDS = [
  { label: 'Label' },
  { label: 'Label' },
  { label: 'Label' },
  { label: 'Label' },
];

export default function FormModule({
  eyebrow = 'This is a label',
  title = 'Lorem ipsum dolor sit amet consectetur.',
  body = DEFAULT_BODY,
  formTitle = 'Title Form',
  formDescription = 'Description',
  fields = DEFAULT_FIELDS,
  checkboxLabel = 'Label',
  primaryLabel = 'ACCEPT',
  secondaryLabel = 'CANCEL',
  onSubmit,
  onCancel,
  theme,
  className = '',
  ...rest
}) {
  const [a, b, ...rest2] = fields;
  return (
    <section
      className={`jl-form-module ${className}`.trim()}
      data-theme={theme}
      {...rest}
    >
      <div className="jl-form-module__text">
        <div className="jl-form-module__titles">
          {eyebrow && <p className="jl-form-module__eyebrow ts-body-6">{eyebrow}</p>}
          {title && <h2 className="jl-form-module__title ts-title-4">{title}</h2>}
        </div>
        {body && <p className="jl-form-module__body ts-body-5">{body}</p>}
      </div>

      <Form
        className="jl-form-module__form"
        title={formTitle}
        description={formDescription}
        primaryLabel={primaryLabel}
        secondaryLabel={secondaryLabel}
        onSubmit={onSubmit}
        onCancel={onCancel}
      >
        {(a || b) && (
          <div className="jl-form-module__row">
            {a && <Input size="small" label={a.label} />}
            {b && <Input size="small" label={b.label} />}
          </div>
        )}
        {rest2.map((f, i) => (
          <Input key={i} size="small" label={f.label} />
        ))}
        {checkboxLabel && <CheckboxList items={[{ label: checkboxLabel }]} />}
      </Form>
    </section>
  );
}
