import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED
} from '../actions/ingredients';
import { IngredientsAction, ingredientsReducer, InitialIngredientsStateType } from './ingredients';
import { ALL_INGREDIENTS } from './mock/mockForTests';
import { Ingredient } from '../../types';

describe('ingredients reducer', () => {
  let initialState: InitialIngredientsStateType = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsFailedMessage: '',
  };

  beforeEach(() => {
    initialState = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsFailedMessage: '',
    };
  });

  it('should return initial state', () => {
    const unknownAction = 'UNKNOWN_ACTION' as unknown as IngredientsAction;
    expect(ingredientsReducer(undefined, unknownAction)).toEqual(initialState);
  });

  it('should set ingredientsRequest flag after FETCH_INGREDIENTS_REQUEST action', () => {
    const action: IngredientsAction = {
      type: FETCH_INGREDIENTS_REQUEST,
    };

    const expectedState = {
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
      ingredientsFailedMessage: '',
    };

    const resultingState = ingredientsReducer(initialState, action);
    expect(resultingState).toEqual(expectedState);
  });

  it('should got all ingredients after FETCH_INGREDIENTS_SUCCESS action', () => {
    const action: IngredientsAction = {
      type: FETCH_INGREDIENTS_SUCCESS,
      payload: ALL_INGREDIENTS as Ingredient[],
    };

    const expectedState = {
      ingredients: ALL_INGREDIENTS,
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsFailedMessage: '',
    };

    const resultingState = ingredientsReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set error flag after FETCH_INGREDIENTS_FAILED action', () => {
    const action:IngredientsAction = {
      type: FETCH_INGREDIENTS_FAILED,
      payload: 'Error happened.'
    };

    const expectedState = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: true,
      ingredientsFailedMessage: 'Error happened.',
    };

    const resultingState = ingredientsReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });
});
