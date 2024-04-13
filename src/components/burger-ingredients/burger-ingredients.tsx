import React, { useEffect, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredients.module.css';
import { Ingredient } from '../../types';
import IngredientsGroup from './ingredient-group/ingredients-group';
import { getIngredients } from '../../services/actions/ingredients';
import { RootState } from '../../index';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Loader from '../loader/loader';

function BurgerIngredients() {
  const [current, setCurrent] = useState('bun');
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.ingredients.ingredients);
  const {
    ingredientsFailed,
    ingredientsFailedMessage,
    ingredientsRequest,
  } = useAppSelector((state: RootState) => state.ingredients);

  if (data === undefined) {
    return null;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  // Обработчик, отслеживающий положение групп элементов. Если верхняя часть группы ближе к верху конейнера,
  // выполняется автоматический выбор соответствующего таба.
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

  // Обработчик, выполняющий сбор всех вложенных ref из компонента IngredientsGroup
  const onGetGroupRef = (type: string, ref: HTMLDivElement | null) => {
    groupRefs.current[type] = ref;
  };

  // Обработчик нажатия на вкладку. Выполняет скролл до соответствующей группы компонентов
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

  const groupedIngredients = groupIngredientsByType(data as Ingredient[]);

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
        {ingredientsRequest && <div className='mt-20'><Loader /></div>}
        {!ingredientsFailed ? Object.entries(groupedIngredients).map(([type, ingredients]) => (
          <IngredientsGroup
            key={type}
            type={type}
            ingredients={ingredients}
            onGetGroupRef={(ref) => onGetGroupRef(type, ref)}
          />
        )) : (
          <>
            <p className='text text_type_main-medium mt-10 mb-5'>
              Ошибка закрузки ингредиентов.
            </p>
            <p className='text text_type_main-default mb-3'>
              Информация об ошибке:
            </p>
            <p className='text text_type_main-medium'>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <span>{ingredientsFailedMessage}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default BurgerIngredients;
