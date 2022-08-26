import { initialWSOrders } from './initialStates';
import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from '../actions/wsActions';
import { TWSActions } from '../actions/wsTypes';
import { IStateWSOrders } from './wsTypes';

function getWSOrders(
  state = initialWSOrders,
  action: TWSActions
): IStateWSOrders {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        connected: true
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        connected: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        connected: false,
        error: action.payload
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        connected: false
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        data: action.payload
      };
    }
    default: { return state; }
  }
};

function getWSUserOrders(
  state = initialWSOrders,
  action: TWSActions
): IStateWSOrders {
  switch (action.type) {
    case WS_AUTH_CONNECTION_START: {
      return {
        ...state,
        connected: true
      };
    }
    case WS_AUTH_CONNECTION_SUCCESS: {
      return {
        ...state,
        connected: true
      };
    }
    case WS_AUTH_CONNECTION_ERROR: {
      return {
        ...state,
        connected: false,
        error: action.payload
      };
    }
    case WS_AUTH_CONNECTION_CLOSED: {
      return {
        ...state,
        connected: false
      };
    }
    case WS_AUTH_GET_MESSAGE: {
      return {
        ...state,
        data: action.payload
      };
    }
    default: { return state; }
  }
};

export {
  getWSOrders,
  getWSUserOrders
};
