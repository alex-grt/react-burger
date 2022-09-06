import { initialWSOrders } from './initialStates';
import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_STOP,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from '../actions/wsActions';
import {
  getWSOrders,
  getWSUserOrders
} from './wsRedusers';

describe('Получение всех заказов', () => {
  it('Начальное состояние', () => {
    // @ts-ignore
    expect(getWSOrders(undefined, {})).toEqual(initialWSOrders);
  });

  it('Начало соединения с сервером', () => {
    expect(
      getWSOrders(initialWSOrders, { type: WS_CONNECTION_START })
    ).toEqual({ ...initialWSOrders, connected: true });
  });

  it('Соединение с сервером установлено', () => {
    expect(
      getWSOrders(initialWSOrders, {
        type: WS_CONNECTION_SUCCESS,
        // @ts-ignore
        payload: {}
      })
    ).toEqual({ ...initialWSOrders, connected: true, info: {} });
  });

  it('Ошибка соединения', () => {
    expect(
      getWSOrders(initialWSOrders, {
        type: WS_CONNECTION_ERROR,
        // @ts-ignore
        payload: {}
      })
    ).toEqual({ ...initialWSOrders, connected: false, error: {} });
  });

  it('Закрытие соединения', () => {
    expect(
      getWSOrders(initialWSOrders, {
        type: WS_CONNECTION_CLOSED,
        // @ts-ignore
        payload: {}
      })
    ).toEqual({ ...initialWSOrders, connected: false, info: {} });
  });

  it('Получение данных', () => {
    expect(
      getWSOrders(initialWSOrders, {
        type: WS_GET_MESSAGE,
        payload: 'test'
      })
    ).toEqual({ ...initialWSOrders, data: 'test' });
  });

  it('Соединение с сервером завершено', () => {
    expect(
      getWSOrders(initialWSOrders, { type: WS_CONNECTION_STOP })
    ).toEqual({
      connected: false,
      data: '',
      error: null
    });
  });
});

describe('Получение заказов пользователя', () => {
  it('Начальное состояние', () => {
    // @ts-ignore
    expect(getWSUserOrders(undefined, {})).toEqual(initialWSOrders);
  });

  it('Начало соединения с сервером', () => {
    expect(
      getWSUserOrders(initialWSOrders, { type: WS_AUTH_CONNECTION_START })
    ).toEqual({ ...initialWSOrders, connected: true });
  });

  it('Соединение с сервером установлено', () => {
    expect(
      getWSUserOrders(initialWSOrders, {
        type: WS_AUTH_CONNECTION_SUCCESS,
        // @ts-ignore
        payload: {}
      })
    ).toEqual({ ...initialWSOrders, connected: true, info: {} });
  });

  it('Ошибка соединения', () => {
    expect(
      getWSUserOrders(initialWSOrders, {
        type: WS_AUTH_CONNECTION_ERROR,
        // @ts-ignore
        payload: {}
      })
    ).toEqual({ ...initialWSOrders, connected: false, error: {} });
  });

  it('Закрытие соединения', () => {
    expect(
      getWSUserOrders(initialWSOrders, {
        type: WS_AUTH_CONNECTION_CLOSED,
        // @ts-ignore
        payload: {}
      })
    ).toEqual({ ...initialWSOrders, connected: false, info: {} });
  });

  it('Получение данных', () => {
    expect(
      getWSUserOrders(initialWSOrders, {
        type: WS_AUTH_GET_MESSAGE,
        payload: 'test'
      })
    ).toEqual({ ...initialWSOrders, data: 'test' });
  });

  it('Соединение с сервером завершено', () => {
    expect(
      getWSUserOrders(initialWSOrders, { type: WS_AUTH_CONNECTION_STOP })
    ).toEqual({
      connected: false,
      data: '',
      error: null
    });
  });
});
