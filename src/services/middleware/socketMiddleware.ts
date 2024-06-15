import type { Middleware } from 'redux';
import type { WSStoreFeedActions } from '../types';
import { refreshToken } from '../../utils/api';

type TWSStoreActions = WSStoreFeedActions;

const RECONNECT_PERIOD = 3000;

export const socketMiddlewareWithReconnect = (
  wsActions: TWSStoreActions,
  withTokenRefresh = false,
): Middleware => (store) => {
  const {
    wsInit,
    wsClose,
    wsSendMessage,
    onOpen,
    onClose,
    onError,
    onMessage,
  } = wsActions;
  let socket: WebSocket | null = null;
  let isConnected = false;
  let reconnectTimer = 0;
  let url = '';

  return (next) => (action) => {
    const { dispatch } = store;
    const type = typeof action === 'object' && action && 'type' in action ? action.type : undefined;
    const payload = typeof action === 'object' && action && 'payload' in action ? action.payload : undefined;

    if (type === wsInit) {
      url = payload as string;
      socket = new WebSocket(url);
      isConnected = true;
      socket.onopen = () => {
        dispatch({ type: onOpen });
      };

      socket.onerror = (event) => {
        dispatch({ type: onError, payload: event });
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);

        /*  Обновление токена  */
        if (
          withTokenRefresh && parsedData.message === 'Invalid or missing token'
        ) {
          refreshToken()
            .then((refreshData) => {
              const wssUrl = new URL(url);
              wssUrl.searchParams.set(
                'token',
                refreshData.accessToken.replace('Bearer ', ''),
              );
              dispatch({
                type: wsInit,
                payload: wssUrl,
              });
            })
            .catch((err: unknown) => {
              dispatch({ type: onError, payload: err });
            });

          dispatch({ type: wsClose });

          return;
        }

        dispatch({
          type: onMessage,
          payload: parsedData
        });
      };

      socket.onclose = () => {
        dispatch({ type: onClose });

        /* Реконнект при обрыве связи */
        if (isConnected) {
          reconnectTimer = window.setTimeout(() => {
            dispatch({
              type: wsInit,
              payload: url,
            });
          }, RECONNECT_PERIOD);
        }
      };
    }

    if (wsClose && type === wsClose && socket) {
      clearTimeout(reconnectTimer);
      isConnected = false;
      reconnectTimer = 0;
      socket.close();
    }

    if (wsSendMessage && type === wsSendMessage && socket) {
      socket.send(JSON.stringify(payload));
    }

    next(action);
  };
};
