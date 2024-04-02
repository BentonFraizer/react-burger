import { Dispatch } from 'react';
import { APIRoute, BACKEND_URL } from '../../consts';
import { request } from '../../utils/utils';
import { OrderAction } from '../reducers/order';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

const orderNumberUrl = `${BACKEND_URL}/${APIRoute.orders}`;

export function getOrderNumber(identifiersForOrder:string[]) {
  const orderNumberOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: identifiersForOrder }),
  };

  return function(dispatch: Dispatch<OrderAction>) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });
    request(orderNumberUrl, orderNumberOptions).then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          payload: res.order.number,
        });
      } else {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        });
      }
    });
  };
}

export function deleteOrderNumber() {
  return {
    type: DELETE_ORDER_NUMBER,
  };
}
