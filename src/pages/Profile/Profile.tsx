import profile from './Profile.module.css';
import { FC, FormEvent, useEffect, MouseEvent, FocusEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser, updateUser } from '../../services/actions';
import { useFormWithValidation } from '../../hooks/useValidation';
import {
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import { TSButton } from '../../components/TSButton/TSButton';

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector(store => store.loggedIn);
  const {
    name: savedName,
    email: savedEmail
  } = useAppSelector(store => store.user);
  const { values, handleChange, errors, partialSend, resetForm } =
    useFormWithValidation({
      name: savedName,
      email: savedEmail,
      password: ''
    }, {
      name: true,
      email: true,
      password: true
    });
  const noDuplicate =
    values.name !== savedName ||
    values.email !== savedEmail ||
    values.password !== '';
  const valid = noDuplicate && partialSend;

  useEffect(() => {
    Array.from(document.querySelectorAll('input')).forEach(input =>
      input.setAttribute('readonly', 'true')
    );
  }, []);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getUser());
      resetForm({ name: savedName, email: savedEmail, password: '' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm, savedName, savedEmail]);

  function handleSubmit(evt: FormEvent) {
    let data = {};

    if (values.name !== savedName) {
      data = ({...data, name: values.name});
    };
    if (values.email !== savedEmail) {
      data = ({...data, email: values.email});
    };
    if (values.password !== '') {
      data = ({...data, password: values.password});
    };

    evt.preventDefault();
    dispatch(updateUser(data));
    resetForm({ name: savedName, email: savedEmail, password: '' });
  };

  function handleClick() {
    resetForm({ name: savedName, email: savedEmail, password: '' });
  };

  function enableInput(evt?: MouseEvent) {
    const input = evt?.currentTarget
      .closest('.input')
      ?.querySelector('input') as HTMLInputElement;
    input.removeAttribute('readonly');
    input.focus();
  };

  function disableInput(evt?: FocusEvent) {
    const input = evt?.currentTarget
      .closest('.input')
      ?.querySelector('input') as HTMLInputElement;
    input.setAttribute('readonly', 'true');
  };

  return (
    <section className={profile.profile} aria-label="профиль">
      <div className={profile.profile__cover}>
        <ProfileMenu />
        <form
          className={`${profile.profile__form} ml-15 mr-15`}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={`${profile.profile__inputCover} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={handleChange}
              onIconClick={enableInput}
              onBlur={disableInput}
              icon={'EditIcon'}
              name={'name'}
              value={values.name}
              error={Boolean(errors.name)}
              errorText={errors.name}
              size={'default'}
            />
          </div>
          <div className={`${profile.profile__inputCover} mb-6`}>
            <Input
              type={'email'}
              placeholder={'Логин'}
              onChange={handleChange}
              onIconClick={enableInput}
              onBlur={disableInput}
              icon={'EditIcon'}
              name={'email'}
              value={values.email}
              error={Boolean(errors.email)}
              errorText={errors.email}
              size={'default'}
            />
          </div>
          <div className={`${profile.profile__inputCover} mb-6`}>
            <Input
              type={'password'}
              placeholder={'Пароль'}
              onChange={handleChange}
              onIconClick={enableInput}
              onBlur={disableInput}
              icon={'EditIcon'}
              name={'password'}
              value={values.password}
              error={Boolean(errors.password)}
              errorText={errors.password}
              size={'default'}
            />
          </div>
          <div
            className={`${profile.profile__buttonCover} ${
              noDuplicate ? profile.profile__buttonCover_active : ''
            }`}
          >
            <TSButton type="primary" size="large" disabled={!valid}>
              Сохранить
            </TSButton>
            <button
              className={`${profile.profile__button} text text_type_main-default`}
              type="button"
              onClick={handleClick}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
