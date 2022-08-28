import ordersStyles from './Orders.module.css';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { refreshToken } from '../../utils/apiWithRefresh';
import { getCookie } from '../../utils/cookieMethods';
import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_STOP
} from '../../services/actions/wsActions';
import { IWSOrder } from '../../utils/types';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import OrderCard from '../../components/OrderCard/OrderCard';

const Orders: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(store => store.wsUserOrders);
  const ordersInfo = data && JSON.parse(data);
  const orders = ordersInfo.orders;

  useEffect(() => {
    const accessToken = getCookie('accessToken');

    if (!accessToken || data.includes('Invalid or missing token')) {
      refreshToken()
        .then(() => {
          dispatch({ type: WS_AUTH_CONNECTION_START });
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    } else {
      dispatch({ type: WS_AUTH_CONNECTION_START });
    }

    return () => {
      dispatch({ type: WS_AUTH_CONNECTION_STOP })
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
