import { request } from '../../utils/api';
import { APIRoute } from '../../consts';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_USER = 'SET_USER';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';
// авторизация
export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILED = 'FETCH_LOGIN_FAILED';
// регистрация
export const FETCH_REGISTER_REQUEST = 'FETCH_REGISTER_REQUEST';
export const FETCH_REGISTER_SUCCESS = 'FETCH_REGISTER_SUCCESS';
export const FETCH_REGISTER_FAILED = 'FETCH_REGISTER_FAILED';

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

export function login(dataForLogin) {
  const loginOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataForLogin),
  };
  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch({
      type: FETCH_LOGIN_REQUEST,
    });
    return request(APIRoute.login, loginOptions)
      .then((data) => {
        dispatch({
          type: FETCH_LOGIN_SUCCESS,
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(setUser(data.user));
      })
      .catch((err) => {
        console.log('Ошибка авторизации: ', err);
        dispatch({
          type: FETCH_LOGIN_FAILED,
        });
      });
  };
}

export function register(dataForRegister) {
  const registerOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataForRegister),
  };
  // eslint-disable-next-line func-names
  return function (dispatch) {
    dispatch({
      type: FETCH_REGISTER_REQUEST,
    });
    request(APIRoute.register, registerOptions)
      .then((data) => {
        dispatch({
          type: FETCH_REGISTER_SUCCESS,
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(setUser(data.user));
      })
      .catch((err) => {
        console.log('Ошибка регистрации: ', err);
        dispatch({
          type: FETCH_REGISTER_FAILED,
        });
      });
  };
}
