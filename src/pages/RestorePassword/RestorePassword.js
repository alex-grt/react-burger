import restorePassword from './RestorePassword.module.css';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormWithValidation } from '../../hooks/useValidation';
import { sendRestore } from '../../services/actions';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  Button,
  Input,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

function RestorePassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(store => store.loggedIn);
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = useFormWithValidation({ email: '' });

  useEffect(() => {
    loggedIn && history.goBack();
  }, [loggedIn, history]);

  useEffect(() => {
    resetForm({ email: '' });
  }, [resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(
      sendRestore(
        { email: values.email },
        () => { history.replace({ pathname: '/reset-password' }); }
      )
    );
  };

  return (
    <section className={restorePassword.restorePassword}>
      <div className={restorePassword.restorePassword__cover}>
        <h2
          className={`${
            restorePassword.restorePassword__title
          } text text_type_main-medium pb-6`}
        >
          Восстановление пароля
        </h2>
        <form
          className={restorePassword.restorePassword__form}
          type="submit"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={`${restorePassword.restorePassword__inputCover} mb-6`}>
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
              onChange={handleChange}
              name={'email'}
              value={values.email}
              error={Boolean(errors.email)}
              errorText={errors.email}
              size={'default'}
            />
          </div>
          <div className={restorePassword.restorePassword__buttonCover}>
            <Button type="primary" size="large" disabled={!isValid}>
              Восстановить
            </Button>
          </div>
        </form>
        <p
          className={`${
            restorePassword.restorePassword__text
          } text text_type_main-default mt-20`}
        >
          Вспомнили пароль?
          <Link
            to="/login"
            className={restorePassword.restorePassword__link}
          >
            {" "}
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RestorePassword;
