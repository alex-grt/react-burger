import burgerConstructor from './BurgerConstructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useQueryExecution } from '../../hooks/useQueryExecution';
import { URL_API_ORDER } from '../../utils/constants';
import { CHANGE_BURGER, CLOSE_ORDER, MAKE_ORDER_FAILED, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS } from '../../services/actions';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { burger } = useSelector(store => store.burger);
  const { open } = useSelector(store => store.order);
  const { executePost } = useQueryExecution(URL_API_ORDER);
  const date = new Date();
  const timestamp = date.getTime();
  const buns = burger.filter(item => item.type === 'bun' ? item : null);
  const filling = burger.filter(item => item.type !== 'bun' ? item : null);
  const ingredients = burger.map(item => item._id);

  function handleClose() {
    dispatch({ type: CLOSE_ORDER });
  }

  function handleDelete(timeId) {
    dispatch({
      type: CHANGE_BURGER,
      burger: burger.filter(item => item.timeId === timeId ? null : item)
    });
  }

  function calculateSum() {
    const sumFilling = filling.reduce((sum, item) => sum = sum + item.price, 0);
    const sum = (2 * buns[0]?.price || 0) + sumFilling;
    return sum;
  }

  function makeOrder() {
    dispatch({ type: MAKE_ORDER_REQUEST });
    executePost({ ingredients })
      .then(res => {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          order: res.order
        });
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: MAKE_ORDER_FAILED });
      });
  }

  function handleBurger(item) {
    if (item.type !== 'bun') {
      dispatch({
        type: CHANGE_BURGER,
        burger: [...burger, {...item, timeId: timestamp}]
      });
    } else {
      dispatch({
        type: CHANGE_BURGER,
        burger: [
          ...burger.filter(item => item.type === 'bun' ? null : item),
          {...item, timeId: timestamp}
        ]
      });
    }
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
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
                {filling.map(item => (
                  <li
                    className={burgerConstructor.burger__ingredient}
                    key={item.timeId}
                  >
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                      handleClose={() => handleDelete(item.timeId)}
                    />
                  </li>
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
              <Button value="test" type="primary" size="large" onClick={makeOrder}>
                Оформить заказ
              </Button>
            ) : (
              <Button type="primary" size="large" disabled>
                Оформить заказ
              </Button>
            )}
          </div>
        </div>
      ) : (
        <p className={`${burgerConstructor.notice} text text_type_main-default`}>
          Добавьте ингредиенты в свой бургер
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
