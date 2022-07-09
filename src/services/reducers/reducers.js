import {
  initialIngredients,
  initialBurger,
  initialIngredient,
  initialOrder,
  initialPreloader
} from '../../utils/initialStates';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_TAB,
  CHANGE_BURGER,
  OPEN_SELECTED_INGREDIENT,
  CLOSE_SELECTED_INGREDIENT,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
  CLOSE_ORDER,
  ENABLE_PRELOADER,
  DISABLE_PRELOADER
} from '../actions/index';



function getAllIngredients(state = initialIngredients, action) {
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

function makeBurger(state = initialBurger, action) {
  switch (action.type) {
    case CHANGE_BURGER: {
      return { burger: action.burger };
    }
    default: { return state; }
  }
};

function chooseIngredient(state = initialIngredient, action) {
  switch (action.type) {
    case OPEN_SELECTED_INGREDIENT: {
      return {
        selectedIngredient: action.selectedIngredient,
        open: true
      };
    }
    case CLOSE_SELECTED_INGREDIENT: {
      return {
        selectedIngredient: {},
        open: false
      };
    }
    default: { return state; }
  }
};

function setOrder(state = initialOrder, action) {
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

function setPreloader(state = initialPreloader, action) {
  switch (action.type) {
    case ENABLE_PRELOADER: {
      return { open: true };
    }
    case DISABLE_PRELOADER: {
      return { open: false };
    }
    default: { return state; }
  }
}

export {
  getAllIngredients,
  makeBurger,
  chooseIngredient,
  setOrder,
  setPreloader
};
