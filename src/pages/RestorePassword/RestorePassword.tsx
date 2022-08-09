import restorePassword from './RestorePassword.module.css';
import { FC, FormEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormWithValidation } from '../../hooks/useValidation';
import { sendRestore } from '../../services/actions';
import { TDispatch, TStore } from '../../utils/types';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TSButton } from '../../components/TSButton/TSButton';

const RestorePassword: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<TDispatch>();
  const { loggedIn }: { loggedIn: boolean } = useSelector(
    (store: TStore) => store.loggedIn
  );
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

  function handleSubmit(evt: FormEvent) {
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
            <TSButton type="primary" size="large" disabled={!isValid}>
              Восстановить
            </TSButton>
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
