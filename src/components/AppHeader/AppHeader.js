import appHeader from './AppHeader.module.css';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  CurrencyIcon,
  ListIcon,
  ProfileIcon,
  MenuIcon,
  Logo,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader({ menuClick }) {
  const { pathname } = useLocation();

  return (
    <header className={appHeader.header}>
      <nav className={`${appHeader.header__navigation} pt-4 pb-4`}>
        <div className={appHeader.header__cover}>
          <Link
            to="/"
            className={`${appHeader.header__button} ${
              appHeader.header__button_form_oval
            } pt-4 pb-4 pl-5 pr-5`}
          >
            {pathname === '/' ? (
              <CurrencyIcon type="primary" />
            ) : (
              <CurrencyIcon type="secondary" />
            )}
            <p
              className={`${appHeader.header__buttonText} text text_type_main-default ml-2 ${
                pathname === '/' ? appHeader.header__buttonText_active : ''
              }`}
            >
              Конструктор
            </p>
          </Link>
          <Link
            to="/order"
            className={`${appHeader.header__button} ${
              appHeader.header__button_form_oval
            } pt-4 pb-4 pl-5 pr-5`}
          >
            {pathname === '/order' ? (
              <ListIcon type="primary" />
            ) : (
              <ListIcon type="secondary" />
            )}
            <p
              className={`${appHeader.header__buttonText} text text_type_main-default ml-2 ${
                pathname === '/order' ? appHeader.header__buttonText_active : ''
              }`}
            >
              Лента заказов
            </p>
          </Link>
        </div>
        <Link to="/" className={appHeader.header__logo} aria-label="логотип">
          <Logo />
        </Link>
        <button
          className={appHeader.header__buttonLogo}
          type="button"
          onClick={menuClick}
          aria-label="кнопка меню с логотипом"
        >
          <Logo />
        </button>
        <Link
          to="/profile"
          className={`${appHeader.header__button} ${
            appHeader.header__button_form_oval
          } pt-4 pb-4 pl-5 pr-5`}
        >
          {pathname.startsWith('/profile') ? (
            <ProfileIcon type="primary" />
          ) : (
            <ProfileIcon type="secondary" />
          )}
          <p
            className={`${appHeader.header__buttonText} text text_type_main-default ml-2 ${
              pathname.startsWith('/profile') ? appHeader.header__buttonText_active : ''
            }`}
          >
            Личный кабинет
          </p>
        </Link>
        <button
          className={`${appHeader.header__buttonMenu} ${
            appHeader.header__button_form_oval
          } pt-4 pb-4 pl-5 pr-5`}
          type="button"
          onClick={menuClick}
          aria-label="кнопка меню"
        >
          <MenuIcon type="primary" />
        </button>
      </nav>
    </header>
  );
}

AppHeader.propTypes = {
  menuClick: PropTypes.func.isRequired
}

export default AppHeader;
