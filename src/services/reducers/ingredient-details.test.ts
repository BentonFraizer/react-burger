import { SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../actions/ingredient-details';
import { IngredientDetailsAction, ingredientDetailsReducer, InitialIngredientDetailsStateType } from './ingredient-details';
import { MOCK_INGREDIENT } from './mock/mockForTests';

describe('ingredient details reducer', () => {
  let initialState: InitialIngredientDetailsStateType = {
    ingredientDetails: null,
  };
  beforeEach(() => {
    initialState = {
      ingredientDetails: null,
    };
  });

  it('should return initial state', () => {
    const unknownAction = 'UNKNOWN_ACTION' as unknown as IngredientDetailsAction;
    expect(ingredientDetailsReducer(undefined, unknownAction)).toEqual(initialState);
  });

  it('should set ingredient data after SET_INGREDIENT_DETAILS action', () => {
    const action: IngredientDetailsAction = {
      type: SET_INGREDIENT_DETAILS,
      payload: MOCK_INGREDIENT,
    };

    const expectedState = {
      ingredientDetails: MOCK_INGREDIENT,
    };

    const resultingState = ingredientDetailsReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should delete ingredient data after DELETE_INGREDIENT_DETAILS action', () => {
    initialState = {
      ingredientDetails: MOCK_INGREDIENT,
    };

    const action: IngredientDetailsAction = {
      type: DELETE_INGREDIENT_DETAILS,
    };

    const expectedState = {
      ingredientDetails: null,
    };

    const resultingState = ingredientDetailsReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });
});
