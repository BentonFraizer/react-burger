import { Dispatch } from 'react';
import { APIRoute } from '../../consts';
import { request } from '../../utils/api';
import { OrderAction } from '../reducers/order';
import { clearConstructor } from './constructor-ingredients';

export const FETCH_ORDER_NUMBER_REQUEST = 'FETCH_ORDER_NUMBER_REQUEST';
export const FETCH_ORDER_NUMBER_SUCCESS = 'FETCH_ORDER_NUMBER_SUCCESS';
export const FETCH_ORDER_NUMBER_FAILED = 'FETCH_ORDER_NUMBER_FAILED';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

export function getOrderNumber(identifiersForOrder: string[]) {
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
    request(APIRoute.orders, orderNumberOptions).then((res) => {
      if (res && res.success) {
        dispatch({
          type: FETCH_ORDER_NUMBER_SUCCESS,
          payload: res.order.number,
        });
        dispatch(clearConstructor());
      }
    }).catch((e) => {
      console.log(e);
      dispatch({
        type: FETCH_ORDER_NUMBER_FAILED,
        payload: e,
      });
    });
  };
}

export function deleteOrderNumber() {
  return {
    type: DELETE_ORDER_NUMBER,
  };
}
