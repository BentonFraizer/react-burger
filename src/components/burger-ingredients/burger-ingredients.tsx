import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredients.module.css';

function BurgerIngredients() {
  const [current, setCurrent] = useState('buns');
  return (
    <>
      <div className={s['burger-ingredients']}>
        <p className={`${s.subtitle} text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </p>
        <div style={{ display: 'flex' }}>
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
          asd
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
