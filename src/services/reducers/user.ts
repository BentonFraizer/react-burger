import { FETCH_USER_FAILED, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, SET_AUTH_CHECKED, SET_USER } from '../actions/user';
import { User } from '../../types';

type InitialStateType = {
  user: User | null,
  userRequest: boolean,
  userFailed: boolean,
  isAuthChecked: boolean,
};

const initialState: InitialStateType = {
  user: null,
  userRequest: false,
  userFailed: false,
  isAuthChecked: false,
};

type ActionTypes =
 typeof SET_AUTH_CHECKED
  | typeof SET_USER
  | typeof FETCH_USER_REQUEST
  | typeof FETCH_USER_SUCCESS
  | typeof FETCH_USER_FAILED;

export type UserAction = {
  type: ActionTypes;
  payload?: User | boolean | null;
};

// eslint-disable-next-line default-param-last
export const userReducer = (state: InitialStateType = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        user: action.payload,
        userFailed: false,
      };
    }
    case FETCH_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
