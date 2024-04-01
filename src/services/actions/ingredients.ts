import { Dispatch } from 'react';
import { request } from '../../utils/utils';
import { APIRoute, BACKEND_URL } from '../../consts';
import { IngredientsAction } from '../reducers/ingredients';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const ingredientsUrl = `${BACKEND_URL}/${APIRoute.ingredients}`;

export function getIngredients() {
  return function (dispatch: Dispatch<IngredientsAction>) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    request(ingredientsUrl).then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    });
  };
}
