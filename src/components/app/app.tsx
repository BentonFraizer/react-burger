import React, { JSX } from 'react';
import s from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App():JSX.Element {
  return (
    <div className={s.app}>
      <AppHeader />
      <main className={s.main}>
        <section className={s.section}>
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
}

export default App;
