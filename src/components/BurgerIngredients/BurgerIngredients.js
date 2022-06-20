import './BurgerIngredients.css';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsTabs from '../IngredientsTabs/IngredientsTabs';
import Category from '../Category/Category';

function BurgerIngredients({ data, ...props }) {
  return (
    <section className="ingredients">
      <h2 className="ingredients__title mt-10 mb-5 text text_type_main-large">
        Соберите бургер
      </h2>
      <IngredientsTabs />
      <ul className="ingredients__categories mt-10">
        <Category
          id="bun"
          title="Булки"
          data={data.filter(item => item.type === 'bun')}
          {...props}
        />
        <Category
          id="sauce"
          title="Соусы"
          data={data.filter(item => item.type === 'sauce')}
          {...props}
        />
        <Category
          id="main"
          title="Начинки"
          data={data.filter(item => item.type === 'main')}
          {...props}
        />
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  })).isRequired
}

export default BurgerIngredients;
