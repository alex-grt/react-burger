import orderDetails from'./OrderDetails.module.css';
import successfully from '../../images/successfully.svg';
import { FC } from 'react';
import { useAppSelector } from '../../hooks';

const OrderDetails: FC = () => {
  const order = useAppSelector(store => store.order.order);

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
