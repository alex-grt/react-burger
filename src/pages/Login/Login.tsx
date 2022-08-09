import login from './Login.module.css';
import { FC, FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendLogin } from '../../services/actions';
import { useFormWithValidation } from '../../hooks/useValidation';
import { TDispatch, TStore } from '../../utils/types';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TSButton } from '../../components/TSButton/TSButton';

const Login: FC = () => {
  const dispatch = useDispatch<TDispatch>();
  const history: any = useHistory();
  const { loggedIn }: { loggedIn: boolean } = useSelector(
    (store: TStore) => store.loggedIn
  );
  const [hidden, setHidden] = useState(true);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({ email: '', password: '' });

  useEffect(() => {
    loggedIn && history.goBack();
  }, [loggedIn, history]);

  useEffect(() => {
    resetForm({ email: '', password: '' });
  }, [resetForm]);

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    dispatch(
      sendLogin(
        { email: values.email, password: values.password },
        () => {
          history.replace({
            pathname: history?.location?.state?.from?.pathname
              ? history?.location?.state?.from?.pathname
              : '/'
          });
        }
      )
    );
  };

  function toggleVisibility() {
    setHidden(state => !state);
  };

  return (
    <section className={login.login}>
      <div className={login.login__cover}>
        <h2 className={`${login.login__title} text text_type_main-medium pb-6`}>
          Вход
        </h2>
        <form
          className={login.login__form}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={`${login.login__inputCover} mb-6`}>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={handleChange}
              name={'email'}
              value={values.email}
              error={Boolean(errors.email)}
              errorText={errors.email}
              size={'default'}
            />
          </div>
          <div className={`${login.login__inputCover} mb-6`}>
            <Input
              type={hidden ? 'password' : 'text'}
              placeholder={'Пароль'}
              onChange={handleChange}
              onIconClick={toggleVisibility}
              icon={hidden ? 'ShowIcon' : 'HideIcon'}
              name={'password'}
              value={values.password}
              error={Boolean(errors.password)}
              errorText={errors.password}
              size={'default'}
            />
          </div>
          <div className={login.login__buttonCover}>
            <TSButton type="primary" size="large" disabled={!isValid}>
              Войти
            </TSButton>
          </div>
        </form>
        <p className={`${login.login__text} text text_type_main-default mt-20`}>
          Вы — новый пользователь?
          <Link to="/register" className={login.login__link}> Зарегистрироваться</Link>
        </p>
        <p className={`${login.login__text} text text_type_main-default mt-4`}>
          Забыли пароль?
          <Link
            to="/forgot-password"
            className={login.login__link}
          > Восстановить пароль</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
