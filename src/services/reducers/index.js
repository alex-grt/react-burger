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

export const rootReducer = combineReducers({
  ingredients: getAllIngredients,
  burger: makeBurger,
  order: setOrder,
  preloader: setPreloader,
  user: setUserData,
  loggedIn: setLoggedIn,
  restore: setRestorePassword
});
