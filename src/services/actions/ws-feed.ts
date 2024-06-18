import { AppDispatch } from '../types';
import { wsFeedUrl } from '../../consts';

// для создания объекта класса WebSocket
export const FEED_CONNECTION_INIT = 'FEED_CONNECTION_INIT';

// при успешном соединении
export const FEED_CONNECTION_SUCCESS = 'FEED_CONNECTION_SUCCESS';

// в случае ошибки соединения
export const FEED_CONNECTION_ERROR = 'FEED_CONNECTION_ERROR';

// для инициализации закрытия соединения
export const FEED_CONNECTION_CLOSE = 'FEED_CONNECTION_CLOSE';

// после закрытия соединения
export const FEED_CONNECTION_CLOSED = 'FEED_CONNECTION_CLOSED';

// при получении сообщения от сервера
export const FEED_GET_MESSAGE = 'FEED_GET_MESSAGE';

// для отправки сообщений на сервер
export const FEED_SEND_MESSAGE = 'FEED_SEND_MESSAGE';

// Инициализация открытия ws соединения
export function wsFeedInit() {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FEED_CONNECTION_INIT, payload: wsFeedUrl });
  };
}

// Инициализация закрытия ws соединения
export function wsFeedClose() {
  return (dispatch: AppDispatch) => {
    dispatch({ type: FEED_CONNECTION_CLOSE });
  };
}
