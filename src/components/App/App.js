import app from './App.module.css';
import { URL_API } from '../../utils/constants';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS
} from '../../services/actions';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useQueryExecution } from '../../hooks/useQueryExecution';
import AppHeader from '../AppHeader/AppHeader';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import Constructor from '../Constructor/Constructor';

function App() {
  const dispatch = useDispatch();
  const { executeGet } = useQueryExecution(URL_API);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    executeGet()
      .then(res => dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data
      }))
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  }, []);

  function handleMenuClick() {
    setMenuOpen(true);
  };

  function closeAllPopups() {
    setMenuOpen(false);
  };

  return (
    <div className={app.app}>
      <AppHeader menuClick={handleMenuClick} />
      <NavigationMenu menuOpen={menuOpen} onClose={closeAllPopups} />
      <Constructor />
    </div>
  );
}

export default App;
