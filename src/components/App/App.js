import './App.css';
import { data } from '../../utils/data';
import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import Constructor from '../Constructor/Constructor';

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  function handleMenuClick() {
    setMenuOpen(true);
  }

  function closeAllPopups() {
    setMenuOpen(false);
  }

  return (
    <div className="App">
      <AppHeader menuClick={handleMenuClick} />
      <NavigationMenu menuOpen={menuOpen} onClose={closeAllPopups} />
      <Constructor data={data} />
    </div>
  );
}

export default App;
