import React, { JSX } from 'react';
import s from './main-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

export function MainPage(): JSX.Element {
  return (
    <div className={s.wrapper}>
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
