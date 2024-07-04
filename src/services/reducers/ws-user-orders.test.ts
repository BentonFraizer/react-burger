import { initialState, userOrdersReducer, WSUserOrdersAction } from './ws-user-orders';
import {
  USER_ORDERS_CONNECTION_INIT,
  USER_ORDERS_CONNECTION_SUCCESS,
  USER_ORDERS_CONNECTION_CLOSE,
  USER_ORDERS_CONNECTION_CLOSED,
  USER_ORDERS_CONNECTION_ERROR,
  USER_ORDERS_GET_MESSAGE
} from '../actions/ws-user-orders';
import { States } from '../../consts';
import { ALL_ORDERS_RESPONSE } from './mock/mockForTests';

describe('user orders reducer', () => {
  let localInitialState = initialState;

  beforeEach(() => {
    localInitialState = {
      userOrders: [],
      total: 0,
      totalToday: 0,
      connectionState: States.Closed,
      error: '',
    };
  });

  it('should set connection state to "connecting" after USER_ORDERS_CONNECTION_INIT action', () => {
    const action: WSUserOrdersAction = {
      type: USER_ORDERS_CONNECTION_INIT,
    };

    const expectedState = {
      ...localInitialState,
      connectionState: States.Connecting
    };

    const resultingState = userOrdersReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set connection state to "opened" after USER_ORDERS_CONNECTION_SUCCESS action', () => {
    const action: WSUserOrdersAction = {
      type: USER_ORDERS_CONNECTION_SUCCESS,
    };

    const expectedState = {
      ...localInitialState,
      connectionState: States.Opened
    };

    const resultingState = userOrdersReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set error message after USER_ORDERS_CONNECTION_ERROR action', () => {
    const ERROR_MESSAGE = 'WebSocket "/profile/orders" route error';
    const action: WSUserOrdersAction = {
      type: USER_ORDERS_CONNECTION_ERROR,
    };

    const expectedState = {
      ...localInitialState,
      error: ERROR_MESSAGE,
    };

    const resultingState = userOrdersReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set connection state to "disconnecting" after USER_ORDERS_CONNECTION_CLOSE action', () => {
    const action: WSUserOrdersAction = {
      type: USER_ORDERS_CONNECTION_CLOSE,
    };

    const expectedState = {
      ...localInitialState,
      connectionState: States.Disconnecting,
    };

    const resultingState = userOrdersReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should reset state after USER_ORDERS_CONNECTION_CLOSED action', () => {
    const action: WSUserOrdersAction = {
      type: USER_ORDERS_CONNECTION_CLOSED,
    };

    localInitialState = {
      ...localInitialState,
      total: ALL_ORDERS_RESPONSE.total,
      totalToday: ALL_ORDERS_RESPONSE.totalToday,
      userOrders: ALL_ORDERS_RESPONSE.orders,
      connectionState: States.Disconnecting
    };

    const expectedState = {
      ...localInitialState,
      connectionState: States.Closed,
      total: 0,
      totalToday: 0,
      userOrders: []
    };

    const resultingState = userOrdersReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set all data after USER_ORDERS_GET_MESSAGE action', () => {
    const action: WSUserOrdersAction = {
      type: USER_ORDERS_GET_MESSAGE,
      payload: ALL_ORDERS_RESPONSE,
    };

    const expectedState = {
      ...localInitialState,
      total: ALL_ORDERS_RESPONSE.total,
      totalToday: ALL_ORDERS_RESPONSE.totalToday,
      userOrders: ALL_ORDERS_RESPONSE.orders
    };

    const resultingState = userOrdersReducer(localInitialState, action);

    expect(resultingState).toEqual(expectedState);
  });
});
