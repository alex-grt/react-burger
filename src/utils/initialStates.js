const initialIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentTab: 'bun'
};

const initialBurger = {
  burger: []
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
  userRequest: false,
  userFailed: false,
}

const initialLoggedIn = {
  loggedIn: false
}

const initialRestore = {
  restore: false
}

export {
  initialIngredients,
  initialBurger,
  initialOrder,
  initialPreloader,
  initialUser,
  initialLoggedIn,
  initialRestore
};
