import ordersStyles from './Orders.module.css';
import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { IWSOrder } from '../../utils/types';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import OrderCard from '../../components/OrderCard/OrderCard';

const Orders: FC = () => {
  const { data } = useAppSelector(store => store.wsUserOrders);
  const ordersInfo = data && JSON.parse(data);
  const orders = ordersInfo.orders;

  return (
    <main className={`${ordersStyles.orders}`}>
      <ProfileMenu />
      <ul className={`${ordersStyles.orders__list}`}>
        {orders
          // eslint-disable-next-line array-callback-return
          ?.sort((a: IWSOrder, b: IWSOrder) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt === b.createdAt) return 0;
            if (a.createdAt > b.createdAt) return -1;
          })
          .map((item: IWSOrder) => (
            <OrderCard key={item._id} data={item} type="profile" />
          ))}
      </ul>
    </main>
  );
}

export default Orders;
