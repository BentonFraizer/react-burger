import React, { JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import s from './ingredients-info-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import { getIngredients } from '../../services/actions/ingredients';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Ingredient } from '../../types';
import { setIngredientDetails } from '../../services/actions/ingredient-details';

function IngredientInfoPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const filteredIngredient = (ingredients as Ingredient[]).find((item) => item._id === id);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (filteredIngredient) {
      setCurrentIngredient(filteredIngredient);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(setIngredientDetails(filteredIngredient));
    }
  }, [dispatch, filteredIngredient]);

  return (
    <div className={s.wrapper}>
      <AppHeader />
      <main className={s.main}>
        <section className={s.section}>
          <p className='text text_type_main-large mt-30'>
            Детали ингредиента
          </p>
          {currentIngredient && <IngredientDetails />}
        </section>
      </main>
    </div>
  );
}

export default IngredientInfoPage;
