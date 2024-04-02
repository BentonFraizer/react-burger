import { Ingredient } from '../../types';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_INGREDIENT';
export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const REMOVE_CONSTRUCTOR_BUN = 'REMOVE_CONSTRUCTOR_BUN';
export const GET_CONSTRUCTOR_BUN = 'GET_CONSTRUCTOR_BUN';

export function addConstructorIngredient(ingredient: Ingredient) {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    payload: ingredient,
  };
}

export function removeConstructorIngredient(ingredientId: string) {
  return {
    type: REMOVE_CONSTRUCTOR_INGREDIENT,
    payload: ingredientId,
  };
}

export function getConstructorIngredients() {
  return {
    type: GET_CONSTRUCTOR_INGREDIENTS,
  };
}

export function addConstructorBun(bun: Ingredient) {
  return {
    type: ADD_CONSTRUCTOR_BUN,
    payload: bun,
  };
}

export function removeConstructorBun(bunId: string) {
  return {
    type: REMOVE_CONSTRUCTOR_BUN,
    payload: bunId,
  };
}

export function getConstructorBun() {
  return {
    type: GET_CONSTRUCTOR_BUN,
  };
}
