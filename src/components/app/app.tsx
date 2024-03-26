import React, { useEffect, useReducer, useState } from 'react';
import s from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Ingredient } from '../../types';
import { APIRoute, BACKEND_URL } from '../../consts';
import { IngredientsContext } from '../../services/ingredientsContext';
import { TotalPriceContext } from '../../services/totalPriceContext';
import { OrderNumberContext } from '../../services/orderNumberContext';

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
  const [data, setData] = useState<Ingredient[]>([]);
  // Не понял как корректно типизировать аргумент totalPriceInitialState
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [totalPrice, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/${APIRoute.ingredients}`).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return new Error(`Ошибка ${response.status}`);
    }).then((receivedData) => setData(receivedData.data)).catch((error) => {
      // Не нашел в задании информацию о том, что делать с ошибкой. Оставил пока вывод в консоль.
      // eslint-disable-next-line
      console.error('Ошибка получения данных в компоненте App', error);
    });
  }, []);

  return (
    <div className={s.app}>
      <IngredientsContext.Provider value={{ data, setData }}>
        <TotalPriceContext.Provider value={{ totalPrice, totalPriceDispatcher }}>
          <OrderNumberContext.Provider value={{ orderNumber, setOrderNumber }}>
            <AppHeader />
            <main className={s.main}>
              <section className={s.section}>
                <BurgerIngredients />
                <BurgerConstructor />
              </section>
            </main>
          </OrderNumberContext.Provider>
        </TotalPriceContext.Provider>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
