import { Dispatch } from 'react';
import { request } from '../../utils/utils';
import { APIRoute, BACKEND_URL } from '../../consts';
import { IngredientsAction } from '../reducers/ingredients';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

const ingredientsUrl = `${BACKEND_URL}/${APIRoute.ingredients}`;

export function getIngredients() {
  // eslint-disable-next-line func-names
  return function (dispatch: Dispatch<IngredientsAction>) {
    dispatch({
      type: FETCH_INGREDIENTS_REQUEST,
    });
    request(ingredientsUrl).then((res) => {
      if (res && res.success) {
        dispatch({
          type: FETCH_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: FETCH_INGREDIENTS_FAILED,
        });
      }
    });
  };
}
