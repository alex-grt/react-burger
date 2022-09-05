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
import { getAllIngredients, makeBurger, setPreloader } from './reducers';
import { fakeBurger, fakeIngredients } from '../../utils/fakeData';

describe('Получение ингредиентов с сервера и их отображение', () => {
  it('Начальное состояние', () => {
    // @ts-ignore
    expect(getAllIngredients(undefined, {})).toEqual(initialIngredients);
  });

  it('Начало запроса к серверу', () => {
    expect(
      getAllIngredients(initialIngredients, { type: GET_INGREDIENTS_REQUEST })
    ).toEqual({ ...initialIngredients, ingredientsRequest: true });
  });

  it('Получение данных с сервера', () => {
    expect(
      getAllIngredients(initialIngredients, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: fakeIngredients
      })
    ).toEqual({
      ...initialIngredients,
      ingredients: fakeIngredients,
      ingredientsRequest: false,
      ingredientsFailed: false
    });
  });

  it('Ошибка получения данных с сервера', () => {
    expect(
      getAllIngredients(initialIngredients, { type: GET_INGREDIENTS_FAILED })
    ).toEqual({
      ...initialIngredients,
      ingredientsRequest: false,
      ingredientsFailed: true
    });
  });

  it('Переключение вкладки ингредиентов', () => {
    expect(
      getAllIngredients(initialIngredients, {
        type: SET_CURRENT_TAB,
        currentTab: 'test'
      })
    ).toEqual({
      ...initialIngredients,
      currentTab: 'test'
    });
  });
});

describe('Изменение состава бургера', () => {
  it('Начальное состояние', () => {
    // @ts-ignore
    expect(makeBurger(undefined, {})).toEqual(initialBurger);
  });

  it('Изменение состава бургера', () => {
    expect(makeBurger(initialBurger, {
      type: CHANGE_BURGER,
      burger: fakeBurger
    })).toEqual({ burger: fakeBurger });
  });
});

describe('Переключение состояния прелодера', () => {
  it('Начальное состояние', () => {
    // @ts-ignore
    expect(setPreloader(undefined, {})).toEqual(initialPreloader);
  });

  it('Отображение прелодера', () => {
    expect(setPreloader(initialPreloader, { type: ENABLE_PRELOADER }))
      .toEqual({ open: true });
  });

  it('Скрытие прелодера', () => {
    expect(setPreloader(initialPreloader, { type: DISABLE_PRELOADER }))
      .toEqual({ open: false });
  });
});
