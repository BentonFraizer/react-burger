import { request } from '../../utils/api';
import { APIRoute } from '../../consts';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_USER = 'SET_USER';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

export function setAuthChecked(value) {
  return {
    type: SET_AUTH_CHECKED,
    payload: value,
  };
}

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export function getUser() {
  const getUserOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch({
      type: FETCH_USER_REQUEST,
    });
    return request(APIRoute.getUser, getUserOptions)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FETCH_USER_SUCCESS,
            payload: res.user,
          });
        }
      });
    // .catch((e) => {
    //   console.log(e);
    //   dispatch({
    //     type: FETCH_USER_FAILED,
    //   });
    // });
  };
}

export function checkUserAuth() {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch({
            type: FETCH_USER_FAILED,
          });
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
}
