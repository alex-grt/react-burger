import ingredientsTabs from './IngredientsTabs.module.css';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SET_CURRENT_TAB } from '../../services/actions';
import { TSTab } from '../TSTab/TSTab';

const IngredientsTabs: FC = () => {
  const dispatch = useAppDispatch();
  const { currentTab }: { currentTab: string } = useAppSelector(
    store => store.ingredients
  );

  function switchTab(current: string) {
    const element: HTMLLIElement | null = document.querySelector(`#${current}`);

    element?.scrollIntoView();
    dispatch({ type: SET_CURRENT_TAB,
      currentTab: current
    });
  };

  return (
    <ul className={ingredientsTabs.ingredientsTabs}>
      <li className={ingredientsTabs.ingredientsTabs__tab}>
        <TSTab value="bun" active={currentTab === 'bun'} onClick={switchTab}>
          Булки
        </TSTab>
      </li>
      <li className={ingredientsTabs.ingredientsTabs__tab}>
        <TSTab value="sauce" active={currentTab === 'sauce'} onClick={switchTab}>
          Соусы
        </TSTab>
      </li>
      <li className={ingredientsTabs.ingredientsTabs__tab}>
        <TSTab value="main" active={currentTab === 'main'} onClick={switchTab}>
          Начинки
        </TSTab>
      </li>
    </ul>
  );
}

export default IngredientsTabs;
