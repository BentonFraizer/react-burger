import {
  USER_ORDERS_CONNECTION_CLOSE,
  USER_ORDERS_CONNECTION_CLOSED,
  USER_ORDERS_CONNECTION_ERROR,
  USER_ORDERS_CONNECTION_INIT,
  USER_ORDERS_CONNECTION_SUCCESS,
  USER_ORDERS_GET_MESSAGE,
  USER_ORDERS_SEND_MESSAGE,
} from '../actions/ws-user-orders';
import { AllOrdersResponse, Order } from '../../types';

export type InitialUserOrdersStateType = {
  userOrders: Order[],
  total: number,
  totalToday: number,
  connectionState: 'connecting' | 'opened' | 'disconnecting' | 'closed'
  error: string,
};

const initialState: InitialUserOrdersStateType = {
  userOrders: [],
  total: 0,
  totalToday: 0,
  connectionState: 'closed',
  error: '',
};

type ActionTypes =
  typeof USER_ORDERS_CONNECTION_INIT
  | typeof USER_ORDERS_CONNECTION_SUCCESS
  | typeof USER_ORDERS_CONNECTION_CLOSE
  | typeof USER_ORDERS_CONNECTION_CLOSED
  | typeof USER_ORDERS_GET_MESSAGE
  | typeof USER_ORDERS_SEND_MESSAGE
  | typeof USER_ORDERS_CONNECTION_ERROR;

export type WSUserOrdersAction = {
  type: ActionTypes;
  payload?: AllOrdersResponse | string;
}

// eslint-disable-next-line default-param-last
export const userOrdersReducer = (state: InitialUserOrdersStateType = initialState, action: WSUserOrdersAction) => {
  switch (action.type) {
    case USER_ORDERS_CONNECTION_INIT: {
      return {
        ...state,
        connectionState: 'connecting',
      };
    }
    case USER_ORDERS_CONNECTION_CLOSE: {
      return {
        ...state,
        connectionState: 'disconnecting',
        error: '',
      };
    }
    case USER_ORDERS_SEND_MESSAGE: {
      return {
        ...state,
        // оставил для примера и дальнейшего использования в работе
      };
    }
    case USER_ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        connectionState: 'opened',
      };
    }
    case USER_ORDERS_GET_MESSAGE: {
      return {
        ...state,
        userOrders: (action.payload as AllOrdersResponse).orders.reverse(),
        total: (action.payload as AllOrdersResponse).total,
        totalToday: (action.payload as AllOrdersResponse).totalToday,
      };
    }
    case USER_ORDERS_CONNECTION_CLOSED: {
      return {
        ...state,
        userOrders: [],
        total: 0,
        totalToday: 0,
        connectionState: 'closed',
        error: '',
      };
    }
    case USER_ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        error: 'WebSocket "/profile/orders" route error'
      };
    }

    default: {
      return state;
    }
  }
};
