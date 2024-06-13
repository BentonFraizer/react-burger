import { store } from '../store';
import {
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE,
  FEED_SEND_MESSAGE,
} from '../actions/ws-feed';
import { ConstructorIngredientsAction } from '../reducers/constructor-ingredients';
import { IngredientDetailsAction } from '../reducers/ingredient-details';
import { IngredientsAction } from '../reducers/ingredients';
import { OrderAction } from '../reducers/order';
import { UserAction } from '../reducers/user';
import { WSFeedsAction } from '../reducers/ws-feed';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type WSStoreFeedActions = {
  wsInit: typeof FEED_CONNECTION_INIT;
  wsClose: typeof FEED_CONNECTION_CLOSE;
  wsSendMessage: typeof FEED_SEND_MESSAGE;
  onOpen: typeof FEED_CONNECTION_SUCCESS;
  onClose: typeof FEED_CONNECTION_CLOSED;
  onError: typeof FEED_CONNECTION_ERROR;
  onMessage: typeof FEED_GET_MESSAGE;
};

export const wsFeedActions: WSStoreFeedActions = {
  wsInit: FEED_CONNECTION_INIT,
  wsClose: FEED_CONNECTION_CLOSE,
  wsSendMessage: FEED_SEND_MESSAGE,
  onOpen: FEED_CONNECTION_SUCCESS,
  onClose: FEED_CONNECTION_CLOSED,
  onError: FEED_CONNECTION_ERROR,
  onMessage: FEED_GET_MESSAGE
};

export type AppActions =
  ConstructorIngredientsAction
  | IngredientDetailsAction
  | IngredientsAction
  | OrderAction
  | UserAction
  | WSFeedsAction;
