import orderCard from './OrderCard.module.css';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { IData } from '../../utils/types';
import {
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getDate } from '../../utils/getDate';
import { calculateSum } from '../../utils/calculateSum';

interface IOrderCardProps {
  data: {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  };
  type: string;
}

const OrderCard: FC<IOrderCardProps> = ({ data, type }) => {
  const location = useLocation();
  const { ingredients }: { ingredients: IData[] } = useAppSelector(
    store => store.ingredients
  );
  const ingredientList = ingredients?.filter(item =>
    data?.ingredients.includes(item._id)
  );
  const orderContent = data?.ingredients.reduce((arr: IData[], id: string) =>
    (arr.concat(ingredients?.filter(item => item._id === id))), []
  );

  return (
    <Link
      to={{
        pathname:
          type === 'profile'
            ? `/profile/orders/${data._id}`
            : `/feed/${data._id}`,
        state: { background: location }
      }}
      className={orderCard.cardLink}
    >
      <li className={`${orderCard.card}`}>
        <div className={`${orderCard.card__numberCover}`}>
          <p className={`${orderCard.card__number} text text_type_digits-default`}>
            #{data?.number}
          </p>
          <p className={`${orderCard.card__date} text text_type_main-default`}>
            {getDate(data.createdAt)}
          </p>
        </div>
        <h4 className={`${orderCard.card__title} text text_type_main-medium mt-6`}>
          {data?.name}
        </h4>
        {type === 'profile' ? (
          <p className={`${orderCard.card__status} ${
              data?.status === 'done'
                ? orderCard.card__status_theme_finished
                : data?.status === 'created' || 'pending'
                ? ''
                : orderCard.card__status_theme_canceled
            } text text_type_main-default mt-2`}
          >
            {data?.status === 'done'
              ? 'Выполнен'
              : data?.status === 'created'
              ? 'Создан'
              : data?.status === 'pending'
              ? 'Готовится'
              : 'Отменён'}
          </p>
        ) : null}
        <div className={`${orderCard.card__cover} mt-6`}>
          <ul className={`${orderCard.card__listCover}`}>
            {ingredientList?.slice(0, 6).map((item, index) => (
              <li
                key={item._id}
                className={`${orderCard.card__icon}`}
                style={{
                  zIndex: 6 - index,
                  backgroundImage: `url(${item.image_mobile})`
                }}
              >
                {ingredientList?.length > 6 && index === 5 ? (
                  <div className={`${orderCard.card__iconOverlay}`}>
                    <p
                      className={`${orderCard.card__iconText} text text_type_main-default`}
                    >
                      +{ingredientList?.length - 5}
                    </p>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
          <div className={`${orderCard.card__priceCover} ml-6`}>
            <p className={`${orderCard.card__price} text text_type_digits-default mr-2`}>
              {calculateSum(orderContent)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  );
}

export default OrderCard;
