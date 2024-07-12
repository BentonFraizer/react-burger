import { SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../actions/ingredient-details';
import { initialState, IngredientDetailsAction, ingredientDetailsReducer } from './ingredient-details';
import { MOCK_INGREDIENT } from './mock/mockForTests';

describe('ingredient details reducer', () => {
  let localInitialState = initialState;

  beforeEach(() => {
    localInitialState = {
      ingredientDetails: null,
    };
  });

  it('should return initial state', () => {
    const unknownAction = 'UNKNOWN_ACTION' as unknown as IngredientDetailsAction;
    expect(ingredientDetailsReducer(undefined, unknownAction)).toEqual(localInitialState);
  });

  it('should set ingredient data after SET_INGREDIENT_DETAILS action', () => {
    const action: IngredientDetailsAction = {
      type: SET_INGREDIENT_DETAILS,
      payload: MOCK_INGREDIENT,
    };

    const expectedState = {
      ingredientDetails: MOCK_INGREDIENT,
    };

    const resultingState = ingredientDetailsReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should delete ingredient data after DELETE_INGREDIENT_DETAILS action', () => {
    localInitialState = {
      ingredientDetails: MOCK_INGREDIENT,
    };

    const action: IngredientDetailsAction = {
      type: DELETE_INGREDIENT_DETAILS,
    };

    const expectedState = {
      ingredientDetails: null,
    };

    const resultingState = ingredientDetailsReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });
});
