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

const initialPreloader = {
  open: false
}

const initialUser = {
  email: '',
  name: '',
  accessToken: '',
  refreshToken: '',
  loggedIn: false,
  userRequest: false,
  userFailed: false,
}

const initialRestore = {
  restore: false
}

export {
  initialIngredients,
  initialBurger,
  initialIngredient,
  initialOrder,
  initialPreloader,
  initialUser,
  initialRestore
};
