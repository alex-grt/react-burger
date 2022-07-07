import {
  initialIngredients,
  initialBurger,
  initialIngredient,
  initialOrder
} from '../../utils/initialStates';



function getAllIngredients(state = initialIngredients, action) {
  switch (action.type) {
    default: { return state; }
  }
};

function makeBurger(state = initialBurger, action) {
  switch (action.type) {
    default: { return state; }
  }
};

function chooseIngredient(state = initialIngredient, action) {
  switch (action.type) {
    default: { return state; }
  }
};

function setOrder(state = initialOrder, action) {
  switch (action.type) {
    default: { return state; }
  }
};

export {
  getAllIngredients,
  makeBurger,
  chooseIngredient,
  setOrder
};
