import navigationMenu from './NavigationMenu.module.css';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CurrencyIcon,
  CloseIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from '@ya.praktikum/react-developer-burger-ui-components';

interface INavigationMenuProps {
  menuOpen: boolean;
  onClose: () => void;
}

const NavigationMenu: FC<INavigationMenuProps> = ({ menuOpen, onClose }) => {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`${navigationMenu.navigationOverlay} ${
          menuOpen ? navigationMenu.navigationOverlay_opened : ''
          }`}
          onClick={onClose}
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
            to="/feed"
            className={`${
              navigationMenu.navigation__button
            } ${
              navigationMenu.navigation__button_form_oval
            } pt-4 pb-4 pl-5 pr-5`}
            onClick={onClose}
          >
            {pathname.startsWith('/feed') ? (
              <ListIcon type="primary" />
            ) : (
              <ListIcon type="secondary" />
            )}
            <p
              className={`${
                navigationMenu.navigation__buttonText
              } text text_type_main-default ml-2 ${
                pathname.startsWith('/feed')
                  ? navigationMenu.navigation__buttonText_active
                  : ''
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

export default NavigationMenu;
