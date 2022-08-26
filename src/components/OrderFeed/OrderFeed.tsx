import orderFeed from './OrderFeed.module.css';
import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { IWSOrder } from '../../utils/types';
import OrderCard from '../OrderCard/OrderCard';

const OrderFeed: FC = () => {
  const { data } = useAppSelector(store => store.wsOrders);
  const ordersInfo = data && JSON.parse(data);
  const orders = ordersInfo.orders;

  return (
    <section className={`${orderFeed.feed}`}>
      <h2
        className={`${
          orderFeed.feed__title
        } mt-10 mb-5 text text_type_main-large`}>
        Лента заказов
      </h2>
      <ul className={`${orderFeed.feed__list}`}>
        {orders?.map((item: IWSOrder) => (
          <OrderCard key={item._id} data={item} type="feed" />
        ))}
      </ul>
    </section>
  );
}

export default OrderFeed;
