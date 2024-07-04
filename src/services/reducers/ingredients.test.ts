import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED
} from '../actions/ingredients';
import { initialState, IngredientsAction, ingredientsReducer } from './ingredients';
import { ALL_INGREDIENTS } from './mock/mockForTests';
import { Ingredient } from '../../types';

describe('ingredients reducer', () => {
  let localInitialState = initialState;

  beforeEach(() => {
    localInitialState = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredientsFailedMessage: '',
    };
  });

  it('should return initial state', () => {
    const unknownAction = 'UNKNOWN_ACTION' as unknown as IngredientsAction;
    expect(ingredientsReducer(undefined, unknownAction)).toEqual(localInitialState);
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

    const resultingState = ingredientsReducer(localInitialState, action);
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

    const resultingState = ingredientsReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set error flag after FETCH_INGREDIENTS_FAILED action', () => {
    const ERROR_MESSAGE = 'Error happened.';
    const action:IngredientsAction = {
      type: FETCH_INGREDIENTS_FAILED,
      payload: ERROR_MESSAGE
    };

    const expectedState = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: true,
      ingredientsFailedMessage: ERROR_MESSAGE,
    };

    const resultingState = ingredientsReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });
});
