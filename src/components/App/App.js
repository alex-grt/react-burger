import app from './App.module.css';
import { URL_API } from '../../utils/constants';
import React from 'react';
import { useQueryExecution } from '../../hooks/useQueryExecution';
import AppHeader from '../AppHeader/AppHeader';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import Constructor from '../Constructor/Constructor';

function App() {
  const { executeGet } = useQueryExecution(URL_API);
  const [data, setData] = React.useState([]);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    executeGet()
      .then(res => setData(res.data))
      .catch(err => alert(`Ошибка: ${err}`));
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
      <Constructor data={data} />
    </div>
  );
}

export default App;
