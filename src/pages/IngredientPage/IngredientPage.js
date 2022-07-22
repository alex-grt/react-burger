import ingredientPage from './IngredientPage.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientPage() {
  const { id } = useParams();
  const { ingredients } = useSelector(store => store.ingredients);
  const selectedIngredient = ingredients?.filter(item => item._id === id)[0];

  return (
    <section className={ingredientPage.ingredientPage}>
      <div className={ingredientPage.ingredientPage__cover}>
        <div className={ingredientPage.ingredientPage__coverTitle}>
          <h2
            className={`${
              ingredientPage.ingredientPage__title
            } text text_type_main-large`}
          >
            Детали ингредиента
          </h2>
        </div>
        <img
          className={ingredientPage.ingredientPage__image}
          src={selectedIngredient?.image_large}
          alt={selectedIngredient?.name}
        />
        <h4
          className={`${
            ingredientPage.ingredientPage__ingredientName
          } mt-4 mb-8 text text_type_main-medium`}
        >
          {selectedIngredient?.name}
        </h4>
        <ul className={`${ingredientPage.ingredientPage__list} mb-5`}>
          <li className={ingredientPage.ingredientPage__item}>
            <p
              className={`${
                ingredientPage.ingredientPage__itemTitle
              } mb-2 text text_type_main-default`}
            >
              Калории, ккал
            </p>
            <p
              className={`${
                ingredientPage.ingredientPage__itemValue
              } text text_type_digits-default`}
            >
              {selectedIngredient?.calories}
            </p>
          </li>
          <li className={ingredientPage.ingredientPage__item}>
            <p
              className={`${
                ingredientPage.ingredientPage__itemTitle
              } mb-2 text text_type_main-default`}
            >
              Белки, г
            </p>
            <p
              className={`${
                ingredientPage.ingredientPage__itemValue
              } text text_type_digits-default`}
            >
              {selectedIngredient?.proteins}
            </p>
          </li>
          <li className={ingredientPage.ingredientPage__item}>
            <p
              className={`${
                ingredientPage.ingredientPage__itemTitle
              } mb-2 text text_type_main-default`}
            >
              Жиры, г
            </p>
            <p
              className={`${
                ingredientPage.ingredientPage__itemValue
              } text text_type_digits-default`}
            >
              {selectedIngredient?.fat}
            </p>
          </li>
          <li className={ingredientPage.ingredientPage__item}>
            <p
              className={`${
                ingredientPage.ingredientPage__itemTitle
              } mb-2 text text_type_main-default`}
            >
              Углеводы, г
            </p>
            <p
              className={`${
                ingredientPage.ingredientPage__itemValue
              } text text_type_digits-default`}
            >
              {selectedIngredient?.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default IngredientPage;
