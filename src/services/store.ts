import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddlewareWithReconnect } from './middleware/socketMiddleware';
import { wsFeedActions, wsUserOrdersActions } from './types';

const feedMiddleware = socketMiddlewareWithReconnect(wsFeedActions);
const userOrdersMiddleware = socketMiddlewareWithReconnect(wsUserOrdersActions, true);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(feedMiddleware).concat(userOrdersMiddleware),
});
