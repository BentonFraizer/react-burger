import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor-ingredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});
