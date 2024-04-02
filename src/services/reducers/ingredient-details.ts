import { SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../actions/ingredient-details';
import Ingredient from '../../types/ingredient';

type InitialStateType = {
  ingredientDetails: null | Ingredient
}

const initialState: InitialStateType = {
  ingredientDetails: null,
};

type ActionTypes = typeof SET_INGREDIENT_DETAILS | typeof DELETE_INGREDIENT_DETAILS;

export type IngredientDetailsAction = {
  type: ActionTypes;
  payload?: Ingredient | null;
};

// eslint-disable-next-line default-param-last
export const ingredientDetailsReducer = (state: InitialStateType = initialState, action: IngredientDetailsAction) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload,
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: null,
      };
    }
    default: {
      return state;
    }
  }
};
