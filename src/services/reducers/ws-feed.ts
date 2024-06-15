import {
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE,
  FEED_SEND_MESSAGE
} from '../actions/ws-feed';
import { AllOrdersResponse } from '../../types';

type InitialStateType = {
  allOrders: AllOrdersResponse[],
  total: number,
  totalToday: number,
  connectionState: 'connecting' | 'opened' | 'disconnecting' | 'closed'
  error: string,
  feedOrderNumber: null | string;
}

const initialState: InitialStateType = {
  allOrders: [],
  total: 0,
  totalToday: 0,
  connectionState: 'closed',
  error: '',
  feedOrderNumber: null
};

type ActionTypes =
  typeof FEED_CONNECTION_INIT
  | typeof FEED_CONNECTION_SUCCESS
  | typeof FEED_CONNECTION_CLOSE
  | typeof FEED_CONNECTION_CLOSED
  | typeof FEED_GET_MESSAGE
  | typeof FEED_SEND_MESSAGE
  | typeof FEED_CONNECTION_ERROR;

export type WSFeedsAction = {
  type: ActionTypes;
  payload?: AllOrdersResponse | string;
};

// eslint-disable-next-line default-param-last
export const feedReducer = (state: InitialStateType = initialState, action: WSFeedsAction) => {
  switch (action.type) {
    case FEED_CONNECTION_INIT: {
      return {
        ...state,
        connectionState: 'connecting',
      };
    }
    case FEED_CONNECTION_CLOSE: {
      return {
        ...state,
        connectionState: 'disconnecting',
        error: ''
      };
    }
    case FEED_SEND_MESSAGE: {
      return {
        ...state,
        // оставил для примера и дальнейшего использования в работе
      };
    }
    case FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        connectionState: 'opened',
      };
    }
    case FEED_GET_MESSAGE: {
      return {
        ...state,
        allOrders: (action.payload as AllOrdersResponse).orders,
        total: (action.payload as AllOrdersResponse).total,
        totalToday: (action.payload as AllOrdersResponse).totalToday,
      };
    }
    case FEED_CONNECTION_CLOSED: {
      return {
        ...state,
        allOrders: [],
        total: 0,
        totalToday: 0,
        connectionState: 'closed',
        error: '',
      };
    }
    case FEED_CONNECTION_ERROR: {
      return {
        ...state,
        error: 'WebSocket "/feed" route error'
      };
    }

    default: {
      return state;
    }
  }
};
