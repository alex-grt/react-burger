import {
  initialOrder,
  initialUser,
  initialLoggedIn,
  initialRestore
} from './initialStates';
import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  CLOSE_ORDER,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAILED,
  LOGGED_IN,
  LOGGED_OUT,
  RESTORE_STARTED,
  RESTORE_FINISHED
} from '../actions/index';
import {
  setOrder,
  setUserData,
  setLoggedIn,
  setRestorePassword
} from './reducersWithAuth';
import { fakeOrder } from '../../utils/fakeData';

describe('Оформление заказа', () => {
  it('Начальное состояние', () => {
    // @ts-ignore
    expect(setOrder(undefined, {})).toEqual(initialOrder);
  });

  it('Начало запроса к серверу', () => {
    expect(
      setOrder(initialOrder, { type: MAKE_ORDER_REQUEST })
    ).toEqual({ ...initialOrder, orderRequest: true });
  });

  it('Успешное оформление заказа', () => {
    expect(
      setOrder(initialOrder, {
        type: MAKE_ORDER_SUCCESS,
        order: fakeOrder
      })
    ).toEqual({
      order: fakeOrder,
      orderRequest: false,
      orderFailed: false,
      open: true
    });
  });

  it('Ошибка оформления заказа', () => {
    expect(
      setOrder(initialOrder, { type: MAKE_ORDER_FAILED })
    ).toEqual({
      ...initialOrder,
      orderRequest: false,
      orderFailed: true
    });
  });

  it('Закрытие модального окна оформления заказа', () => {
    expect(
      setOrder(initialOrder, {
        type: CLOSE_ORDER
      })
    ).toEqual({
      order: {},
      orderRequest: false,
      orderFailed: false,
      open: false
    });
  });
});

describe('Получение данных пользователя с сервера', () => {
  it('Начальное состояние', () => {
    // @ts-ignore
    expect(setUserData(undefined, {})).toEqual(initialUser);
  });

  it('Начало запроса к серверу', () => {
    expect(
      setUserData(initialUser, { type: SET_USER_REQUEST })
    ).toEqual({ ...initialUser, userRequest: true });
  });

  it('Получение данных с сервера', () => {
    expect(
      setUserData(initialUser, {
        type: SET_USER_SUCCESS,
        userData: { email: 'test@test.ru', name: 'test' }
      })
    ).toEqual({
      email: 'test@test.ru',
      name: 'test',
      userRequest: false,
      userFailed: false,
    });
  });

  it('Ошибка получения данных с сервера', () => {
    expect(
      setUserData(initialUser, { type: SET_USER_FAILED })
    ).toEqual({
      ...initialUser,
      userRequest: false,
      userFailed: true,
    });
  });
});

describe('Переключение статуса авторизации', () => {
  it('Начальное состояние', () => {
    // @ts-ignore
    expect(setLoggedIn(undefined, {})).toEqual(initialLoggedIn);
  });

  it('Пользователь авторизован', () => {
    expect(setLoggedIn(initialLoggedIn, { type: LOGGED_IN }))
      .toEqual({ loggedIn: true });
  });

  it('Пользователь не авторизован', () => {
    expect(setLoggedIn(initialLoggedIn, { type: LOGGED_OUT }))
      .toEqual({ loggedIn: false });
  });
});

describe('Состояние восстановления пароля', () => {
  it('Начальное состояние', () => {
    // @ts-ignore
    expect(setRestorePassword(undefined, {})).toEqual(initialRestore);
  });

  it('Восстановление пароля', () => {
    expect(setRestorePassword(initialRestore, { type: RESTORE_STARTED }))
      .toEqual({ restore: true });
  });

  it('Окончание восстановления пароля', () => {
    expect(setRestorePassword(initialRestore, { type: RESTORE_FINISHED }))
      .toEqual({ restore: false });
  });
});
