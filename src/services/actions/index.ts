import { executeGet } from '../../utils/api';
import { BASE_URL } from '../../utils/constants';
import { TThunk } from '../../utils/types';
export {
  sendOrder,
  sendRegistration,
  sendLogin,
  sendLogout,
  sendRestore,
  sendReset,
  getUser,
  updateUser
} from './withAuth';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
  'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
  'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' =
  'GET_INGREDIENTS_FAILED';

export const SET_CURRENT_TAB: 'SET_CURRENT_TAB' = 'SET_CURRENT_TAB';

export const CHANGE_BURGER: 'CHANGE_BURGER' = 'CHANGE_BURGER';

export const MAKE_ORDER_REQUEST: 'MAKE_ORDER_REQUEST' = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS: 'MAKE_ORDER_SUCCESS' = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED: 'MAKE_ORDER_FAILED' = 'MAKE_ORDER_FAILED';
export const CLOSE_ORDER: 'CLOSE_ORDER' = 'CLOSE_ORDER';

export const ENABLE_PRELOADER: 'ENABLE_PRELOADER' = 'ENABLE_PRELOADER';
export const DISABLE_PRELOADER: 'DISABLE_PRELOADER' = 'DISABLE_PRELOADER';

export const SET_USER_REQUEST: 'SET_USER_REQUEST' = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS: 'SET_USER_SUCCESS' = 'SET_USER_SUCCESS';
export const SET_USER_FAILED: 'SET_USER_FAILED' = 'SET_USER_FAILED';

export const LOGGED_IN: 'LOGGED_IN' = 'LOGGED_IN';
export const LOGGED_OUT: 'LOGGED_OUT' = 'LOGGED_OUT';

export const RESTORE_STARTED: 'RESTORE_STARTED' = 'RESTORE_STARTED';
export const RESTORE_FINISHED: 'RESTORE_FINISHED' = 'RESTORE_FINISHED';

export function getIngredients(): TThunk {
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
};
