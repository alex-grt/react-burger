import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_TAB,
  CHANGE_BURGER,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  CLOSE_ORDER,
  ENABLE_PRELOADER,
  DISABLE_PRELOADER,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAILED,
  LOGGED_IN,
  LOGGED_OUT,
  RESTORE_STARTED,
  RESTORE_FINISHED
} from ".";
import { IData, IDataWithTimestamp, IOrder } from "../../utils/types";
import { TWSActions } from "./wsTypes";

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: IData[];
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface ISetCurrentTabAction {
  readonly type: typeof SET_CURRENT_TAB;
  currentTab: string;
}

export interface IChangeBurgerAction {
  readonly type: typeof CHANGE_BURGER;
  burger: IDataWithTimestamp[];
}

export interface IMakeOrderRequestAction {
  readonly type: typeof MAKE_ORDER_REQUEST;
}

export interface IMakeOrderSuccessAction {
  readonly type: typeof MAKE_ORDER_SUCCESS;
  order: IOrder;
}

export interface IMakeOrderFailedAction {
  readonly type: typeof MAKE_ORDER_FAILED;
}

export interface ICloseOrderAction {
  readonly type: typeof CLOSE_ORDER;
}

export interface IEnablePreloaderAction {
  readonly type: typeof ENABLE_PRELOADER;
}

export interface IDisablePreloaderAction {
  readonly type: typeof DISABLE_PRELOADER;
}

export interface ISetUserRequestAction {
  readonly type: typeof SET_USER_REQUEST;
}

export interface ISetUserSuccessAction {
  readonly type: typeof SET_USER_SUCCESS;
  userData: {
    name: string;
    email: string;
  }
}

export interface ISetUserFailedAction {
  readonly type: typeof SET_USER_FAILED;
}

export interface ILoggedInAction {
  readonly type: typeof LOGGED_IN;
}

export interface ILoggedOutAction {
  readonly type: typeof LOGGED_OUT;
}

export interface IRestoreStartedAction {
  readonly type: typeof RESTORE_STARTED;
}

export interface IRestoreFinishedAction {
  readonly type: typeof RESTORE_FINISHED;
}

export type TActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | ISetCurrentTabAction
  | IChangeBurgerAction
  | IMakeOrderRequestAction
  | IMakeOrderSuccessAction
  | IMakeOrderFailedAction
  | ICloseOrderAction
  | IEnablePreloaderAction
  | IDisablePreloaderAction
  | ISetUserRequestAction
  | ISetUserSuccessAction
  | ISetUserFailedAction
  | ILoggedInAction
  | ILoggedOutAction
  | IRestoreStartedAction
  | IRestoreFinishedAction
  | TWSActions;
