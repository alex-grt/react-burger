import { combineReducers } from 'redux';
import {
  getAllIngredients,
  makeBurger,
  setPreloader
} from './reducers';
import {
  setOrder,
  setUserData,
  setLoggedIn,
  setRestorePassword,
} from './reducersWithAuth';
import { getWSOrders, getWSUserOrders } from './wsRedusers';

export const rootReducer = combineReducers({
  ingredients: getAllIngredients,
  burger: makeBurger,
  order: setOrder,
  preloader: setPreloader,
  user: setUserData,
  loggedIn: setLoggedIn,
  restore: setRestorePassword,
  wsOrders: getWSOrders,
  wsUserOrders: getWSUserOrders
});
