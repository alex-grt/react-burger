import constructor from './Constructor.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { dataStructure } from '../../utils/types';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function Constructor({ data }) {
  const [counter, setCounter] = React.useState([]);

  return (
    <main className={constructor.constructor}>
      <BurgerIngredients data={data} counter={counter} setCounter={setCounter} />
      <BurgerConstructor counter={counter} setCounter={setCounter} />
    </main>
  );
}

Constructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataStructure)).isRequired
}

export default Constructor;
