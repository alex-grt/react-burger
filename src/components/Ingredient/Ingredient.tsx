import ingredient from './Ingredient.module.css';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { useDrag } from 'react-dnd';
import { IData } from '../../utils/types';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient: FC<{ data: IData }> = ({ data }) => {
  const location = useLocation();
  const id = data._id;
  const { burger } = useAppSelector(store => store.burger);
  const count: number = burger.filter(item => item._id === data._id).length;
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: data
  });

  function handleClick() {
    localStorage.setItem('ingredient', JSON.stringify(data));
  }

  return (
    <Link
      key={id}
      to={{
        pathname: `/ingredients/${id}`,
        state: { background: location }
      }}
      className={ingredient.link}
      ref={dragRef}
    >
      <li
        className={ingredient.ingredient}
        onClick={handleClick}
      >
        {count !== 0 && (
          <Counter
            count={data.type === 'bun' ? 2 * count : count}
            size="default"
          />
        )}
        <img
          className={`${ingredient.ingredient__image} ml-4 mr-4`}
          src={data.image}
          alt={data.name}
        />
        <div className={`${ingredient.ingredient__cover} mt-1 mb-1`}>
          <p className={`${ingredient.ingredient__price} text text_type_digits-default pr-2`}>
            {data.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <h4 className={`${ingredient.ingredient__title} text text_type_main-default`}>
          {data.name}
        </h4>
      </li>
    </Link>
  );
}

export default Ingredient;
