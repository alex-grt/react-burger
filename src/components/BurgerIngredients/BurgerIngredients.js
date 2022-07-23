import burgerIngredients from './BurgerIngredients.module.css';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_TAB } from '../../services/actions';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsTabs from '../IngredientsTabs/IngredientsTabs';
import Category from '../Category/Category';

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredients);
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  function handleScroll() {
    if (containerRef && bunRef && sauceRef && mainRef) {
      const bunDistance = Math.abs(
        containerRef?.current?.getBoundingClientRect()?.top -
          bunRef?.current?.getBoundingClientRect()?.top
      );
      const sauceDistance = Math.abs(
        containerRef?.current?.getBoundingClientRect()?.top -
          sauceRef?.current?.getBoundingClientRect()?.top
      );
      const mainDistance = Math.abs(
        containerRef?.current?.getBoundingClientRect()?.top -
          mainRef?.current?.getBoundingClientRect()?.top
      );
      const min = Math.min(bunDistance, sauceDistance, mainDistance);

      dispatch({
        type: SET_CURRENT_TAB,
        currentTab:
          min === bunDistance ? 'bun' : min === sauceDistance ? 'sauce' : 'main'
      });
    }
  }

  return (
    <section className={burgerIngredients.ingredients}>
      <h2
        className={`${
          burgerIngredients.ingredients__title
        } mt-10 mb-5 text text_type_main-large`}>
        Соберите бургер
      </h2>
      <IngredientsTabs />
      <ul
        className={`${burgerIngredients.ingredients__categories} mt-10`}
        ref={containerRef}
        onScroll={handleScroll}
      >
        <Category
          id="bun"
          ref={bunRef}
          title="Булки"
          data={ingredients.filter(item => item.type === 'bun')}
        />
        <Category
          id="sauce"
          ref={sauceRef}
          title="Соусы"
          data={ingredients.filter(item => item.type === 'sauce')}
        />
        <Category
          id="main"
          ref={mainRef}
          title="Начинки"
          data={ingredients.filter(item => item.type === 'main')}
        />
      </ul>
    </section>
  );
}

export default BurgerIngredients;
