import register from './Register.module.css';
import { FC, FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendRegistration } from '../../services/actions';
import { useFormWithValidation } from '../../hooks/useValidation';
import { TDispatch, TStore } from '../../utils/types';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TSButton } from '../../components/TSButton/TSButton';

const Register: FC = () => {
  const dispatch = useDispatch<TDispatch>();
  const history = useHistory();
  const { loggedIn }: { loggedIn: boolean } = useSelector(
    (store: TStore) => store.loggedIn
  );
  const [hidden, setHidden] = useState(true);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({ name: '', email: '', password: '' });

  useEffect(() => {
    loggedIn && history.goBack();
  }, [loggedIn, history]);

  useEffect(() => {
    resetForm({ name: '', email: '', password: '' });
  }, [resetForm]);

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    dispatch(
      sendRegistration(
        { name: values.name, email: values.email, password: values.password },
        () => {
          history.replace({ pathname: '/' });
        }
      )
    );
  };

  function toggleVisibility() {
    setHidden(state => !state);
  };

  return (
    <section className={register.register}>
      <div className={register.register__cover}>
        <h2 className={`${register.register__title} text text_type_main-medium pb-6`}>
          Регистрация
        </h2>
        <form
          className={register.register__form}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={`${register.register__inputCover} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={handleChange}
              name={'name'}
              value={values.name}
              error={Boolean(errors.name)}
              errorText={errors.name}
              size={'default'}
            />
          </div>
          <div className={`${register.register__inputCover} mb-6`}>
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
          <div className={`${register.register__inputCover} mb-6`}>
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
          <div className={register.register__buttonCover}>
            <TSButton type="primary" size="large" disabled={!isValid}>
              Зарегистрироваться
            </TSButton>
          </div>
        </form>
        <p className={`${register.register__text} text text_type_main-default mt-20`}>
          Уже зарегистрированы?
          <Link to="/login" className={register.register__link}> Войти</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
