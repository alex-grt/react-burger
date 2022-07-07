const initialIngredients = [{
  _id: '',
  name: '',
  type: '',
  proteins: null,
  fat: null,
  carbohydrates: null,
  calories: null,
  price: null,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: null
}];

const initialBurger = [{
  _id: '',
  name: '',
  type: '',
  proteins: null,
  fat: null,
  carbohydrates: null,
  calories: null,
  price: null,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: null,
  timeId: null
}];

const initialIngredient = {
  _id: '',
  name: '',
  type: '',
  proteins: null,
  fat: null,
  carbohydrates: null,
  calories: null,
  price: null,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: null
};

const initialOrder = {
  name: '',
  order: {
    number: null
  },
  success: false
};

export {
  initialIngredients,
  initialBurger,
  initialIngredient,
  initialOrder
};
