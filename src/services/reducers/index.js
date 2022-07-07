import { combineReducers } from 'redux';
import { getAllIngredients, makeBurger, chooseIngredient, setOrder } from './reducers';

export const rootReducer = combineReducers({
  ingredients: getAllIngredients,
  burger: makeBurger,
  ingredient: chooseIngredient,
  order: setOrder
});
