import profile from './Profile.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../services/actions';
import { useFormWithValidation } from '../../hooks/useValidation';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  Button,
  Input,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';

function Profile() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(store => store.loggedIn);
  const {
    name: savedName,
    email: savedEmail
  } = useSelector(store => store.user);
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
      input.setAttribute('readonly', true)
    );
  }, []);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getUser());
      resetForm({ name: savedName, email: savedEmail, password: '' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm, savedName, savedEmail]);

  function handleSubmit(evt) {
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

  function enableInput(evt) {
    const input = evt.currentTarget.closest('.input').querySelector('input');
    input.removeAttribute('readonly');
    input.focus();
  };

  function disableInput(evt) {
    evt.currentTarget
      .closest('.input')
      .querySelector('input')
      .setAttribute('readonly', true);
  };

  return (
    <section className={profile.profile} aria-label="??????????????">
      <div className={profile.profile__cover}>
        <ProfileMenu />
        <form
          className={`${profile.profile__form} ml-15 mr-15`}
          type="submit"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={`${profile.profile__inputCover} mb-6`}>
            <Input
              type={'text'}
              placeholder={'??????'}
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
              placeholder={'??????????'}
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
              placeholder={'????????????'}
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
            <Button type="primary" size="large" disabled={!valid}>
              ??????????????????
            </Button>
            <button
              className={`${profile.profile__button} text text_type_main-default`}
              type="button"
              onClick={handleClick}
            >
              ????????????
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
