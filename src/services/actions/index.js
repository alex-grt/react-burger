import { executeGet, executePost } from '../../utils/api';
import { BASE_URL } from '../../utils/constants';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookieMethods';
import {
  getWithRefresh,
  patchWithRefresh,
  postWithRefresh
} from '../../utils/apiWithRefresh'

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

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_TOKEN_SUCCESS = 'SET_USER_TOKEN_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';

export const RESTORE_STARTED = 'RESTORE_STARTED';
export const RESTORE_FINISHED = 'RESTORE_FINISHED';

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
};

export function sendOrder(data) {
  return function(dispatch) {
    const headers ={
      "content-type": "application/json",
      authorization: 'Bearer ' + getCookie('accessToken')
    };

    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: MAKE_ORDER_REQUEST });
    postWithRefresh(`${BASE_URL}orders`, data, headers)
      .then(res => {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          order: res.order
        });
        dispatch({
          type: SET_USER_TOKEN_SUCCESS,
          userData: {
            accessToken: getCookie('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            loggedIn: true
          }
        });
        dispatch({
          type: CHANGE_BURGER,
          burger: []
        });
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: MAKE_ORDER_FAILED });
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
};

export function sendRegistration(data, callback) {
  return function(dispatch) {
    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: SET_USER_REQUEST });
    executePost(`${BASE_URL}auth/register`, data)
      .then(res => {
        dispatch({
          type: SET_USER_SUCCESS,
          userData: {
            email: res.user.email,
            name: res.user.name,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            loggedIn: true
          }
        });
        const token = res.accessToken.split('Bearer ')[1];
        setCookie('accessToken', token, {
          expires: 1200,
          SameSite: 'None',
          Secure: true
        });
        localStorage.setItem('refreshToken', res.refreshToken);
        callback();
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: SET_USER_FAILED });
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
};

export function sendLogin(data, callback) {
  return function(dispatch) {
    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: SET_USER_REQUEST });
    executePost(`${BASE_URL}auth/login`, data)
      .then(res => {
        dispatch({
          type: SET_USER_SUCCESS,
          userData: {
            email: res.user.email,
            name: res.user.name,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            loggedIn: true
          }
        });
        const token = res.accessToken.split('Bearer ')[1];
        setCookie('accessToken', token, {
          expires: 1200,
          SameSite: 'None',
          Secure: true
        });
        localStorage.setItem('refreshToken', res.refreshToken);
        callback();
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: SET_USER_FAILED });
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
};

export function sendLogout(data, callback) {
  return function(dispatch) {
    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: SET_USER_REQUEST });
    executePost(`${BASE_URL}auth/logout`, data)
      .then(() => {
        dispatch({
          type: SET_USER_SUCCESS,
          userData: {
            email: '',
            name: '',
            accessToken: '',
            refreshToken: '',
            loggedIn: false
          }
        });
        deleteCookie('accessToken');
        localStorage.clear();
        callback();
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: SET_USER_FAILED });
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
};

export function sendRestore(data, callback) {
  return function(dispatch) {
    dispatch({ type: ENABLE_PRELOADER });
    executePost(`${BASE_URL}password-reset`, data)
      .then(() => {
        dispatch({ type: RESTORE_STARTED });
        callback();
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
};

export function sendReset(data, callback) {
  return function(dispatch) {
    dispatch({ type: ENABLE_PRELOADER });
    executePost(`${BASE_URL}password-reset/reset`, data)
      .then(() => {
        dispatch({ type: RESTORE_FINISHED });
        callback();
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
};

export function getUser() {
  return function(dispatch) {
    const headers = {
      "content-type": "application/json",
      authorization: 'Bearer ' + getCookie('accessToken')
    };

    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: SET_USER_REQUEST });
    getWithRefresh(`${BASE_URL}auth/user`, headers)
      .then(res => {
        dispatch({
          type: SET_USER_SUCCESS,
          userData: {
            email: res.user.email,
            name: res.user.name,
            accessToken: getCookie('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            loggedIn: true
          }
        });
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: SET_USER_FAILED });
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
};

export function updateUser(data) {
  return function(dispatch) {
    const headers ={
      "content-type": "application/json",
      authorization: 'Bearer ' + getCookie('accessToken')
    };

    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: SET_USER_REQUEST });
    patchWithRefresh(`${BASE_URL}auth/user`, data, headers)
      .then(res => {
        dispatch({
          type: SET_USER_SUCCESS,
          userData: {
            email: res.user.email,
            name: res.user.name,
            accessToken: getCookie('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            loggedIn: true
          }
        });
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: SET_USER_FAILED });
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
};
