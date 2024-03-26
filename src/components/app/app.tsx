import React, { useEffect, useState } from 'react';
import s from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Ingredient } from '../../types';
import { APIRoute, BACKEND_URL } from '../../consts';
import { IngredientsContext } from '../../services/ingredientsContext';

function App() {
  const [data, setData] = useState<Ingredient[]>([]);

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
        <AppHeader />
        <main className={s.main}>
          <section className={s.section}>
            <BurgerIngredients />
            <BurgerConstructor />
          </section>
        </main>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
