import ingredientDetails from './IngredientDetails.module.css';
import { FC } from 'react';
import { IData } from '../../utils/types';

const IngredientDetails: FC = () => {
  const selectedIngredient: IData = JSON.parse(localStorage.getItem('ingredient') || '');

  return (
    <div className={ingredientDetails.details}>
      <div className={ingredientDetails.details__cover}>
        <h2 className={`${ingredientDetails.details__title} text text_type_main-large`}>
          Детали ингредиента
        </h2>
      </div>
      <img
        className={ingredientDetails.details__image}
        src={selectedIngredient?.image_large}
        alt={selectedIngredient?.name}
      />
      <h4
        className={`${
          ingredientDetails.details__ingredientName
        } mt-4 mb-8 text text_type_main-medium`}
      >
        {selectedIngredient?.name}
      </h4>
      <ul className={`${ingredientDetails.details__list} mb-5`}>
        <li className={ingredientDetails.details__item}>
          <p
            className={`${
              ingredientDetails.details__itemTitle
            } mb-2 text text_type_main-default`}
          >
            Калории, ккал
          </p>
          <p
            className={`${
              ingredientDetails.details__itemValue
            } text text_type_digits-default`}
          >
            {selectedIngredient?.calories}
          </p>
        </li>
        <li className={ingredientDetails.details__item}>
          <p
            className={`${
              ingredientDetails.details__itemTitle
            } mb-2 text text_type_main-default`}
          >
            Белки, г
          </p>
          <p
            className={`${
              ingredientDetails.details__itemValue
            } text text_type_digits-default`}
          >
            {selectedIngredient?.proteins}
          </p>
        </li>
        <li className={ingredientDetails.details__item}>
          <p
            className={`${
              ingredientDetails.details__itemTitle
            } mb-2 text text_type_main-default`}
          >
            Жиры, г
          </p>
          <p
            className={`${
              ingredientDetails.details__itemValue
            } text text_type_digits-default`}
          >
            {selectedIngredient?.fat}
          </p>
        </li>
        <li className={ingredientDetails.details__item}>
          <p
            className={`${
              ingredientDetails.details__itemTitle
            } mb-2 text text_type_main-default`}
          >
            Углеводы, г
          </p>
          <p
            className={`${
              ingredientDetails.details__itemValue
            } text text_type_digits-default`}
          >
            {selectedIngredient?.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
