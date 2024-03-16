import { useState } from 'react';
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-ingredients.module.css';
import { data } from '../../utils/data';

function BurgerIngredients() {
  const [current, setCurrent] = useState('buns');
  const firstBurger = data[0];

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
              <p className='text text_type_main-medium'>
                Булки
              </p>
            </div>
            <div className={s['ingredient-item__container']}>
              <div className={s['ingredient-item']}>
                <div className={s['ingredient-item__img']}>
                  <img src={firstBurger.image} alt={firstBurger.name} />
                </div>
                <div className={s['ingredient-item__price']}>
                  <div className={s['price-value']}>
                    <p className='text text_type_digits-default'>{firstBurger.price}</p>
                  </div>
                  <div className={s['price-icon']}>
                    <CurrencyIcon type='primary' />
                  </div>
                </div>
                <div className={s['ingredient-item__name']}>
                  <p className='text text_type_main-default'>
                    {firstBurger.name}
                  </p>
                </div>
                <div className='ingredient-item__counter'>
                  <p className='text text_type_digits-default'>1</p>
                </div>
              </div>
              <div className={s['ingredient-item']}>
                <div className={s['ingredient-item__img']}>
                  <img src={firstBurger.image} alt={firstBurger.name} />
                </div>
                <div className={s['ingredient-item__price']}>
                  <div className={s['price-value']}>
                    <p className='text text_type_digits-default'>{firstBurger.price}</p>
                  </div>
                  <div className={s['price-icon']}>
                    <CurrencyIcon type='primary' />
                  </div>
                </div>
                <div className={s['ingredient-item__name']}>
                  <p className='text text_type_main-default'>
                    {firstBurger.name}
                  </p>
                </div>
                <div className='ingredient-item__counter'>
                  <p className='text text_type_digits-default'>1</p>
                </div>
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
