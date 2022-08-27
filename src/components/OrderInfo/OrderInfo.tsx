import orderInfo from './OrderInfo.module.css';
import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { IData, IWSOrder } from '../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { calculateSum } from '../../utils/calculateSum';
import { getDate } from '../../utils/getDate';

interface IOrderInfoProps {
  type: string;
}

interface IParams {
  id?: string;
}

const OrderInfo: FC<IOrderInfoProps> = ({ type }) => {
  const { pathname } = useLocation();
  const { id } = useParams<IParams>();
  const { ingredients } = useAppSelector(store => store.ingredients);
  const { data } = useAppSelector(store => store.wsOrders);
  const { data: userOrdersData } = useAppSelector(store => store.wsUserOrders);
  const ordersInfo = data && JSON.parse(data);
  const userOrdersInfo = userOrdersData && JSON.parse(userOrdersData);
  const orders = pathname.startsWith('/profile')
    ? userOrdersInfo.orders
    : ordersInfo.orders;
  const selectedOrder = orders?.find((item: IWSOrder) => item._id === id)!;
  const ingredientList = [...new Set(selectedOrder?.ingredients)];
  const orderContent = selectedOrder?.ingredients.reduce((arr: IData[], id: string) =>
    (arr.concat(ingredients?.filter(item => item._id === id))), []
  );
  const groupedOrderContent = ingredientList?.reduce((arr: Array<IData[]>, id) =>
    [...arr, orderContent?.filter((item: IData) => item._id === id)], []
  );

  return (
    <div className={orderInfo.orderInfo}>
      <p className={`${orderInfo.orderInfo__number} ${
          type === 'page' ? orderInfo.orderInfo__number_theme_page : ''
        } text text_type_digits-default mb-10`}>
        #{selectedOrder?.number}
      </p>
      <h4 className={`${orderInfo.orderInfo__title} text text_type_main-medium mb-3`}>
        {selectedOrder?.name}
      </h4>
      <p className={`${orderInfo.orderInfo__status} ${
          selectedOrder?.status === 'done'
            ? orderInfo.orderInfo__status_theme_finished
            : selectedOrder?.status === 'created' || 'pending'
            ? ''
            : orderInfo.orderInfo__status_theme_canceled
        } text text_type_main-default mb-15`}
      >
        {selectedOrder?.status === 'done'
          ? 'Выполнен'
          : selectedOrder?.status === 'created'
          ? 'Создан'
          : selectedOrder?.status === 'pending'
          ? 'Готовится'
          : 'Отменён'}
      </p>
      <p className={`${orderInfo.orderInfo__listTitle} text text_type_main-medium mb-6`}>
        Состав:
      </p>
      <ul className={`${orderInfo.orderInfo__list}`}>
        {groupedOrderContent?.map((item) => (
          <li
            key={item[0]._id}
            className={orderInfo.orderInfo__item}
          >
            <div className={orderInfo.orderInfo__itemCover}>
              <div
                className={`${orderInfo.orderInfo__icon}`}
                style={{
                  backgroundImage: `url(${item[0]?.image_mobile})`
                }}
              />
              <h5
                className={`${
                  orderInfo.orderInfo__itemTitle
                } text text_type_main-default`}
              >
                {item[0]?.name}
              </h5>
            </div>
            <div className={`${orderInfo.orderInfo__priceCover}`}>
              <p className={`${orderInfo.orderInfo__price} text text_type_digits-default mr-2`}>
                {item[0]?.type === 'bun' ? 2 : item?.length} x {item[0]?.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${orderInfo.orderInfo__infoCover}`}>
        <p className={`${orderInfo.orderInfo__date} text text_type_main-default`}>
          {getDate(selectedOrder?.createdAt)}
        </p>
        <div className={`${orderInfo.orderInfo__priceCover} ml-2`}>
          <p className={`${orderInfo.orderInfo__price} text text_type_digits-default mr-2`}>
            {calculateSum(orderContent)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;
