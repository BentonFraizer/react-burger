import { Ingredient, UniqueIdIngredient } from '../../types';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const GET_CONSTRUCTOR_BUN = 'GET_CONSTRUCTOR_BUN';

export function addConstructorIngredient(ingredient: UniqueIdIngredient, uniqueId:string) {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    payload: { ...ingredient, uniqueId },
  };
}

export function removeConstructorIngredient(uniqueIngredientId: string) {
  return {
    type: REMOVE_CONSTRUCTOR_INGREDIENT,
    payload: uniqueIngredientId,
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

export function getConstructorBun() {
  return {
    type: GET_CONSTRUCTOR_BUN,
  };
}
