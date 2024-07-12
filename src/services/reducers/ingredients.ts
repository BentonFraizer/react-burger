import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED,
} from '../actions/ingredients';
import Ingredient from '../../types/ingredient';

export type InitialIngredientsStateType = {
  ingredients: Ingredient[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
  ingredientsFailedMessage: string,
}

export const initialState: InitialIngredientsStateType = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsFailedMessage: '',
};

type ActionTypes = typeof FETCH_INGREDIENTS_REQUEST | typeof FETCH_INGREDIENTS_SUCCESS | typeof FETCH_INGREDIENTS_FAILED;

export type IngredientsAction = {
  type: ActionTypes;
  payload?: Ingredient[] | string;
};

// eslint-disable-next-line default-param-last
export const ingredientsReducer = (state:InitialIngredientsStateType = initialState, action:IngredientsAction) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case FETCH_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.payload,
        ingredientsFailed: false,
        ingredientsFailedMessage: '',
      };
    }
    case FETCH_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
        ingredientsFailedMessage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
