import React, { useEffect, useRef, useState } from 'react';
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
import { deleteIngredientDetails } from '../../services/actions/ingredient-details';

function BurgerIngredients() {
  const [current, setCurrent] = useState('bun');
  const { isModalOpened, openModal, closeModal } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const closeModalHandler = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(deleteIngredientDetails());
    closeModal();
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const containerTopCoordinate = containerRef.current.getBoundingClientRect().top;
      const bunRefTopCoordinate = groupRefs.current.bun?.getBoundingClientRect().top;
      const mainRefTopCoordinate = groupRefs.current.main?.getBoundingClientRect().top;
      const sauceRefTopCoordinate = groupRefs.current.sauce?.getBoundingClientRect().top;
      if (bunRefTopCoordinate && mainRefTopCoordinate && sauceRefTopCoordinate) {
        const containerBunDifference = Math.abs(containerTopCoordinate - bunRefTopCoordinate);
        const containerMainDifference = Math.abs(containerTopCoordinate - mainRefTopCoordinate);
        const containerSauceDifference = Math.abs(containerTopCoordinate - sauceRefTopCoordinate);
        if (containerBunDifference < containerMainDifference) {
          setCurrent('bun');
        } else if (containerMainDifference < containerSauceDifference) {
          setCurrent('main');
        } else {
          setCurrent('sauce');
        }
      }
    }
  };

  const onGetGroupRef = (type: string, ref: HTMLDivElement | null) => {
    groupRefs.current[type] = ref;
  };

  const tabClickHandler = (e: string) => {
    setCurrent(e);
    groupRefs.current[e]?.scrollIntoView({ behavior: 'smooth' });
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
        <Tab value='bun' active={current === 'bun'} onClick={(e) => tabClickHandler(e)}>
          Булки
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={(e) => tabClickHandler(e)}>
          Начинки
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={(e) => tabClickHandler(e)}>
          Соусы
        </Tab>
      </div>
      <div className={s['ingredients-wrapper']} onScroll={handleScroll} ref={containerRef}>
        {Object.entries(groupedIngredients).map(([type, ingredients]) => (
          <IngredientsGroup
            key={type}
            type={type}
            ingredients={ingredients}
            openModal={openModal}
            onGetGroupRef={(ref) => onGetGroupRef(type, ref)}
          />
        ))}
      </div>
      {isModalOpened && <Modal title='Детали ингредиента' onClose={closeModalHandler} isModalOpen={isModalOpened}>
        <IngredientDetails />
      </Modal>}
    </div>
  );
}

export default BurgerIngredients;
