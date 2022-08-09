import resetPassword from './ResetPassword.module.css';
import { FC, FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormWithValidation } from '../../hooks/useValidation';
import { sendReset } from '../../services/actions';
import { TDispatch, TStore } from '../../utils/types';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TSButton } from '../../components/TSButton/TSButton';

const ResetPassword: FC = () => {
  const history = useHistory();
  const { restore }: { restore: boolean } = useSelector(
    (store: TStore) => store.restore
  );
  const dispatch = useDispatch<TDispatch>();
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = useFormWithValidation({ password: '', code: '' });
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    !restore && history.replace({ pathname: '/forgot-password' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  useEffect(() => {
    resetForm({ password: '', code: '' });
  }, [resetForm]);

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    dispatch(
      sendReset(
        {
          password: values.password,
          token: values.code
        },
        () => { history.replace({ pathname: '/login' }); }
      )
    );
  };

  function toggleVisibility() {
    setHidden(state => !state);
  };

  return (
    <section className={resetPassword.resetPassword}>
      <div className={resetPassword.resetPassword__cover}>
        <h2
          className={`${
            resetPassword.resetPassword__title
          } text text_type_main-medium pb-6`}
        >
          Восстановление пароля
        </h2>
        <form
          className={resetPassword.resetPassword__form}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={`${resetPassword.resetPassword__inputCover} mb-6`}>
            <Input
              type={hidden ? 'password' : 'text'}
              placeholder={'Введите новый пароль'}
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
          <div className={`${resetPassword.resetPassword__inputCover} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={handleChange}
              name={'code'}
              value={values.code}
              error={Boolean(errors.code)}
              errorText={errors.code}
              size={'default'}
            />
          </div>
          <div className={resetPassword.resetPassword__buttonCover}>
            <TSButton type="primary" size="large" disabled={!isValid}>
              Сохранить
            </TSButton>
          </div>
        </form>
        <p className={`${
            resetPassword.resetPassword__text
          } text text_type_main-default mt-20`}
        >
          Вспомнили пароль?
          <Link
            to="/login"
            className={resetPassword.resetPassword__link}
          >
            {" "}
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default ResetPassword;
