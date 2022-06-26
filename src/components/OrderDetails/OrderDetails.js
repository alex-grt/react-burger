import './OrderDetails.css';
import successfully from '../../images/successfully.svg';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails({ data }) {
  return (
    <div className="order pt-20 pb-20">
      <h2 className="order__number text text_type_digits-large">
        {data}
      </h2>
      <p className="order__subtitle mt-8 mb-15 text text_type_main-medium">
        идентификатор заказа
      </p>
      <img
        className="order__image"
        src={successfully}
        alt="успешно"
      />
      <p className="order__text mt-15 mb-2 text text_type_main-default">
        Ваш заказ начали готовить
      </p>
      <p className="order__text order__text_theme_dark text text_type_main-default">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  data: PropTypes.string.isRequired
}

export default OrderDetails;
