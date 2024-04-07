import { Ingredient } from '../../types';

export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export function setIngredientDetails(ingredient: Ingredient) {
  return {
    type: SET_INGREDIENT_DETAILS,
    payload: ingredient,
  };
}

export function deleteIngredientDetails() {
  return {
    type: DELETE_INGREDIENT_DETAILS,
  };
}
