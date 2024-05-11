import { Dispatch } from 'react';
import { fetchWithRefresh, request } from '../../utils/api';
import { APIRoute } from '../../consts';
import { User } from '../../types';
import { UserAction } from '../reducers/user';

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
// выход из системы
export const FETCH_LOGOUT_REQUEST = 'FETCH_LOGOUT_REQUEST';
export const FETCH_LOGOUT_SUCCESS = 'FETCH_LOGOUT_SUCCESS';
export const FETCH_LOGOUT_FAILED = 'FETCH_LOGOUT_FAILED';

export function setAuthChecked(value: boolean) {
  return {
    type: SET_AUTH_CHECKED,
    payload: value,
  };
}

export const setUser = (user: User | null) => ({
  type: SET_USER,
  payload: user,
});

export function getUser() {
  const getUserOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') as string,
    },
  };

  // eslint-disable-next-line func-names
  return function (dispatch: Dispatch<UserAction>) {
    dispatch({
      type: FETCH_USER_REQUEST,
    });
    return fetchWithRefresh(APIRoute.getUser, getUserOptions)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FETCH_USER_SUCCESS,
            payload: res.user,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FETCH_USER_FAILED,
        });
      });
  };
}

export function checkUserAuth() {
  // eslint-disable-next-line func-names
  return function (dispatch: any) {
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

export function login(dataForLogin: { email: string, password: string }) {
  const loginOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataForLogin),
  };
  // eslint-disable-next-line func-names
  return function (dispatch: Dispatch<UserAction>) {
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

export function register(dataForRegister: { name: string, email: string, password: string }) {
  const registerOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataForRegister),
  };
  // eslint-disable-next-line func-names
  return function (dispatch: Dispatch<UserAction>) {
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

export function logout() {
  const logoutRequest = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  };
  // eslint-disable-next-line func-names
  return function (dispatch: Dispatch<UserAction>) {
    dispatch({
      type: FETCH_LOGOUT_REQUEST,
    });
    request(APIRoute.logout, logoutRequest)
      .then((res) => {
        if (res.success === true) {
          dispatch({
            type: FETCH_LOGOUT_SUCCESS,
          });
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dispatch(setUser(null));
        }
      })
      .catch((err) => {
        console.log('Ошибка выхода из системы: ', err);
        dispatch({
          type: FETCH_LOGOUT_FAILED,
        });
      });
  };
}
