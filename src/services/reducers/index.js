import { combineReducers } from 'redux';
import {
  getAllIngredients,
  makeBurger,
  chooseIngredient,
  setOrder,
  setPreloader,
  setUserData,
  setRestorePassword
} from './reducers';

export const rootReducer = combineReducers({
  ingredients: getAllIngredients,
  burger: makeBurger,
  ingredient: chooseIngredient,
  order: setOrder,
  preloader: setPreloader,
  user: setUserData,
  restore: setRestorePassword
});
