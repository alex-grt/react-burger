import ingredient from './Ingredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { CHANGE_BURGER, OPEN_SELECTED_INGREDIENT } from '../../services/actions';
import { dataStructure } from '../../utils/types';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  Counter,
  CurrencyIcon,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient({ data }) {
  const dispatch = useDispatch();
  const { burger } = useSelector(store => store.burger);
  const count = burger.filter(item => item._id === data._id).length;
  const date = new Date();
  const timestamp = date.getTime();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: data
  });

  function handleBurger() {
    if (data.type !== 'bun') {
      dispatch({
        type: CHANGE_BURGER,
        burger: [...burger, {...data, timeId: timestamp}]
      });
    } else {
      dispatch({
        type: CHANGE_BURGER,
        burger: [
          ...burger.filter(item => item.type === 'bun' ? null : item),
          {...data, timeId: timestamp}
        ]
      });
    }
  }

  function handleClick() {
    dispatch({
      type: OPEN_SELECTED_INGREDIENT,
      selectedIngredient: data
    })
  }

  return (
    <li
      className={ingredient.ingredient}
      ref={dragRef}
      onClick={() => {
        handleBurger();
        handleClick();
      }}
    >
      {count !== 0 && (
        <Counter
          count={data.type === 'bun' ? 2 * count : count}
          size="default"
        />
      )}
      <img
        className={`${ingredient.ingredient__image} ml-4 mr-4`}
        src={data.image}
        alt={data.name}
      />
      <div className={`${ingredient.ingredient__cover} mt-1 mb-1`}>
        <p className={`${ingredient.ingredient__price} text text_type_digits-default pr-2`}>
          {data.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={`${ingredient.ingredient__title} text text_type_main-default`}>
        {data.name}
      </h4>
    </li>
  );
}

Ingredient.propTypes = {
  data: PropTypes.shape(dataStructure).isRequired
}

export default Ingredient;
