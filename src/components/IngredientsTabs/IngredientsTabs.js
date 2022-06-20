import './IngredientsTabs.css';
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsTabs() {
  const [current, setCurrent] = React.useState('bun');

  return (
    <ul className="ingredients-tabs">
      <li className="ingredients-tabs__tab">
        <a className="ingredients-tabs__link" href="#bun">
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
      </li>
      <li className="ingredients-tabs__tab">
        <a className="ingredients-tabs__link" href="#sauce">
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
      </li>
      <li className="ingredients-tabs__tab">
        <a className="ingredients-tabs__link" href="#main">
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </li>
    </ul>
  );
}

export default IngredientsTabs;
