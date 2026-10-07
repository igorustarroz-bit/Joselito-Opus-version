import { useState } from 'react';
import ButtonActionLink from '../ButtonActionLink/ButtonActionLink';
import Icon from '../Icon/Icon';
import './Alert.css';

export const TYPES = ['Default', 'Language'];
const LANGS = [{ value: 'es', label: 'Español' }, { value: 'en', label: 'English' }, { value: 'fr', label: 'Français' }];

/**
 * Barra de aviso a ancho completo (encima de la cabecera o del pie). `Default`: mensaje + enlace de acción
 * (SUBCRÍBETE). `Language`: mensaje + selector de idioma + CONFIRMAR. Cuando la barra mide 768 px o más (container query) los elementos van en una fila
 * (mensaje a la izquierda, acción a la derecha); por debajo se apila como en la variante Mobile.
 */
export default function Alert({
  type = 'Default',
  text,
  buttonText,
  showButton = true,
  showDropdown = true,
  languages = LANGS,
  language,
  onLanguageChange,
  onAction,
  theme,
  className = '',
  ...rest
}) {
  const isLang = type === 'Language';
  const [lang, setLang] = useState(language ?? 'en');
  const current = language ?? lang;
  const msg = text ?? (isLang ? 'Confirmar el idioma seleccionada:' : 'No te pierdas lo último de Joselito');
  const cta = buttonText ?? (isLang ? 'CONFIRMAR' : 'SUBCRÍBETE');
  return (
    <div className={['alert', `alert--${type.toLowerCase()}`, className].filter(Boolean).join(' ')} role="region" aria-label="Aviso" data-theme={theme} {...rest}>
      <div className="alert__inner">
      <div className="alert__main">
        <p className="alert__text ts-body-02">{msg}</p>
        {isLang && showDropdown && (
          <label className="alert__select ts-body-02">
            <span>{languages.find((l) => l.value === current)?.label ?? current}</span>
            <Icon name="caret-down" size="XXS" />
            <select value={current} aria-label="Idioma"
              onChange={(e) => { setLang(e.target.value); onLanguageChange?.(e.target.value); }}>
              {languages.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </label>
        )}
        {!isLang && showButton && <ButtonActionLink className="alert__cta alert__cta--inline" size="S" state="Hover" text={cta} onClick={onAction} />}
      </div>
      {showButton && <ButtonActionLink className={`alert__cta ${isLang ? '' : 'alert__cta--desktop'}`} size="S" state="Hover" text={cta} onClick={onAction} />}
      </div>
    </div>
  );
}
