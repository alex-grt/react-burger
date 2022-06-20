import './Constructor.css';
import React from 'react';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function Constructor({ data }) {
  const [counter, setCounter] = React.useState([]);

  return (
    <main className="constructor">
      <BurgerIngredients data={data} counter={counter} setCounter={setCounter} />
      <BurgerConstructor counter={counter} setCounter={setCounter} />
    </main>
  );
}

export default Constructor;
