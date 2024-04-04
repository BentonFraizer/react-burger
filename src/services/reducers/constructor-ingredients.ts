import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
  GET_CONSTRUCTOR_INGREDIENTS,
  ADD_CONSTRUCTOR_BUN,
  GET_CONSTRUCTOR_BUN,
  MOVE_CONSTRUCTOR_INGREDIENT,
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

export type ConstructorIngredientsAction = {
  type: ActionTypes;
  payload?: Ingredient | UniqueIdIngredient | string;
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { dragIndex, hoverIndex } = action.payload;

      const dragCard = state.constructorIngredients[dragIndex];
      const newCards = [state.constructorIngredients];
      newCards.splice(dragIndex, 1);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newCards.splice(hoverIndex, 0, dragCard);

      return {
        ...state,
        constructorIngredients: newCards,
      };
    }
    default: {
      return state;
    }
  }
};
