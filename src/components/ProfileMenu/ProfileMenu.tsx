import profileMenu from './ProfileMenu.module.css';
import { FC, MouseEvent } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { sendLogout } from '../../services/actions';

const ProfileMenu: FC = () => {
  const dispatch =useAppDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const refreshToken = localStorage.getItem('refreshToken');

  function handleSubmit(evt: MouseEvent) {
    evt.preventDefault();
    dispatch(sendLogout(
      { token: refreshToken },
      () => {
        history.replace({ pathname: '/login' });
      }
    ));
  };

  return (
    <div className={profileMenu.profileMenu}>
      <nav className={profileMenu.profileMenu__cover}>
        <div className={profileMenu.profileMenu__linkCover}>
          <NavLink
            to="/profile"
            exact
            className={`${profileMenu.profileMenu__link} text text_type_main-medium`}
            activeClassName={profileMenu.profileMenu__link_active}
          >
            Профиль
          </NavLink>
        </div>
        <div className={profileMenu.profileMenu__linkCover}>
          <NavLink
            to="/profile/orders"
            className={`${profileMenu.profileMenu__link} text text_type_main-medium`}
            activeClassName={profileMenu.profileMenu__link_active}
          >
            История заказов
          </NavLink>
        </div>
        <div className={profileMenu.profileMenu__linkCover}>
          <NavLink
            to="/login"
            className={`${profileMenu.profileMenu__link} text text_type_main-medium`}
            activeClassName={profileMenu.profileMenu__link_active}
            onClick={handleSubmit}
          >
            Выход
          </NavLink>
        </div>
      </nav>
      <p
        className={`${
          profileMenu.profileMenu__text
        } text text_type_main-default mt-20`}
      >
        {pathname === '/profile'
          ? 'В этом разделе вы можете изменить свои персональные данные'
          : pathname === '/profile/orders'
          ? 'В этом разделе вы можете просмотреть свою историю заказов'
          : ''}
      </p>
    </div>
  );
}

export default ProfileMenu;
