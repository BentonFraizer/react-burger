import React, { Dispatch, SetStateAction } from 'react';

type OrderNumberContextType = {
  orderNumber: number | null;
  setOrderNumber: Dispatch<SetStateAction<number | null>>;
};

export const OrderNumberContext = React.createContext<OrderNumberContextType>({
  orderNumber: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOrderNumber: () => {},
});
