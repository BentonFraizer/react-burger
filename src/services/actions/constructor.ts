import { Ingredient } from '../../types';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';

export function addIngredient(ingredient: Ingredient) {
  return {
    type: ADD_INGREDIENT,
    payload: ingredient,
  };
}

export function removeIngredient(ingredientId: string) {
  return {
    type: REMOVE_INGREDIENT,
    payload: ingredientId,
  };
}

export function getConstructorIngredients(ingredients: Ingredient[]) {
  return {
    type: GET_CONSTRUCTOR_INGREDIENTS,
    payload: ingredients,
  };
}
