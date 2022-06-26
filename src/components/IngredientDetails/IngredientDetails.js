import './IngredientDetails.css';
import { dataStructure } from '../../utils/types';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientDetails({ data }) {
  return (
    <div className="details">
      <div className="details__cover">
        <h2 className="details__title text text_type_main-large">
          Детали ингредиента
        </h2>
      </div>
      <img
        className="details__image"
        src={data?.image_large}
        alt={data?.name}
      />
      <h4 className="details__ingredient-name mt-4 mb-8 text text_type_main-medium">
        {data?.name}
      </h4>
      <ul className="details__list mb-5">
        <li className="details__item">
          <p className="details__item-title mb-2 text text_type_main-default">
            Калории, ккал
          </p>
          <p className="details__item-value text text_type_digits-default">
            {data?.calories}
          </p>
        </li>
        <li className="details__item">
          <p className="details__item-title mb-2 text text_type_main-default">
            Белки, г
          </p>
          <p className="details__item-value text text_type_digits-default">
            {data?.proteins}
          </p>
        </li>
        <li className="details__item">
          <p className="details__item-title mb-2 text text_type_main-default">
            Жиры, г
          </p>
          <p className="details__item-value text text_type_digits-default">
            {data?.fat}
          </p>
        </li>
        <li className="details__item">
          <p className="details__item-title mb-2 text text_type_main-default">
            Углеводы, г
          </p>
          <p className="details__item-value text text_type_digits-default">
            {data?.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape(dataStructure).isRequired,
    PropTypes.object.isRequired
  ])
}

export default IngredientDetails;
