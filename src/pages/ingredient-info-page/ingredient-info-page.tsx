import React, { JSX } from 'react';
import s from './ingredients-info-page.module.css';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';

function IngredientInfoPage(): JSX.Element {
  return (
    <main className={s.main}>
      <section className={s.section}>
        <p className="text text_type_main-large mt-30">
          Детали ингредиента
        </p>
        <IngredientDetails />
      </section>
    </main>
  );
}

export default IngredientInfoPage;
