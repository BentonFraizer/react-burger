import React, { Dispatch } from 'react';
import { TotalPriceActionType } from '../components/app/app';

export type TotalPriceContextType = {
  totalPrice: number;
  totalPriceDispatcher: Dispatch<TotalPriceActionType>;
};

export const TotalPriceContext = React.createContext<TotalPriceContextType>({
  totalPrice: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  totalPriceDispatcher: () => {
  },
});
