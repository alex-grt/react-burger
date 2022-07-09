import { executeGet, executePost } from '../api';
import { BASE_URL } from '../../utils/constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export const CHANGE_BURGER = 'CHANGE_BURGER';

export const OPEN_SELECTED_INGREDIENT = 'OPEN_SELECTED_INGREDIENT';
export const CLOSE_SELECTED_INGREDIENT = 'CLOSE_SELECTED_INGREDIENT';

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export const ENABLE_PRELOADER = 'ENABLE_PRELOADER';
export const DISABLE_PRELOADER = 'DISABLE_PRELOADER';

export function getIngredients() {
  return function(dispatch) {
    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    executeGet(`${BASE_URL}ingredients`)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({ type: GET_INGREDIENTS_FAILED });
        }
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: GET_INGREDIENTS_FAILED });
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
}

export function sendOrder(data) {
  return function(dispatch) {
    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: MAKE_ORDER_REQUEST });
    executePost(`${BASE_URL}orders`, data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: MAKE_ORDER_SUCCESS,
            order: res.order
          });
          dispatch({
            type: CHANGE_BURGER,
            burger: []
          });
        } else {
          dispatch({ type: MAKE_ORDER_FAILED });
        }
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: MAKE_ORDER_FAILED });
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
}
