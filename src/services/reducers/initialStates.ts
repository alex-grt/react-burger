import {
  IStateBurger,
  IStateIngredients,
  IStateLoggedIn,
  IStateOrder,
  IStatePreloader,
  IStateRestore,
  IStateUser
} from './types';
import { IStateWSOrders } from './wsTypes';

const initialIngredients: IStateIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentTab: 'bun'
};

const initialBurger: IStateBurger = {
  burger: []
};

const initialOrder: IStateOrder = {
  order: {},
  orderRequest: false,
  orderFailed: false,
  open: false
};

const initialPreloader: IStatePreloader = {
  open: false
};

const initialUser: IStateUser = {
  email: '',
  name: '',
  userRequest: false,
  userFailed: false,
};

const initialLoggedIn: IStateLoggedIn = {
  loggedIn: false
};

const initialRestore: IStateRestore = {
  restore: false
};

const initialWSOrders: IStateWSOrders = {
  connected: false,
  data: ''
}

export {
  initialIngredients,
  initialBurger,
  initialOrder,
  initialPreloader,
  initialUser,
  initialLoggedIn,
  initialRestore,
  initialWSOrders
};
