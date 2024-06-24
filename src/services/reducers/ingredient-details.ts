import { SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../actions/ingredient-details';
import Ingredient from '../../types/ingredient';

export type InitialIngredientDetailsStateType = {
  ingredientDetails: null | Ingredient
}

const initialState: InitialIngredientDetailsStateType = {
  ingredientDetails: null,
};

type ActionTypes = typeof SET_INGREDIENT_DETAILS | typeof DELETE_INGREDIENT_DETAILS;

export type IngredientDetailsAction = {
  type: ActionTypes;
  payload?: Ingredient | null;
};

export const ingredientDetailsReducer = (
  // eslint-disable-next-line default-param-last
  state: InitialIngredientDetailsStateType = initialState,
  action: IngredientDetailsAction
) => {
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
