import app from './App.module.css';
import { FC, useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getIngredients, LOGGED_IN } from '../../services/actions';
import { TDispatch } from '../../utils/types';
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
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const App: FC = () => {
  const dispatch = useDispatch<TDispatch>();
  const location: any = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');

    refreshToken && dispatch({ type: LOGGED_IN });
    dispatch(getIngredients());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <></>
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <></>
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
        </Route>
        <Route>
          <Error name="404" text="Страница не найдена" />
        </Route>
      </Switch>
      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal isOpen={background} onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      <Preloader />
    </div>
  );
}

export default App;
