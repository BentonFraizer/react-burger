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
          {/* Код ниже разнести по разным файлам согласно скриншота из видео */}
          <div className={s['ingredients-group']}>
            <div className={s['ingredients-group__title']}>
              <p className="text text_type_main-medium">
                Булки
              </p>
            </div>
            <div className={s['ingredient-item__container']}>
              <div className={s['ingredient-item']}>
                <div className={s['ingredient-item__img']}></div>
                <div className={s['ingredient-item__price']}>
                  <div className={s['price-value']}></div>
                  <div className={s['price-icon']}></div>
                </div>
                <div className={s['ingredient-item__name']}></div>
                <div className='ingredient-item__counter'></div>
              </div>
            </div>
          </div>
          {/*  Конец кода который необходимо разнести по файлам  */}
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
