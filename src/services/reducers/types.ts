import { IData, IDataWithTimestamp, IOrder } from '../../utils/types';

export interface IStateIngredients {
  ingredients: IData[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  currentTab: string;
}

export interface IStateBurger {
  burger: IDataWithTimestamp[];
}

export interface IStateOrder {
  order: IOrder;
  orderRequest: boolean;
  orderFailed: boolean;
  open: boolean;
}

export interface IStatePreloader {
  open: boolean;
}

export interface IStateUser {
  email: string;
  name: string;
  userRequest: boolean;
  userFailed: boolean;
}

export interface IStateLoggedIn {
  loggedIn: boolean;
}

export interface IStateRestore {
  restore: boolean;
}
