import { Ingredient, UniqueIdIngredient } from '../../types';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const REMOVE_CONSTRUCTOR_INGREDIENT = 'REMOVE_CONSTRUCTOR_INGREDIENT';
export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const GET_CONSTRUCTOR_BUN = 'GET_CONSTRUCTOR_BUN';
export const MOVE_CONSTRUCTOR_INGREDIENT = 'MOVE_CONSTRUCTOR_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

// прошу проверяющего разработчика сориентировать каким образом корректно вывести типы для action,
// чтобы по всему коду не пришлось использовать инструкцию @ts-ignore
export function addConstructorIngredient(ingredient: UniqueIdIngredient, uniqueId: string) {
  return {
    type: ADD_CONSTRUCTOR_INGREDIENT,
    payload: { ...ingredient, uniqueId },
  };
}

export function removeConstructorIngredient(ingredient: UniqueIdIngredient) {
  return {
    type: REMOVE_CONSTRUCTOR_INGREDIENT,
    payload: ingredient,
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

export function moveConstructorIngredient(dragIndex: string, hoverIndex: string) {
  return {
    type: MOVE_CONSTRUCTOR_INGREDIENT,
    payload: { dragIndex, hoverIndex },
  };
}

export function clearConstructor() {
  return {
    type: CLEAR_CONSTRUCTOR,
  };
}
