import React, { Dispatch, SetStateAction } from 'react';
import { Ingredient } from '../types';

type IngredientsContextType = {
  data: Ingredient[];
  setData: Dispatch<SetStateAction<Ingredient[]>>;
};

export const IngredientsContext = React.createContext<IngredientsContextType>({
  data: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setData: () => {},
});
