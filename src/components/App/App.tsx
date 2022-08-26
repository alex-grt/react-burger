import app from './App.module.css';
import { FC, useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIngredients, LOGGED_IN } from '../../services/actions';
import { switchModal } from '../../utils/switchModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AppHeader from '../AppHeader/AppHeader';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import Constructor from '../../pages/Constructor/Constructor';
import Preloader from '../Preloader/Preloader';
import Error from '../../pages/Error/Error';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import RestorePassword from '../../pages/RestorePassword/RestorePassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import Feed from '../../pages/Feed/Feed';
import OrderPage from '../../pages/OrderPage/OrderPage';
import Orders from '../../pages/Orders/Orders';
import {
  WS_AUTH_CONNECTION_START,
  WS_CONNECTION_START
} from '../../services/actions/wsActions';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { loggedIn }: { loggedIn: boolean } = useAppSelector(store => store.loggedIn);
  const location: any = useLocation();
  const history = useHistory();
  const background = location?.state?.background;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!loggedIn && refreshToken) {
      dispatch({ type: LOGGED_IN });
    }

    dispatch(getIngredients());
    dispatch({ type: WS_CONNECTION_START });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      dispatch({ type: WS_AUTH_CONNECTION_START });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function handleMenuClick() {
    setMenuOpen(true);
  };

  function closeAllPopups() {
    setMenuOpen(false);
  };

  function handleModalClose() {
    localStorage.removeItem('ingredient');
    history.goBack();
  }

  return (
    <div className={app.app}>
      <AppHeader menuClick={handleMenuClick} />
      <NavigationMenu menuOpen={menuOpen} onClose={closeAllPopups} />
      <Switch location={background || location}>
        <Route path="/" exact>
          <Constructor />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgot-password">
          <RestorePassword />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <Orders />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderPage />
        </ProtectedRoute>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderPage />
        </Route>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
        </Route>
        <Route>
          <Error name="404" text="Страница не найдена" />
        </Route>
      </Switch>
      {switchModal(background?.pathname, handleModalClose)}
      <Preloader />
    </div>
  );
}

export default App;
