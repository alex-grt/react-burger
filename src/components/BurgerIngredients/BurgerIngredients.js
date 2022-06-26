import './BurgerIngredients.css';
import React from 'react';
import { dataStructure } from '../../utils/types';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsTabs from '../IngredientsTabs/IngredientsTabs';
import Category from '../Category/Category';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function BurgerIngredients({ data, ...props }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);

  function handleClick(data) {
    setSelectedIngredient(data);
    setIsOpen(true);
  }

  function handleClose() {
    setSelectedIngredient(null);
    setIsOpen(false);
  }

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
          onClick={handleClick}
          {...props}
        />
        <Category
          id="sauce"
          title="Соусы"
          data={data.filter(item => item.type === 'sauce')}
          onClick={handleClick}
          {...props}
        />
        <Category
          id="main"
          title="Начинки"
          data={data.filter(item => item.type === 'main')}
          onClick={handleClick}
          {...props}
        />
      </ul>
      <ModalOverlay
        isOpen={isOpen}
        onClose={handleClose}
      >
        <IngredientDetails data={selectedIngredient} />
      </ModalOverlay>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(dataStructure)).isRequired
}

export default BurgerIngredients;
