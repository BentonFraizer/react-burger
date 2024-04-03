import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  GET_CONSTRUCTOR_INGREDIENTS,
  ADD_CONSTRUCTOR_BUN,
  GET_CONSTRUCTOR_BUN,
  REPLACE_CONSTRUCTOR_BUN
} from '../actions/constructor-ingredients';
import { Ingredient, UniqueIdIngredient } from '../../types';

type InitialConstructorStateType = {
  bun: Ingredient | null,
  constructorIngredients: UniqueIdIngredient[] | [],
}

const initialState: InitialConstructorStateType = {
  bun: null,
  constructorIngredients: [],
};
// На случай если понадобятся данные
// bun: {
//   _id: '643d69a5c3f7b9001cfa093c',
//     name: 'Краторная булка N-200i',
//     type: 'bun',
//     proteins: 80,
//     fat: 24,
//     carbohydrates: 53,
//     calories: 420,
//     price: 1255,
//     image: 'https://code.s3.yandex.net/react/code/bun-02.png',
//     image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
//     image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
//     __v: 0,
// },
// constructorIngredients: [
//   {
//     uniqueId: 'asdsadasjhfapiuhf',
//     _id: '643d69a5c3f7b9001cfa094a',
//     name: 'Сыр с астероидной плесенью',
//     type: 'main',
//     proteins: 84,
//     fat: 48,
//     carbohydrates: 420,
//     calories: 3377,
//     price: 4142,
//     image: 'https://code.s3.yandex.net/react/code/cheese.png',
//     image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
//     image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
//     __v: 0,
//   },
//   {
//     uniqueId: 'asdsasadasddasjhfapiuhf',
//     _id: '643d69a5c3f7b9001cfa0943',
//     name: 'Соус фирменный Space Sauce',
//     type: 'sauce',
//     proteins: 50,
//     fat: 22,
//     carbohydrates: 11,
//     calories: 14,
//     price: 80,
//     image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
//     image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
//     image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
//     __v: 0,
//   },
// ],

type ActionTypes =
  typeof ADD_CONSTRUCTOR_INGREDIENT
  | typeof REMOVE_CONSTRUCTOR_INGREDIENT
  | typeof GET_CONSTRUCTOR_INGREDIENTS
  | typeof ADD_CONSTRUCTOR_BUN
  | typeof GET_CONSTRUCTOR_BUN
  | typeof REPLACE_CONSTRUCTOR_BUN;

export type ConstructorIngredientsAction = {
  type: ActionTypes;
  payload?: Ingredient | string;
};

// eslint-disable-next-line default-param-last
export const constructorReducer = (state: InitialConstructorStateType = initialState, action: ConstructorIngredientsAction) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.payload],
      };
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients.filter((el) => el._id !== action.payload)],
      };
    }
    case GET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients],
      };
    }
    case ADD_CONSTRUCTOR_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case REPLACE_CONSTRUCTOR_BUN: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case GET_CONSTRUCTOR_BUN: {
      return {
        ...state,
        bun: state.bun,
      };
    }
    default: {
      return state;
    }
  }
};
