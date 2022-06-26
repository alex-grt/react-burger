import './Ingredient.css';
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

function Ingredient({ data, onClick, counter, setCounter }) {
  const count = counter.filter(item => item._id === data._id).length;
  const date = new Date();
  const timestamp = date.getTime();

  function handleCounter() {
    if (data.type !== 'bun') {
      setCounter([...counter, {...data, timeId: timestamp}]);
    } else {
      setCounter(state =>
        state.filter(item => item.type === 'bun' ? null : item)
      );
      setCounter(state => [...state, {...data, timeId: timestamp}]);
    }
  }

  return (
    <li
      className="ingredient"
      onClick={() => {
        handleCounter();
        onClick(data);
      }}
    >
      {count !== 0 && (
        <Counter
          count={data.type === 'bun' ? 2 * count : count}
          size="default"
        />
      )}
      <img
        className="ingredient__image ml-4 mr-4"
        src={data.image}
        alt={data.name}
      />
      <div className="ingredient__cover mt-1 mb-1">
        <p className="ingredient__price text text_type_digits-default pr-2">
          {data.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className="ingredient__title text text_type_main-default">
        {data.name}
      </h4>
    </li>
  );
}

Ingredient.propTypes = {
  data: PropTypes.shape(dataStructure).isRequired,
  onClick: PropTypes.func.isRequired,
  counter: PropTypes.arrayOf(PropTypes.shape({
    ...dataStructure,
    timeId: PropTypes.number.isRequired
  })).isRequired,
  setCounter: PropTypes.func.isRequired
}

export default Ingredient;
