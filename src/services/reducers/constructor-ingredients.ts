import { ADD_INGREDIENT, REMOVE_INGREDIENT, GET_CONSTRUCTOR_INGREDIENTS } from '../actions/constructor-ingredients';
import Ingredient from '../../types/ingredient';

type InitialStateType1 = {
  constructorIngredients: Ingredient[],
}

const initialState: InitialStateType1 = {
  constructorIngredients: [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    },
    {
      _id: '643d69a5c3f7b9001cfa094a',
      name: 'Сыр с астероидной плесенью',
      type: 'main',
      proteins: 84,
      fat: 48,
      carbohydrates: 420,
      calories: 3377,
      price: 4142,
      image: 'https://code.s3.yandex.net/react/code/cheese.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
      __v: 0,
    },
    {
      _id: '643d69a5c3f7b9001cfa0943',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v: 0,
    },
  ],
};

type ActionTypes = typeof ADD_INGREDIENT | typeof REMOVE_INGREDIENT | typeof GET_CONSTRUCTOR_INGREDIENTS;

export type ConstructorIngredientsAction = {
  type: ActionTypes;
  payload?: Ingredient | string | Ingredient[];
};

// eslint-disable-next-line default-param-last
export const constructorReducer = (state: InitialStateType1 = initialState, action: ConstructorIngredientsAction) => {
  console.log('state', state);
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.payload],
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients.filter((el) => el._id !== action.payload)],
      };
    }
    case GET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients]
      };
    }
    default: {
      return state;
    }
  }
};
