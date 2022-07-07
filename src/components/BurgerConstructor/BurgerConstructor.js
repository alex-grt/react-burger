import burgerConstructor from './BurgerConstructor.module.css';
import React from 'react';
import { useQueryExecution } from '../../hooks/useQueryExecution';
import { URL_API_ORDER } from '../../utils/constants';
import { dataStructure } from '../../utils/types';
import PropTypes from 'prop-types';
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

function BurgerConstructor({ counter, setCounter }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [order, setOrder] = React.useState({});
  const { executePost } = useQueryExecution(URL_API_ORDER);
  const buns = counter.filter(item => item.type === 'bun' ? item : null);
  const filling = counter.filter(item => item.type !== 'bun' ? item : null);
  const ingredients = counter.map(item => item._id);

  function handleClose() {
    setIsOpen(false);
  }

  function handleDelete(timeId) {
    setCounter(state =>
      state.filter(item => item.timeId === timeId ? null : item)
    );
  }

  function calculateSum() {
    const sumFilling = filling.reduce((sum, item) => sum = sum + item.price, 0);
    const sum = (2 * buns[0]?.price || 0) + sumFilling;
    return sum;
  }

  function makeOrder() {
    executePost({ ingredients })
      .then(res => {
        setOrder(res.order);
        setIsOpen(true);
      })
      .catch(err => alert(`Ошибка: ${err}`));
  }

  return (
    <section
      className={`${burgerConstructor.burger} pt-25 pb-10 pl-4`}
      aria-label="ваш бургер"
    >
      {counter.length ? (
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
              <Button type="primary" size="large" onClick={makeOrder}>
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
        isOpen={isOpen}
        onClose={handleClose}
      >
        <OrderDetails order={order} />
      </Modal>
    </section>
  );
}

BurgerConstructor.propTypes = {
  counter: PropTypes.arrayOf(PropTypes.shape({
    ...dataStructure,
    timeId: PropTypes.number.isRequired
  })).isRequired,
  setCounter: PropTypes.func.isRequired
}

export default BurgerConstructor;
