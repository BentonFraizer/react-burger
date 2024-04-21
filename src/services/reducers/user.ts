import {
  FETCH_LOGIN_FAILED,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_REGISTER_FAILED,
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FETCH_USER_FAILED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  SET_AUTH_CHECKED,
  SET_USER,
} from '../actions/user';
import { User } from '../../types';

type InitialStateType = {
  user: User | null,
  userRequest: boolean,
  userFailed: boolean,
  isAuthChecked: boolean,
  loginRequest: boolean,
  loginFailed: boolean,
  registerRequest: boolean,
  registerFailed: boolean,
};

const initialState: InitialStateType = {
  user: null,
  userRequest: false,
  userFailed: false,
  isAuthChecked: false,
  loginRequest: false,
  loginFailed: false,
  registerRequest: false,
  registerFailed: false,
};

type ActionTypes =
  typeof SET_AUTH_CHECKED
  | typeof SET_USER
  | typeof FETCH_USER_REQUEST
  | typeof FETCH_USER_SUCCESS
  | typeof FETCH_USER_FAILED
  | typeof FETCH_LOGIN_REQUEST
  | typeof FETCH_LOGIN_SUCCESS
  | typeof FETCH_LOGIN_FAILED
  | typeof FETCH_REGISTER_REQUEST
  | typeof FETCH_REGISTER_SUCCESS
  | typeof FETCH_REGISTER_FAILED;

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
        userFailed: false,
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
    // login
    case FETCH_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case FETCH_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
      };
    }
    case FETCH_LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    // register
    case FETCH_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case FETCH_REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
      };
    }
    case FETCH_REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      };
    }

    default: {
      return state;
    }
  }
};
