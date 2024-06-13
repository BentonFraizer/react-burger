import type { Dispatch, Middleware, MiddlewareAPI } from 'redux';

import type {
  AppActions,
  // AppActions,
  // TWSStoreActions,
  // IMessage,
  AppDispatch,
  RootState,
  WSStoreFeedActions,
  // IMessageResponse
} from '../types';
import type { Order } from '../../types';
import { refreshToken } from '../../utils/api';

type TWSStoreActions = WSStoreFeedActions;

// eslint-disable-next-line arrow-body-style
// export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
//   return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
//     let socket: WebSocket | null = null;
//
//     return (next) => (action: AppActions) => {
//       const { dispatch,
//         // getState
//       } = store;
//       const { type } = action;
//       const { wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
//       // const { user } = getState().user;
//       // const token = localStorage.getItem('accessToken'); // todo проверить есть ли токен
//       // console.log('token', token);
//       console.log('in middleWare');
//
//       // todo подумать над этим моментом. На feed могут переходить все пользователи. И авторизованные, и нет.
//       if (type === wsInit) {
//         console.log('type', type);
//         dispatch({ type: wsInit });
//         socket = new WebSocket(wsUrl);
//       }
//
//       if (socket) {
//         socket.onopen = (event) => {
//           dispatch({ type: onOpen, payload: event });
//         };
//
//         socket.onerror = (event) => {
//           dispatch({ type: onError, payload: event });
//         };
//         //
//         // socket.onmessage = (event) => {
//         //   const { data } = event;
//         //   const parsedData: Order = JSON.parse(data);
//         //   dispatch({ type: onMessage, payload: parsedData });
//         // };
//
//         // socket.onclose = (event) => {
//         //   dispatch({ type: onClose, payload: event });
//         //   if (socket !== null) {
//         //     socket.close();
//         //   }
//         // };
//
//         // if (type === wsSendMessage) {
//         //   const { payload } = action;
//         //   const message = { ...(payload as IMessage), token };
//         //   socket.send(JSON.stringify(message));
//         // }
//       }
//
//       next(action);
//     };
//   }) as Middleware;
// };

const RECONNECT_PERIOD = 3000;

export const socketMiddlewareWithReconnect:any = (
  wsActions: TWSStoreActions,
  withTokenRefresh = false,
): Middleware<AppDispatch, RootState> => (store) => {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { type, payload } = action;

    if (type === wsInit) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      url = action.payload;
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
