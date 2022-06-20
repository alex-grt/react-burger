import './NavigationMenu.css';
import { Link, useLocation } from 'react-router-dom';
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
    evt.target.classList.contains('navigation-overlay_opened') && onClose();
  }

  return (
    <>
      <div
        className={`navigation-overlay${
          menuOpen ? ' navigation-overlay_opened' : ''
          }`}
          onClick={handlePopupClose}
      />
      <nav
        className={`navigation${menuOpen ? ' navigation_opened' : ''}`}
        aria-label="меню навигации"
      >
        <button
          className="navigation__button-close navigation__button_form_oval p-4"
          type="button"
          aria-label="кнопка Закрыть"
          onClick={onClose}
        >
          <CloseIcon type="primary" />
        </button>
        <div className="navigation__cover">
          <Link
            to="/"
            className="navigation__logo"
            onClick={onClose}
          >
            <Logo />
          </Link>
          <Link
            to="/constructor"
            className="navigation__button navigation__button_form_oval pt-4 pb-4 pl-5 pr-5"
            onClick={onClose}
          >
            {pathname === '/constructor' ? (
              <CurrencyIcon type="primary" />
            ) : (
              <CurrencyIcon type="secondary" />
            )}
            <p
              className={`navigation__button-text text text_type_main-default ml-2${
                pathname === '/constructor' ? ' navigation__button-text_active' : ''
              }`}
            >
              Конструктор
            </p>
          </Link>
          <Link
            to="/order"
            className="navigation__button navigation__button_form_oval pt-4 pb-4 pl-5 pr-5"
            onClick={onClose}
          >
            {pathname === '/order' ? (
              <ListIcon type="primary" />
            ) : (
              <ListIcon type="secondary" />
            )}
            <p
              className={`navigation__button-text text text_type_main-default ml-2${
                pathname === '/order' ? ' navigation__button-text_active' : ''
              }`}
            >
              Лента заказов
            </p>
          </Link>
        </div>
        <Link
          to="/profile"
          className="navigation__button navigation__button_form_oval mt-6 pt-4 pb-4 pl-5 pr-5"
          onClick={onClose}
        >
          {pathname === '/profile' ? (
            <ProfileIcon type="primary" />
          ) : (
            <ProfileIcon type="secondary" />
          )}
          <p
            className={`navigation__button-text text text_type_main-default ml-2${
              pathname === '/profile' ? ' navigation__button-text_active' : ''
            }`}
          >
            Личный кабинет
          </p>
        </Link>
      </nav>
    </>
  );
}

export default NavigationMenu;
