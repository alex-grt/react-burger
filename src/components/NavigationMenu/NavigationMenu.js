import navigationMenu from './NavigationMenu.module.css';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  CurrencyIcon,
  CloseIcon,
  ListIcon,
  ProfileIcon,
  Logo,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

function NavigationMenu({ menuOpen, onClose }) {
  const { pathname } = useLocation();

  function handlePopupClose(evt) {
    evt.target.classList.contains(navigationMenu.navigationOverlay) && onClose();
  }

  return (
    <>
      <div
        className={`${navigationMenu.navigationOverlay} ${
          menuOpen ? navigationMenu.navigationOverlay_opened : ''
          }`}
          onClick={handlePopupClose}
      />
      <nav
        className={`${navigationMenu.navigation} ${
          menuOpen ? navigationMenu.navigation_opened : ''
        }`}
        aria-label="меню навигации"
      >
        <button
          className={`${
            navigationMenu.navigation__buttonClose
          } ${
            navigationMenu.navigation__button_form_oval
          } p-4`}
          type="button"
          aria-label="кнопка Закрыть"
          onClick={onClose}
        >
          <CloseIcon type="primary" />
        </button>
        <div className={navigationMenu.navigation__cover}>
          <Link
            to="/"
            className={navigationMenu.navigation__logo}
            onClick={onClose}
          >
            <Logo />
          </Link>
          <Link
            to="/"
            className={`${
              navigationMenu.navigation__button
            } ${
              navigationMenu.navigation__button_form_oval
            } pt-4 pb-4 pl-5 pr-5`}
            onClick={onClose}
          >
            {pathname === '/' ? (
              <CurrencyIcon type="primary" />
            ) : (
              <CurrencyIcon type="secondary" />
            )}
            <p
              className={`${
                navigationMenu.navigation__buttonText
              } text text_type_main-default ml-2 ${
                pathname === '/' ? navigationMenu.navigation__buttonText_active : ''
              }`}
            >
              Конструктор
            </p>
          </Link>
          <Link
            to="/order"
            className={`${
              navigationMenu.navigation__button
            } ${
              navigationMenu.navigation__button_form_oval
            } pt-4 pb-4 pl-5 pr-5`}
            onClick={onClose}
          >
            {pathname === '/order' ? (
              <ListIcon type="primary" />
            ) : (
              <ListIcon type="secondary" />
            )}
            <p
              className={`${
                navigationMenu.navigation__buttonText
              } text text_type_main-default ml-2 ${
                pathname === '/order' ? navigationMenu.navigation__buttonText_active : ''
              }`}
            >
              Лента заказов
            </p>
          </Link>
        </div>
        <Link
          to="/profile"
          className={`${
            navigationMenu.navigation__button
          } ${
            navigationMenu.navigation__button_form_oval
          } mt-6 pt-4 pb-4 pl-5 pr-5`}
          onClick={onClose}
        >
          {pathname.startsWith('/profile') ? (
            <ProfileIcon type="primary" />
          ) : (
            <ProfileIcon type="secondary" />
          )}
          <p
            className={`${
              navigationMenu.navigation__buttonText
            } text text_type_main-default ml-2 ${
              pathname.startsWith('/profile')
              ? navigationMenu.navigation__buttonText_active
              : ''
            }`}
          >
            Личный кабинет
          </p>
        </Link>
      </nav>
    </>
  );
}

NavigationMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default NavigationMenu;
