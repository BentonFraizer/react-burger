import {
  DELETE_ORDER_NUMBER,
  FETCH_ORDER_NUMBER_FAILED,
  FETCH_ORDER_NUMBER_REQUEST,
  FETCH_ORDER_NUMBER_SUCCESS,
} from '../actions/order';

export type InitialOrdersStateType = {
  orderNumber: null | string,
  orderRequest: boolean,
  orderFailed: boolean,
  orderFailedMessage: string,
}

const initialState: InitialOrdersStateType = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderFailedMessage: '',
};

type ActionTypes =
  typeof FETCH_ORDER_NUMBER_REQUEST
  | typeof FETCH_ORDER_NUMBER_SUCCESS
  | typeof FETCH_ORDER_NUMBER_FAILED
  | typeof DELETE_ORDER_NUMBER;

export type OrderAction = {
  type: ActionTypes | string;
  payload?: string | string[];
};

// eslint-disable-next-line default-param-last
export const orderReducer = (state: InitialOrdersStateType = initialState, action: OrderAction) => {
  switch (action.type) {
    case FETCH_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case FETCH_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderNumber: action.payload,
        orderFailed: false,
        orderFailedMessage: '',
      };
    }
    case FETCH_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        orderFailedMessage: action.payload,
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
