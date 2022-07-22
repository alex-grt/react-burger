import register from './Register.module.css';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendRegistration } from '../../services/actions';
import { useFormWithValidation } from '../../hooks/useValidation';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  Button,
  Input,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hidden, setHidden] = useState(true);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({ name: '', email: '', password: '' });
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (refreshToken) {
      history.goBack();
    }
  }, [refreshToken, history]);

  useEffect(() => {
    resetForm({ name: '', email: '', password: '' });
  }, [resetForm]);

  function handleSubmit(evt) {
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
          type="submit"
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
            <Button type="primary" size="large" disabled={!isValid}>
              Зарегистрироваться
            </Button>
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
