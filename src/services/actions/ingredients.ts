import { request } from '../../utils/api';
import { APIRoute } from '../../consts';
import { AppDispatch } from '../types';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

export function getIngredients() {
  // eslint-disable-next-line func-names
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FETCH_INGREDIENTS_REQUEST,
    });
    request(APIRoute.ingredients).then((res) => {
      dispatch({
        type: FETCH_INGREDIENTS_SUCCESS,
        payload: res.data,
      });
    }).catch((e) => {
      console.log('Ошибка: ', e);
      dispatch({
        type: FETCH_INGREDIENTS_FAILED,
        payload: e,
      });
    });
  };
}
