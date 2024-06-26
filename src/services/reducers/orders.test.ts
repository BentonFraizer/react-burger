import { InitialOrdersStateType, OrderAction, orderReducer } from './order';
import {
  FETCH_ORDER_NUMBER_REQUEST,
  FETCH_ORDER_NUMBER_SUCCESS,
  FETCH_ORDER_NUMBER_FAILED,
  DELETE_ORDER_NUMBER,
} from '../actions/order';

describe('orders reducer', () => {
  let initialState: InitialOrdersStateType = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
    orderFailedMessage: '',
  };

  beforeEach(() => {
    initialState = {
      orderNumber: null,
      orderRequest: false,
      orderFailed: false,
      orderFailedMessage: '',
    };
  });

  it('should return initial state', () => {
    const unknownAction = 'UNKNOWN_ACTION' as unknown as OrderAction;
    expect(orderReducer(undefined, unknownAction)).toEqual(initialState);
  });

  it('should set orderRequest flag after FETCH_ORDER_NUMBER_REQUEST action', () => {
    const action: OrderAction = {
      type: FETCH_ORDER_NUMBER_REQUEST,
    };

    const expectedState = {
      orderNumber: null,
      orderRequest: true,
      orderFailed: false,
      orderFailedMessage: '',
    };

    const resultingState = orderReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set order number after FETCH_ORDER_NUMBER_SUCCESS action', () => {
    const ORDER_NUMBER = '228';
    const action: OrderAction = {
      type: FETCH_ORDER_NUMBER_SUCCESS,
      payload: ORDER_NUMBER,
    };

    const expectedState = {
      orderNumber: ORDER_NUMBER,
      orderRequest: false,
      orderFailed: false,
      orderFailedMessage: '',
    };

    const resultingState = orderReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set failed flag after FETCH_ORDER_NUMBER_FAILED action', () => {
    const ERROR_MESSAGE = 'Some error';
    const action: OrderAction = {
      type: FETCH_ORDER_NUMBER_FAILED,
      payload: ERROR_MESSAGE,
    };

    const expectedState = {
      orderNumber: null,
      orderRequest: false,
      orderFailed: true,
      orderFailedMessage: ERROR_MESSAGE,
    };

    const resultingState = orderReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should delete order number after DELETE_ORDER_NUMBER action', () => {
    const ORDER_NUMBER = '322';
    const action: OrderAction = {
      type: DELETE_ORDER_NUMBER,
    };

    initialState = {
      orderNumber: ORDER_NUMBER,
      orderRequest: false,
      orderFailed: false,
      orderFailedMessage: '',
    };

    const expectedState = {
      orderNumber: null,
      orderRequest: false,
      orderFailed: false,
      orderFailedMessage: '',
    };

    const resultingState = orderReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });
});
