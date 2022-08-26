import { executePost } from '../../utils/api';
import { BASE_URL } from '../../utils/constants';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookieMethods';
import {
  getWithRefresh,
  patchWithRefresh,
  postWithRefresh
} from '../../utils/apiWithRefresh'
import {
  ENABLE_PRELOADER,
  DISABLE_PRELOADER,
  CHANGE_BURGER,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAILED,
  LOGGED_IN,
  LOGGED_OUT,
  RESTORE_STARTED,
  RESTORE_FINISHED
} from './index';
import { TDispatch, TIngredientList, TThunk } from '../../utils/types';

interface IValues {
  [name: string]: string;
}

function sendOrder(data: { ingredients: TIngredientList }): TThunk {
  return function(dispatch: TDispatch) {
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

function sendRegistration(data: IValues, callback: () => void): TThunk {
  return function(dispatch: TDispatch) {
    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: SET_USER_REQUEST });
    executePost(`${BASE_URL}auth/register`, data)
      .then(res => {
        dispatch({
          type: SET_USER_SUCCESS,
          userData: {
            email: res.user.email,
            name: res.user.name
          }
        });
        const token = res.accessToken.split('Bearer ')[1];
        setCookie('accessToken', token, {
          expires: 1200,
          SameSite: 'None',
          Secure: true
        });
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({ type: LOGGED_IN });
        callback();
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: SET_USER_FAILED });
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
};

function sendLogin(data: IValues, callback: () => void): TThunk {
  return function(dispatch: TDispatch) {
    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: SET_USER_REQUEST });
    executePost(`${BASE_URL}auth/login`, data)
      .then(res => {
        dispatch({
          type: SET_USER_SUCCESS,
          userData: {
            email: res.user.email,
            name: res.user.name
          }
        });
        const token = res.accessToken.split('Bearer ')[1];
        setCookie('accessToken', token, {
          expires: 1200,
          SameSite: 'None',
          Secure: true
        });
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({ type: LOGGED_IN });
        callback();
      })
      .catch(err => {
        alert(`Ошибка: ${err}`);
        dispatch({ type: SET_USER_FAILED });
      })
      .finally(() => dispatch({ type: DISABLE_PRELOADER }));
  }
};

function sendLogout(
  data: { token: string | null },
  callback: () => void
): TThunk {
  return function(dispatch: TDispatch) {
    dispatch({ type: ENABLE_PRELOADER });
    dispatch({ type: SET_USER_REQUEST });
    executePost(`${BASE_URL}auth/logout`, data)
      .then(() => {
        dispatch({
          type: SET_USER_SUCCESS,
          userData: {
            email: '',
            name: ''
          }
        });
        dispatch({ type: LOGGED_OUT });
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

function sendRestore(data: IValues, callback: () => void): TThunk {
  return function(dispatch: TDispatch) {
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

function sendReset(data: IValues, callback: () => void): TThunk {
  return function(dispatch: TDispatch) {
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

function getUser(): TThunk {
  return function(dispatch: TDispatch) {
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
            name: res.user.name
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

function updateUser(data: IValues): TThunk {
  return function(dispatch: TDispatch) {
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
            name: res.user.name
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

export {
  sendOrder,
  sendRegistration,
  sendLogin,
  sendLogout,
  sendRestore,
  sendReset,
  getUser,
  updateUser
};
