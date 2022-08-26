import burgerIngredients from './BurgerIngredients.module.css';
import { FC, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IData } from '../../utils/types';
import { SET_CURRENT_TAB } from '../../services/actions';
import IngredientsTabs from '../IngredientsTabs/IngredientsTabs';
import Category from '../Category/Category';

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const { ingredients }: { ingredients: IData[] } = useAppSelector(
    store => store.ingredients
  );
  const containerRef = useRef<HTMLUListElement>(null);
  const bunRef = useRef<HTMLLIElement>(null);
  const sauceRef = useRef<HTMLLIElement>(null);
  const mainRef = useRef<HTMLLIElement>(null);

  function handleScroll() {
    if (
      containerRef.current &&
      bunRef.current &&
      sauceRef.current &&
      mainRef.current
    ) {
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
  };

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
