import ingredientsTabs from './IngredientsTabs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_TAB } from '../../services/actions';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsTabs() {
  const dispatch = useDispatch();
  const { currentTab } = useSelector(store => store.ingredients);

  function switchTab(current) {
    const element = document.querySelector(`#${current}`);

    element.scrollIntoView();
    dispatch({ type: SET_CURRENT_TAB,
      currentTab: current
    });
  }

  return (
    <ul className={ingredientsTabs.ingredientsTabs}>
      <li className={ingredientsTabs.ingredientsTabs__tab}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={switchTab}>
          Булки
        </Tab>
      </li>
      <li className={ingredientsTabs.ingredientsTabs__tab}>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={switchTab}>
          Соусы
        </Tab>
      </li>
      <li className={ingredientsTabs.ingredientsTabs__tab}>
        <Tab value="main" active={currentTab === 'main'} onClick={switchTab}>
          Начинки
        </Tab>
      </li>
    </ul>
  );
}

export default IngredientsTabs;
