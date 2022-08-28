import orderPage from './OrderPage.module.css';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCookie } from '../../utils/cookieMethods';
import { refreshToken } from '../../utils/apiWithRefresh';
import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_STOP,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP
} from '../../services/actions/wsActions';
import OrderInfo from '../../components/OrderInfo/OrderInfo';

const OrderPage: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(store => store.wsUserOrders);
  const { pathname } = useLocation();

  function connectWithTokenCheck() {
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
  }

  useEffect(() => {
    pathname.startsWith('/profile')
      ? connectWithTokenCheck()
      : dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({
        type: pathname.startsWith('/profile')
          ? WS_AUTH_CONNECTION_STOP
          : WS_CONNECTION_STOP
      })
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={orderPage.orderPage}>
      <OrderInfo type="page" />
    </main>
  );
}

export default OrderPage;
