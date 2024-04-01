import React, { useEffect, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredients.module.css';
import { Ingredient } from '../../types';
import IngredientsGroup from './ingredient-group/ingredients-group';
import { useModal } from '../../hooks/useModal';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import { getIngredients } from '../../services/actions/ingredients';
import { RootState } from '../../index';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

function BurgerIngredients() {
  const [current, setCurrent] = useState('buns');
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient>();
  const { isModalOpened, openModal, closeModal } = useModal();

  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.ingredients.ingredients);

  if (data === undefined) {
    return null;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  const onGetCurrentIngredient = (ingredient: Ingredient) => {
    setCurrentIngredient(ingredient);
  };

  // Функция для преобразования входного массива данных в объект для более удобной работы с ним при автоматической отрисовке
  // Можно будет вынести в отдельный файл когда её будет необходимо использовать в нескольких местах
  function groupIngredientsByType(ingredients: Ingredient[]): Record<string, Ingredient[]> {
    const groupedIngredients: Record<string, Ingredient[]> = {};

    for (let i = 0; i < ingredients.length; i += 1) {
      const ingredient = ingredients[i];
      const { type } = ingredient;

      if (!groupedIngredients[type]) {
        groupedIngredients[type] = [];
      }

      groupedIngredients[type].push(ingredient);
    }

    return groupedIngredients;
  }

  const groupedIngredients = groupIngredientsByType(data);

  return (
    <div className={s['burger-ingredients']}>
      <p className={`${s.subtitle} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </p>
      <div className={s['tabs-wrapper']}>
        <Tab value='buns' active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='mains' active={current === 'mains'} onClick={setCurrent}>
          Начинки
        </Tab>
        <Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
      </div>
      <div className={s['ingredients-wrapper']}>
        {Object.entries(groupedIngredients).map(([type, ingredients]) => (
          <IngredientsGroup
            key={type}
            type={type}
            ingredients={ingredients}
            getCurrentIngredient={onGetCurrentIngredient}
            openModal={openModal} />
        ))}
      </div>
      {isModalOpened && currentIngredient && <Modal title='Детали ингредиента' onClose={closeModal} isModalOpen={isModalOpened}>
        <IngredientDetails ingredient={currentIngredient} />
      </Modal>}
    </div>
  );
}

export default BurgerIngredients;
