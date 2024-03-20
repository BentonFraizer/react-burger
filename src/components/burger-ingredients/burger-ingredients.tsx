import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredients.module.css';
import { Ingredient } from '../../types';
import IngredientsGroup from './ingredient-group/ingredients-group';
import { useModal } from '../../hooks/useModal';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';

type BurgerIngredientsProps = {
  data: Ingredient[]
}

function BurgerIngredients({ data }: BurgerIngredientsProps) {
  const [current, setCurrent] = useState('buns');
  const [currentIngredientId, setCurrentIngredientId] = useState<string>();
  const { isModalOpened, openModal, closeModal } = useModal();

  const onGetCurrentIngredientId = (ingredientId: string) => {
    setCurrentIngredientId(ingredientId);
  };

  const currentIngredient = data.filter((item) => item._id === currentIngredientId)[0];

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
        <Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='mains' active={current === 'mains'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={s['ingredients-wrapper']}>
        {Object.entries(groupedIngredients).map(([type, ingredients]) => (
          <IngredientsGroup
            key={type}
            type={type}
            ingredients={ingredients}
            getCurrentIngredientId={onGetCurrentIngredientId}
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
