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
import { TActions } from '../actions/types';
import {
  IStateLoggedIn,
  IStateOrder,
  IStateRestore,
  IStateUser
} from './types';

function setOrder(state = initialOrder, action: TActions): IStateOrder {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderFailed: false,
        open: true
      };
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      };
    }
    case CLOSE_ORDER: {
      return {
        order: {},
        orderRequest: false,
        orderFailed: false,
        open: false
      };
    }
    default: { return state; }
  }
};

function setUserData(state = initialUser, action: TActions): IStateUser {
  switch (action.type) {
    case SET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true
      };
    }
    case SET_USER_SUCCESS: {
      return {
        ...action.userData,
        userRequest: false,
        userFailed: false,
      }
    }
    case SET_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
      }
    }
    default: { return state; }
  }
};

function setLoggedIn(
  state = initialLoggedIn,
  action: TActions
): IStateLoggedIn {
  switch (action.type) {
    case LOGGED_IN: {
      return { loggedIn: true };
    }
    case LOGGED_OUT: {
      return { loggedIn: false };
    }
    default: { return state; }
  }
};

function setRestorePassword(
  state = initialRestore,
  action: TActions
): IStateRestore {
  switch (action.type) {
    case RESTORE_STARTED: {
      return { restore: true };
    }
    case RESTORE_FINISHED: {
      return { restore: false };
    }
    default: { return state; }
  }
};

export {
  setOrder,
  setUserData,
  setLoggedIn,
  setRestorePassword
};
