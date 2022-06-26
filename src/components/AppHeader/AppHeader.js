import './AppHeader.css';
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
    <header className="header">
      <nav className="header__navigation pt-4 pb-4">
        <div className="header__cover">
          <Link
            to="/constructor"
            className="header__button header__button_form_oval pt-4 pb-4 pl-5 pr-5"
          >
            {pathname === '/constructor' ? (
              <CurrencyIcon type="primary" />
            ) : (
              <CurrencyIcon type="secondary" />
            )}
            <p
              className={`header__button-text text text_type_main-default ml-2${
                pathname === '/constructor' ? ' header__button-text_active' : ''
              }`}
            >
              Конструктор
            </p>
          </Link>
          <Link
            to="/order"
            className="header__button header__button_form_oval pt-4 pb-4 pl-5 pr-5"
          >
            {pathname === '/order' ? (
              <ListIcon type="primary" />
            ) : (
              <ListIcon type="secondary" />
            )}
            <p
              className={`header__button-text text text_type_main-default ml-2${
                pathname === '/order' ? ' header__button-text_active' : ''
              }`}
            >
              Лента заказов
            </p>
          </Link>
        </div>
        <Link to="/" className="header__logo" aria-label="логотип">
          <Logo />
        </Link>
        <button
          className="header__button-logo"
          type="button"
          onClick={menuClick}
          aria-label="кнопка меню с логотипом"
        >
          <Logo />
        </button>
        <Link
          to="/profile"
          className="header__button header__button_form_oval pt-4 pb-4 pl-5 pr-5"
        >
          {pathname === '/profile' ? (
            <ProfileIcon type="primary" />
          ) : (
            <ProfileIcon type="secondary" />
          )}
          <p
            className={`header__button-text text text_type_main-default ml-2${
              pathname === '/profile' ? ' header__button-text_active' : ''
            }`}
          >
            Личный кабинет
          </p>
        </Link>
        <button
          className="header__button-menu header__button_form_oval pt-4 pb-4 pl-5 pr-5"
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
