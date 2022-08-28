import statistics from './Statistics.module.css';
import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { IWSOrder } from '../../utils/types';

const Statistics: FC = () => {
  const { data } = useAppSelector(store => store.wsOrders);
  const ordersInfo = data && JSON.parse(data);
  const completed = ordersInfo?.orders?.filter(
    (item: IWSOrder) => item.status === 'done'
  );
  const inWork = ordersInfo?.orders?.filter(
    (item: IWSOrder) => item.status !== 'done'
  );

  return (
    <section
      className={`${statistics.statistics} pt-25 pb-10`}
      aria-label="статистика заказов"
    >
      <div className={`${statistics.statistics__cover}`}>
      <div className={`${statistics.statistics__coverOrders}`}>
        <div className={`${statistics.statistics__column}`}>
          <p
            className={`${
              statistics.statistics__cellName
            } text text_type_main-medium pb-6`}
          >
            Готовы:
          </p>
          <ul className={`${statistics.statistics__orders}`}>
            {completed?.map((item: IWSOrder) => (
                <li
                  className={`${
                    statistics.statistics__order
                  } ${
                    statistics.statistics__order_status_completed
                  } text text_type_digits-default`}
                  key={item._id}
                >
                  {item.number}
                </li>
            ))}
          </ul>
        </div>
        <div className={`${statistics.statistics__column}`}>
          <p
            className={`${
              statistics.statistics__cellName
            } text text_type_main-medium pb-6`}
          >
            В работе:
          </p>
          <ul className={`${statistics.statistics__orders}`}>
            {inWork?.map((item: IWSOrder) => (
                <li
                  className={`${
                    statistics.statistics__order
                  } text text_type_digits-default`}
                  key={item._id}
                >
                  {item.number}
                </li>
            ))}
          </ul>
        </div>
      </div>
      <p
        className={`${
          statistics.statistics__cellName
        } text text_type_main-medium mt-15`}
      >
        Выполнено за все время:
      </p>
      <p
        className={`${
          statistics.statistics__digits
        } text text_type_digits-large`}
      >
        {ordersInfo?.total}
      </p>
      <p
        className={`${
          statistics.statistics__cellName
        } text text_type_main-medium mt-15`}
      >
        Выполнено за сегодня:
      </p>
      <p
        className={`${
          statistics.statistics__digits
        } text text_type_digits-large`}
      >
        {ordersInfo?.totalToday}
      </p>
      </div>
    </section>
  );
}

export default Statistics;
