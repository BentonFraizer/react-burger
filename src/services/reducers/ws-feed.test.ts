import { initialState, feedReducer, WSFeedsAction } from './ws-feed';
import {
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_CLOSED,
  FEED_GET_MESSAGE,
} from '../actions/ws-feed';
import { ALL_ORDERS_RESPONSE } from './mock/mockForTests';
import { States } from '../../consts';

describe('feed reducer', () => {
  let localInitialState = initialState;

  beforeEach(() => {
    localInitialState = {
      allOrders: [],
      total: 0,
      totalToday: 0,
      connectionState: States.Closed,
      error: '',
      feedOrderNumber: null,
    };
  });

  it('should set connection state to "connecting" after FEED_CONNECTION_INIT action', () => {
    const action: WSFeedsAction = {
      type: FEED_CONNECTION_INIT,
    };

    const expectedState = {
      ...localInitialState,
      connectionState: States.Connecting,
    };

    const resultingState = feedReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set connection state to "opened" after FEED_CONNECTION_SUCCESS action', () => {
    const action: WSFeedsAction = {
      type: FEED_CONNECTION_SUCCESS,
    };

    const expectedState = {
      ...localInitialState,
      connectionState: States.Opened,
    };

    const resultingState = feedReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set error message after FEED_CONNECTION_ERROR action', () => {
    const ERROR_MESSAGE = 'WebSocket "/feed" route error';
    const action: WSFeedsAction = {
      type: FEED_CONNECTION_ERROR,
    };

    const expectedState = {
      ...localInitialState,
      error: ERROR_MESSAGE,
    };

    const resultingState = feedReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set connection state to "disconnecting" after FEED_CONNECTION_CLOSE action', () => {
    const action: WSFeedsAction = {
      type: FEED_CONNECTION_CLOSE,
    };

    const expectedState = {
      ...localInitialState,
      connectionState: States.Disconnecting
    };

    const resultingState = feedReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should reset state after FEED_CONNECTION_CLOSED action', () => {
    const action: WSFeedsAction = {
      type: FEED_CONNECTION_CLOSED,
    };

    localInitialState = {
      ...localInitialState,
      allOrders: ALL_ORDERS_RESPONSE.orders,
      total: ALL_ORDERS_RESPONSE.total,
      totalToday: ALL_ORDERS_RESPONSE.totalToday,
      connectionState: States.Disconnecting,
    };

    const expectedState = {
      allOrders: [],
      total: 0,
      totalToday: 0,
      connectionState: States.Closed,
      error: '',
      feedOrderNumber: null,
    };

    const resultingState = feedReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set all data after FEED_GET_MESSAGE action', () => {
    const action: WSFeedsAction = {
      type: FEED_GET_MESSAGE,
      payload: ALL_ORDERS_RESPONSE,
    };

    const expectedState = {
      ...localInitialState,
      allOrders: ALL_ORDERS_RESPONSE.orders,
      total: ALL_ORDERS_RESPONSE.total,
      totalToday: ALL_ORDERS_RESPONSE.totalToday,
    };

    const resultingState = feedReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });
});
