import './BurgerConstructor.css';
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

function BurgerConstructor({ counter, setCounter }) {
  const buns = counter.filter(item => item.type === 'bun' ? item : null);
  const filling = counter.filter(item => item.type !== 'bun' ? item : null);

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

  return (
    <section className="burger pt-25 pb-10 pl-4" aria-label="ваш бургер">
      {counter.length ? (
        <div className="burger__cover">
          <div className="burger__ingredients">
            {buns.length !== 0 ? (
              <div className="burger__bun mr-4 pl-8">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${buns[0]?.name} (верх)`}
                  price={buns[0]?.price}
                  thumbnail={buns[0]?.image}
                />
              </div>
            ) : (
              <div className="burger__bun-not-bun" />
            )}
            {filling.length !== 0 && (
              <ul className="burger__list">
                {filling.map(item => (
                  <li className="burger__ingredient" key={item.timeId}>
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
              <div className="burger__bun mr-4 pl-8">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${buns[0]?.name} (низ)`}
                  price={buns[0]?.price}
                  thumbnail={buns[0]?.image}
                />
              </div>
            ) : (
              <div className="burger__bun-not-bun" />
            )}
          </div>
          <div className="burger__order mt-10 mr-4">
            <div className="burger__price mr-10">
              <p className="burger__price-text text text_type_digits-medium mr-2">
                {calculateSum()}
              </p>
              <CurrencyIcon type="primary" />
            </div>
            {buns.length !== 0 ? (
              <Button type="primary" size="large">
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
        <p className="notice text text_type_main-default">
          Добавьте ингредиенты в свой бургер
        </p>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  counter: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    timeId: PropTypes.number.isRequired
  })).isRequired,
  setCounter: PropTypes.func.isRequired
}

export default BurgerConstructor;
