const initialIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentTab: 'bun'
};

const initialBurger = {
  burger: []
};

const initialIngredient = {
  selectedIngredient: {},
  open: false
};

const initialOrder = {
  order: {},
  orderRequest: false,
  orderFailed: false,
  open: false
};

export {
  initialIngredients,
  initialBurger,
  initialIngredient,
  initialOrder
};
