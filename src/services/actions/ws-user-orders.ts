// для создания объекта класса WebSocket
import { AppDispatch } from '../types';
import { wsUserOrdersUrl } from '../../consts';

const accessToken = localStorage.getItem('accessToken');

export const USER_ORDERS_CONNECTION_INIT = 'USER_ORDERS_CONNECTION_INIT';

// при успешном соединении
export const USER_ORDERS_CONNECTION_SUCCESS = 'USER_ORDERS_CONNECTION_SUCCESS';

// в случае ошибки соединения
export const USER_ORDERS_CONNECTION_ERROR = 'USER_ORDERS_CONNECTION_ERROR';

// для инициализации закрытия соединения
export const USER_ORDERS_CONNECTION_CLOSE = 'USER_ORDERS_CONNECTION_CLOSE';

// после закрытия соединения
export const USER_ORDERS_CONNECTION_CLOSED = 'USER_ORDERS_CONNECTION_CLOSED';

// при получении сообщения от сервера
export const USER_ORDERS_GET_MESSAGE = 'USER_ORDERS_GET_MESSAGE';

// для отправки сообщений на сервер
export const USER_ORDERS_SEND_MESSAGE = 'USER_ORDERS_SEND_MESSAGE';

const accessTokenWithoutBearer = accessToken?.replace('Bearer ', '');

// Инициализация открытия ws соединения
export function wsUserOrdersInit() {
  return (dispatch: AppDispatch) => {
    dispatch({ type: USER_ORDERS_CONNECTION_INIT, payload: `${wsUserOrdersUrl}?token=${accessTokenWithoutBearer}` });
  };
}

// Инициализация закрытия ws соединения
export function wsUserOrdersClose() {
  return (dispatch: AppDispatch) => {
    dispatch({ type: USER_ORDERS_CONNECTION_CLOSE });
  };
}
