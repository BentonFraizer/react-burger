import React, { useReducer } from 'react';
import s from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { TotalPriceContext } from '../../services/totalPriceContext';

const totalPriceInitialState = { totalPrice: 0 };
type TotalPriceStateType = typeof totalPriceInitialState;

export type TotalPriceActionType = {
  type: 'set' | 'reset';
  payload?: number;
};

function reducer(state: TotalPriceStateType, action: TotalPriceActionType) {
  switch (action.type) {
    case 'set':
      return { totalPrice: action.payload };
    case 'reset':
      return { totalPrice: totalPriceInitialState };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  // Не понял как корректно типизировать аргумент totalPriceInitialState
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [totalPrice, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState);

  return (
    <div className={s.app}>
      <TotalPriceContext.Provider value={{ totalPrice, totalPriceDispatcher }}>
        <AppHeader />
        <main className={s.main}>
          <section className={s.section}>
            <BurgerIngredients />
            <BurgerConstructor />
          </section>
        </main>
      </TotalPriceContext.Provider>
    </div>
  );
}

export default App;
