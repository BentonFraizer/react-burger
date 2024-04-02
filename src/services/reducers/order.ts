import {
  DELETE_ORDER_NUMBER,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
} from '../actions/order';

type InitialStateType = {
  orderNumber: null | string,
  orderRequest: boolean,
  orderFailed: boolean,
  identifiersForOrder: string[],
}

const initialState: InitialStateType = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  identifiersForOrder: [],
};

type ActionTypes =
  typeof GET_ORDER_NUMBER_REQUEST
  | typeof GET_ORDER_NUMBER_SUCCESS
  | typeof GET_ORDER_NUMBER_FAILED
  | typeof DELETE_ORDER_NUMBER;

export type OrderAction = {
  type: ActionTypes;
  payload?: string | string[];
};

// eslint-disable-next-line default-param-last
export const orderReducer = (state: InitialStateType = initialState, action: OrderAction) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderNumber: action.payload,
        orderFailed: false,
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case DELETE_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: null,
      };
    }

    default: {
      return state;
    }
  }
};
