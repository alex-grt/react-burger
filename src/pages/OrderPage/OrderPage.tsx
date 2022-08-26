import orderPage from './OrderPage.module.css';
import { FC } from 'react';
import OrderInfo from '../../components/OrderInfo/OrderInfo';

const OrderPage: FC = () => {
  return (
    <main className={orderPage.orderPage}>
      <OrderInfo type="page" />
    </main>
  );
}

export default OrderPage;
