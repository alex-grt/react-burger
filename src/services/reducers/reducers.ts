import {
  initialIngredients,
  initialBurger,
  initialPreloader
} from './initialStates';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_TAB,
  CHANGE_BURGER,
  ENABLE_PRELOADER,
  DISABLE_PRELOADER,
} from '../actions/index';
import { TActions } from '../actions/types';
import { IStateBurger, IStateIngredients, IStatePreloader } from './types';

function getAllIngredients(
  state = initialIngredients,
  action: TActions
): IStateIngredients {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      };
    }
    case SET_CURRENT_TAB: {
      return {
        ...state,
        currentTab: action.currentTab
      };
    }
    default: { return state; }
  }
};

function makeBurger(state = initialBurger, action: TActions): IStateBurger {
  switch (action.type) {
    case CHANGE_BURGER: {
      return { burger: action.burger };
    }
    default: { return state; }
  }
};

function setPreloader(
  state = initialPreloader,
  action: TActions
): IStatePreloader {
  switch (action.type) {
    case ENABLE_PRELOADER: {
      return { open: true };
    }
    case DISABLE_PRELOADER: {
      return { open: false };
    }
    default: { return state; }
  }
};

export {
  getAllIngredients,
  makeBurger,
  setPreloader
};
