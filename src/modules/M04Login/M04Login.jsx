import AspectRatio from '../../components/AspectRatio/AspectRatio';
import Button from '../../components/Button/Button';
import Divider from '../../components/Divider/Divider';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import RowButtons from '../../components/RowButtons/RowButtons';
import M01Navigation from '../M01Navigation/M01Navigation';
import dehesaPoster from '../../assets/images/video-dehesa-aerea.webp';
import './M04Login.css';

const PROVIDERS = [{ text: 'ENTRA CON SHOPIFY' }, { text: 'ENTRA CON GOOGLE' }];

/**
 * Pantalla de acceso. Escritorio (desde 1024 px): medio a la izquierda (mitad de la pantalla) y el
 * formulario centrado a la derecha, con la M01-Navigation (Grey) por encima. Móvil: solo el formulario.
 */
export default function M04Login({
  title = 'Mi cuenta', description = 'Introduce tu correo para iniciar sesión o crear una cuenta.',
  emailLabel = 'Introduce tu correo electrónico', submitText = 'CONTINUAR', providers = PROVIDERS,
  showPhoto = true, media = { type: 'image', src: dehesaPoster }, showNavigation = true, onSubmit, theme = 'light-white', className = '', ...rest
}) {
  return (
    <section className={['m04-login', showPhoto ? 'has-photo' : '', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {showNavigation && <M01Navigation className="m04-login__nav" mode="Grey" />}
      {showPhoto && (
        <AspectRatio className="m04-login__media" size="Fill" src={media?.type === 'video' ? undefined : media?.src} alt="">
          {media?.type === 'video' && <video className="aspect-ratio__media" src={media.src} poster={media.poster} autoPlay muted loop playsInline />}
        </AspectRatio>
      )}
      <div className="m04-login__modal">
        <div className="m04-login__slot">
          <Form className="m04-login__form" title={title} description={description} showCheckbox={false} showButtonRow={false}
            onSubmit={onSubmit}>
            <Input label={emailLabel} type="Default" inputType="email" name="email" showInfo={false} showCaret={false} />
            <Button className="m04-login__submit" type="Primary" size="M" text={submitText} htmlType="submit" />
          </Form>
          <Divider />
          <RowButtons className="m04-login__providers">
            {providers.map((p, i) => <Button key={i} type="Secondary" size="M" text={p.text} onClick={p.onClick} />)}
          </RowButtons>
        </div>
      </div>
    </section>
  );
}
