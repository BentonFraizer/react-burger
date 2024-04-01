import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/ingredients';
import Ingredient from '../../types/ingredient';

type InitialStateType = {
  ingredients: Ingredient[],
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
}

const initialState: InitialStateType = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

type ActionTypes = typeof GET_INGREDIENTS_REQUEST | typeof GET_INGREDIENTS_SUCCESS | typeof GET_INGREDIENTS_FAILED;

export type IngredientsAction = {
  type: ActionTypes;
  payload?: Ingredient[];
};

// eslint-disable-next-line default-param-last
export const ingredientsReducer = (state:InitialStateType = initialState, action:IngredientsAction) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.payload,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
