import { Dispatch } from 'react';
import { APIRoute, BACKEND_URL } from '../../consts';
import { request } from '../../utils/utils';
import { OrderAction } from '../reducers/order';

export const FETCH_ORDER_NUMBER_REQUEST = 'FETCH_ORDER_NUMBER_REQUEST';
export const FETCH_ORDER_NUMBER_SUCCESS = 'FETCH_ORDER_NUMBER_SUCCESS';
export const FETCH_ORDER_NUMBER_FAILED = 'FETCH_ORDER_NUMBER_FAILED';
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

  // eslint-disable-next-line func-names
  return function (dispatch: Dispatch<OrderAction>) {
    dispatch({
      type: FETCH_ORDER_NUMBER_REQUEST,
    });
    request(orderNumberUrl, orderNumberOptions).then((res) => {
      if (res && res.success) {
        dispatch({
          type: FETCH_ORDER_NUMBER_SUCCESS,
          payload: res.order.number,
        });
      } else {
        dispatch({
          type: FETCH_ORDER_NUMBER_FAILED,
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
