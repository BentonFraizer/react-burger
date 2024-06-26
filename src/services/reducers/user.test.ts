import { InitialUserStateType, UserAction, userReducer } from './user';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_LOGIN_FAILED,
  FETCH_USER_FAILED,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGOUT_FAILED,
  FETCH_LOGOUT_REQUEST,
  FETCH_LOGOUT_SUCCESS,
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FETCH_REGISTER_FAILED,
  SET_AUTH_CHECKED,
  SET_USER
} from '../actions/user';
import { FAKE_USER } from './mock/mockForTests';

describe('user reducer', () => {
  let initialState: InitialUserStateType = {
    user: null,
    userRequest: false,
    userFailed: false,
    isAuthChecked: false,
    loginRequest: false,
    loginFailed: false,
    registerRequest: false,
    registerFailed: false,
    logoutRequest: false,
    logoutFailed: false,
  };

  beforeEach(() => {
    initialState = {
      user: null,
      userRequest: false,
      userFailed: false,
      isAuthChecked: false,
      loginRequest: false,
      loginFailed: false,
      registerRequest: false,
      registerFailed: false,
      logoutRequest: false,
      logoutFailed: false,
    };
  });

  it('should return initial state', () => {
    const unknownAction = 'UNKNOWN_ACTION' as unknown as UserAction;
    expect(userReducer(undefined, unknownAction)).toEqual(initialState);
  });

  it('should set user request flag after FETCH_USER_REQUEST action', () => {
    const action: UserAction = {
      type: FETCH_USER_REQUEST
    };

    const expectedState = {
      ...initialState,
      userRequest: true,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set user data after FETCH_USER_SUCCESS action', () => {
    const action: UserAction = {
      type: FETCH_USER_SUCCESS,
      payload: FAKE_USER,
    };

    const expectedState = {
      ...initialState,
      user: FAKE_USER,
      userRequest: false,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set user failed flag after FETCH_LOGIN_FAILED action', () => {
    const action: UserAction = {
      type: FETCH_USER_FAILED
    };

    const expectedState = {
      ...initialState,
      userFailed: true,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set login request flag after FETCH_LOGIN_REQUEST action', () => {
    const action: UserAction = {
      type: FETCH_LOGIN_REQUEST,
    };

    const expectedState = {
      ...initialState,
      loginRequest: true,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should reset login request after FETCH_LOGIN_SUCCESS action', () => {
    const action: UserAction = {
      type: FETCH_LOGIN_SUCCESS,
    };

    initialState = {
      ...initialState,
      loginRequest: true,
    };

    const expectedState = {
      ...initialState,
      loginRequest: false,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set login failed flag after FETCH_LOGIN_FAILED action', () => {
    const action: UserAction = {
      type: FETCH_LOGIN_FAILED,
    };

    initialState = {
      ...initialState,
      loginRequest: true,
      loginFailed: false,
    };

    const expectedState = {
      ...initialState,
      loginRequest: false,
      loginFailed: true,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set register request flag after FETCH_REGISTER_REQUEST action', () => {
    const action: UserAction = {
      type: FETCH_REGISTER_REQUEST,
    };

    const expectedState = {
      ...initialState,
      registerRequest: true,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should reset register request flag after FETCH_REGISTER_SUCCESS action', () => {
    const action: UserAction = {
      type: FETCH_REGISTER_SUCCESS,
    };

    initialState = {
      ...initialState,
      registerRequest: true,
    };

    const expectedState = {
      ...initialState,
      registerRequest: false,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set register failed flag after FETCH_REGISTER_FAILED action', () => {
    const action: UserAction = {
      type: FETCH_REGISTER_FAILED,
    };

    initialState = {
      ...initialState,
      registerRequest: true,
      registerFailed: false,
    };

    const expectedState = {
      ...initialState,
      registerRequest: false,
      registerFailed: true,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set logout request flag after FETCH_LOGOUT_REQUEST action', () => {
    const action: UserAction = {
      type: FETCH_LOGOUT_REQUEST,
    };

    const expectedState = {
      ...initialState,
      logoutRequest: true,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should reset logout request flag after FETCH_LOGOUT_SUCCESS action', () => {
    const action: UserAction = {
      type: FETCH_LOGOUT_SUCCESS,
    };

    initialState = {
      ...initialState,
      logoutRequest: true,
    };

    const expectedState = {
      ...initialState,
      logoutRequest: false,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set logout failed flag after FETCH_LOGOUT_FAILED action', () => {
    const action: UserAction = {
      type: FETCH_LOGOUT_FAILED,
    };

    const expectedState = {
      ...initialState,
      logoutFailed: true
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set auth checked flag after SET_AUTH_CHECKED action', () => {
    const action: UserAction = {
      type: SET_AUTH_CHECKED,
      payload: true,
    };

    const expectedState = {
      ...initialState,
      isAuthChecked: true
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });

  it('should set user data after SET_USER action', () => {
    const action: UserAction = {
      type: SET_USER,
      payload: FAKE_USER,
    };

    const expectedState = {
      ...initialState,
      user: FAKE_USER,
    };

    const resultingState = userReducer(initialState, action);

    expect(resultingState).toEqual(expectedState);
  });
});
