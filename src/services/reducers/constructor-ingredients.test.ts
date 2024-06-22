import {
  ADD_CONSTRUCTOR_BUN,
  ADD_CONSTRUCTOR_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
} from '../actions/constructor-ingredients';
import { ConstructorIngredientsAction, constructorReducer, InitialConstructorStateType } from './constructor-ingredients';
import { MOCK_BUN_INGREDIENT, MOCK_NOT_BUN_INGREDIENT_1, MOCK_NOT_BUN_INGREDIENT_2 } from './mock/mockForTests';

describe('constructor reducer', () => {
  let initialState: InitialConstructorStateType = {
    bun: null,
    constructorIngredients: [],
    counters: {
      buns: {},
      ingredients: {},
    },
  };
  beforeEach(() => {
    initialState = {
      bun: null,
      constructorIngredients: [],
      counters: {
        buns: {},
        ingredients: {},
      },
    };
  });

  it('should return initial state', () => {
    const unknownAction = 'UNKNOWN_ACTION' as unknown as ConstructorIngredientsAction;
    expect(constructorReducer(undefined, unknownAction)).toEqual(initialState);
  });

  it('should add bun ingredient after ADD_CONSTRUCTOR_BUN action', () => {
    const action: ConstructorIngredientsAction = {
      type: ADD_CONSTRUCTOR_BUN,
      payload: MOCK_BUN_INGREDIENT,
    };

    const expectedState = {
      bun: MOCK_BUN_INGREDIENT,
      constructorIngredients: [],
      counters: {
        buns: {
          '643d69a5c3f7b9001cfa093d': 2,
        },
        ingredients: {},
      },
    };

    const resultingState = constructorReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should add not bun ingredient after ADD_CONSTRUCTOR_INGREDIENT action', () => {
    const action: ConstructorIngredientsAction = {
      type: ADD_CONSTRUCTOR_INGREDIENT,
      payload: MOCK_NOT_BUN_INGREDIENT_1,
    };

    const expectedState = {
      bun: null,
      constructorIngredients: [MOCK_NOT_BUN_INGREDIENT_1],
      counters: {
        buns: {},
        ingredients: {
          '643d69a5c3f7b9001cfa0941': 1,
        },
      },
    };

    const resultingState = constructorReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should replace dragged not bun ingredient after MOVE_CONSTRUCTOR_INGREDIENT action', () => {
    // Добавляем два разных ингредиента (не булки) в начальное состояние
    initialState = {
      bun: null,
      constructorIngredients: [MOCK_NOT_BUN_INGREDIENT_1, MOCK_NOT_BUN_INGREDIENT_2],
      counters: {
        buns: {},
        ingredients: {
          '643d69a5c3f7b9001cfa0941': 1,
          '643d69a5c3f7b9001cfa0943': 1,
        },
      },
    };

    const action: ConstructorIngredientsAction = {
      type: MOVE_CONSTRUCTOR_INGREDIENT,
      payload: { dragIndex: 1, hoverIndex: 0 },
    };

    const resultingState = constructorReducer(initialState, action);

    const expectedState = {
      bun: null,
      constructorIngredients: [MOCK_NOT_BUN_INGREDIENT_2, MOCK_NOT_BUN_INGREDIENT_1],
      counters: {
        buns: {},
        ingredients: {
          '643d69a5c3f7b9001cfa0941': 1,
          '643d69a5c3f7b9001cfa0943': 1,
        },
      },
    };

    expect(resultingState).toEqual(expectedState);
  });

  it('should remove not bun ingredient after cart icon click (REMOVE_CONSTRUCTOR_INGREDIENT action)', () => {
    initialState = {
      bun: null,
      constructorIngredients: [MOCK_NOT_BUN_INGREDIENT_1, MOCK_NOT_BUN_INGREDIENT_2],
      counters: {
        buns: {},
        ingredients: {
          '643d69a5c3f7b9001cfa0941': 1,
          '643d69a5c3f7b9001cfa0943': 1,
        },
      },
    };

    const action: ConstructorIngredientsAction = {
      type: REMOVE_CONSTRUCTOR_INGREDIENT,
      payload: MOCK_NOT_BUN_INGREDIENT_1,
    };

    const resultingState = constructorReducer(initialState, action);

    const expectedState = {
      bun: null,
      constructorIngredients: [MOCK_NOT_BUN_INGREDIENT_2],
      counters: {
        buns: {},
        ingredients: {
          '643d69a5c3f7b9001cfa0943': 1,
        },
      },
    };

    expect(resultingState).toEqual(expectedState);
  });

  it('should delete all ingredients from state (CLEAR_CONSTRUCTOR action)', () => {
    initialState = {
      bun: MOCK_BUN_INGREDIENT,
      constructorIngredients: [MOCK_NOT_BUN_INGREDIENT_1, MOCK_NOT_BUN_INGREDIENT_2],
      counters: {
        buns: {
          '643d69a5c3f7b9001cfa093d': 2,
        },
        ingredients: {
          '643d69a5c3f7b9001cfa0941': 1,
          '643d69a5c3f7b9001cfa0943': 1,
        },
      },
    };

    const action: ConstructorIngredientsAction = {
      type: CLEAR_CONSTRUCTOR,
    };

    const resultingState = constructorReducer(initialState, action);

    const expectedState = {
      bun: null,
      constructorIngredients: [],
      counters: {
        buns: {},
        ingredients: {},
      },
    };

    expect(resultingState).toEqual(expectedState);
  });
});
