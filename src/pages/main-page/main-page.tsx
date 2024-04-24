import React, { JSX } from 'react';
import s from './main-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

function MainPage(): JSX.Element {
  return (
    <main className={s.main}>
      <section className={s.section}>
        <BurgerIngredients />
        <BurgerConstructor />
      </section>
    </main>
  );
}

export default MainPage;
