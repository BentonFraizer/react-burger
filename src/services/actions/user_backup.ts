import { Dispatch } from 'react';
import { User } from '../../types';
import { UserAction } from '../reducers/user';
import { request } from '../../utils/api';
import { APIRoute } from '../../consts';

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const SET_USER = 'SET_USER';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

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
    },
  };

  // eslint-disable-next-line func-names
  return function (dispatch: Dispatch<UserAction>) {
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
    //     payload: e,
    //   });
    // });
  };
}

// export function checkUserAuth() {
//   // eslint-disable-next-line func-names
//   return function (dispatch: Dispatch<Promise<any>>) {
//     if (!localStorage.getItem('accessToken')) {
//       dispatch(getUser())
//         .then((res) => {
//           console.log('-->', res);
//         })
//         .catch(() => {
//           localStorage.removeItem('accessToken');
//           localStorage.removeItem('refreshToken');
//           dispatch(setUser(null));
//           console.log(1);
//         })
//         .finally(() => dispatch(setAuthChecked(true)));
//     } else {
//       console.log(2);
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       dispatch(setAuthChecked(true));
//     }
//   };
// }

export default {};
