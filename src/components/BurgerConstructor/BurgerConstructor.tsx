import burgerConstructor from './BurgerConstructor.module.css';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';
import { IData, IDataWithTimestamp, TDispatch, TStore } from '../../utils/types';
import { CHANGE_BURGER, CLOSE_ORDER } from '../../services/actions';
import { sendOrder } from '../../services/actions/withAuth';
import {
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TSButton } from '../TSButton/TSButton';
import FillingIngredient from '../FillingIngredient/FillingIngredient';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<TDispatch>();
  const { loggedIn }: { loggedIn: boolean } = useSelector(
    (store: TStore) => store.loggedIn
  );
  const { burger }: { burger: IDataWithTimestamp[] } = useSelector(
    (store: TStore) => store.burger
  );
  const { open }: { open: boolean } = useSelector((store: TStore) => store.order);
  const date = new Date();
  const buns: IDataWithTimestamp[] = burger.filter(
    item => item.type === 'bun' ? item : null
  );
  const filling: IDataWithTimestamp[] = burger.filter(
    item => item.type !== 'bun' ? item : null
  );
  const ingredients: string[] = burger.map(item => item._id);
  const history = useHistory();

  function handleClose() {
    dispatch({ type: CLOSE_ORDER });
  }

  function calculateSum(): number {
    const sumFilling: number = filling.reduce(
      (sum: number, item: IDataWithTimestamp) => sum = sum + item.price,
      0
    );
    const sum: number = (2 * buns[0]?.price || 0) + sumFilling;
    return sum;
  }

  function makeOrder() {
    if (loggedIn) {
      dispatch(sendOrder({ ingredients }));
    } else {
      history.replace({ pathname: '/login' });
    }
  }

  function handleBurger(item: IData) {
    const timeId = date.getTime();

    if (item.type !== 'bun') {
      dispatch({
        type: CHANGE_BURGER,
        burger: [...burger, {...item, timeId}]
      });
    } else {
      dispatch({
        type: CHANGE_BURGER,
        burger: [
          ...burger.filter((item: IData) => item.type === 'bun' ? null : item),
          {...item, timeId}
        ]
      });
    }
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item: any) {
      handleBurger(item);
    }
  });

  return (
    <section
      className={`${burgerConstructor.burger} pt-25 pb-10 pl-4 ${
        isHover && burgerConstructor.burger_hovering
      }`}
      aria-label="ваш бургер"
      ref={dropTarget}
    >
      {burger.length ? (
        <div className={burgerConstructor.burger__cover}>
          <div className={burgerConstructor.burger__ingredients}>
            {buns.length !== 0 ? (
              <div className={`${burgerConstructor.burger__bun} mr-4 pl-8`}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${buns[0]?.name} (верх)`}
                  price={buns[0]?.price}
                  thumbnail={buns[0]?.image}
                />
              </div>
            ) : (
              <div className={burgerConstructor.burger__bunNotBun} />
            )}
            {filling.length !== 0 && (
              <ul className={burgerConstructor.burger__list}>
                {filling.map((item, index) => (
                  <FillingIngredient key={item.timeId} data={item} index={index} />
                ))}
              </ul>
            )}
            {buns.length !== 0 ? (
              <div className={`${burgerConstructor.burger}__bun mr-4 pl-8`}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${buns[0]?.name} (низ)`}
                  price={buns[0]?.price}
                  thumbnail={buns[0]?.image}
                />
              </div>
            ) : (
              <div className={burgerConstructor.burger__bunNotBun} />
            )}
          </div>
          <div className={`${burgerConstructor.burger__order} mt-10 mr-4`}>
            <div className={`${burgerConstructor.burger__price} mr-10`}>
              <p
                className={`${
                  burgerConstructor.burger__priceText
                } text text_type_digits-medium mr-2`}
              >
                {calculateSum()}
              </p>
              <CurrencyIcon type="primary" />
            </div>
            {buns.length !== 0 ? (
              <TSButton type="primary" size="large" onClick={makeOrder}>
                Оформить заказ
              </TSButton>
            ) : (
              <TSButton type="primary" size="large" disabled>
                Оформить заказ
              </TSButton>
            )}
          </div>
        </div>
      ) : (
        <p className={`${burgerConstructor.notice} text text_type_main-default`}>
          Перенесите сюда ингредиенты, чтобы создать свой бургер
        </p>
      )}
      <Modal
        isOpen={open}
        onClose={handleClose}
      >
        <OrderDetails />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;
