import app from './App.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions';
import AppHeader from '../AppHeader/AppHeader';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import Constructor from '../Constructor/Constructor';

function App() {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(getIngredients());
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
