import {
  ADD_CONSTRUCTOR_BUN,
  ADD_CONSTRUCTOR_INGREDIENT,
  GET_CONSTRUCTOR_BUN,
  GET_CONSTRUCTOR_INGREDIENTS,
  MOVE_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  CLEAR_CONSTRUCTOR,
} from '../actions/constructor-ingredients';
import { Ingredient, UniqueIdIngredient } from '../../types';

type InitialConstructorStateType = {
  bun: Ingredient | null,
  constructorIngredients: UniqueIdIngredient[] | [],
  counters: {
    buns: Record<string, number>,
    ingredients: Record<string, number>,
  };
}

const initialState: InitialConstructorStateType = {
  bun: null,
  constructorIngredients: [],
  counters: {
    buns: {},
    ingredients: {},
  },
};

type ActionTypes =
  typeof ADD_CONSTRUCTOR_INGREDIENT
  | typeof REMOVE_CONSTRUCTOR_INGREDIENT
  | typeof GET_CONSTRUCTOR_INGREDIENTS
  | typeof ADD_CONSTRUCTOR_BUN
  | typeof GET_CONSTRUCTOR_BUN
  | typeof MOVE_CONSTRUCTOR_INGREDIENT
  | typeof CLEAR_CONSTRUCTOR

type Indexes = {
  dragIndex: number,
  hoverIndex: number
}

export type ConstructorIngredientsAction = {
  type: ActionTypes;
  payload?: Ingredient | UniqueIdIngredient | Indexes;
};

// eslint-disable-next-line default-param-last
export const constructorReducer = (state: InitialConstructorStateType = initialState, action: ConstructorIngredientsAction) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGREDIENT: {
      const ingredient = action.payload as UniqueIdIngredient;
      const { _id } = ingredient;

      // Обновляем счетчики ингредиентов
      const updatedIngredientsCounters = {
        ...state.counters.ingredients,
        [_id]: (state.counters.ingredients[_id] || 0) + 1,
      };

      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, ingredient],
        counters: {
          ...state.counters,
          ingredients: updatedIngredientsCounters,
        },
      };
    }
    case REMOVE_CONSTRUCTOR_INGREDIENT: {
      const ingredient = action.payload as UniqueIdIngredient;
      const { _id } = ingredient;

      if (state.counters.ingredients[_id]) {
        // Уменьшаем счетчик на 1
        const updatedIngredientsCounters = {
          ...state.counters.ingredients,
          [_id]: state.counters.ingredients[_id] - 1,
        };

        // Если счетчик стал равен нулю, удаляем его из счетчиков
        if (updatedIngredientsCounters[_id] === 0) {
          delete updatedIngredientsCounters[_id];
        }

        return {
          ...state,
          constructorIngredients: state.constructorIngredients.filter((item) => item.uniqueId !== ingredient.uniqueId),
          counters: {
            ...state.counters,
            ingredients: updatedIngredientsCounters,
          },
        };
      }

      return state;
    }
    case GET_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients],
      };
    }
    case ADD_CONSTRUCTOR_BUN: {
      const ingredient = action.payload as UniqueIdIngredient;
      const { _id } = ingredient;

      return {
        ...state,
        bun: ingredient,
        counters: {
          ...state.counters,
          buns: { [_id]: 2 },
        },
      };
    }
    case GET_CONSTRUCTOR_BUN: {
      return {
        ...state,
        bun: state.bun,
      };
    }
    case MOVE_CONSTRUCTOR_INGREDIENT: {
      const { dragIndex, hoverIndex } = action.payload as Indexes;

      const dragCard = state.constructorIngredients[dragIndex];
      const newCards = [...state.constructorIngredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      return {
        ...state,
        constructorIngredients: newCards,
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        bun: null,
        constructorIngredients: [],
        counters: {
          buns: {},
          ingredients: {},
        },
      };
    }
    default: {
      return state;
    }
  }
};
