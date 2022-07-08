import orderDetails from'./OrderDetails.module.css';
import successfully from '../../images/successfully.svg';
import { useSelector } from 'react-redux';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails() {
  const { order } = useSelector(store => store.order);

  return (
    <div className={`${orderDetails.order} pt-20 pb-20`}>
      <h2 className={`${orderDetails.order__number} text text_type_digits-large`}>
        {order.number}
      </h2>
      <p className={`${orderDetails.order__subtitle} mt-8 mb-15 text text_type_main-medium`}>
        идентификатор заказа
      </p>
      <img
        className={orderDetails.order__image}
        src={successfully}
        alt="успешно"
      />
      <p className={`${orderDetails.order__text} mt-15 mb-2 text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${
          orderDetails.order__text
        } ${
          orderDetails.order__text_theme_dark
        } text text_type_main-default`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
