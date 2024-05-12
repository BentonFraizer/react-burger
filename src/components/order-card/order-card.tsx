import { JSX } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './order-card.module.css';

function OrderCard(): JSX.Element {
  return (
    <div className={s.order__card}>
      <div className={s.order__info}>
        <div className='order__number'>
          <p className='text text_type_digits-default'>#034535</p>
        </div>
        <div className={s['order__created-date']}>
          <p className='text text_type_main-default'>
            Сегодня, 16:20
          </p>
        </div>
      </div>
      <div className={s.order__title}>
        <p className='text text_type_main-medium'>
          Death Star Starship Main бургер
        </p>
      </div>
      <div className={s.order__details}>
        <div className={s.ingredients__icons}>
          <div className={s.ingredient__preview}>
            <img src='https://code.s3.yandex.net/react/code/meat-02.png' alt='small ingredient' />
          </div>
          <div className={s.ingredient__preview}>
            <img src='https://code.s3.yandex.net/react/code/sp_1.png' alt='small ingredient' />
          </div>
          <div className={s.ingredient__preview}>
            <img src='https://code.s3.yandex.net/react/code/mineral_rings.png' alt='small ingredient' />
          </div>
          <div className={s.ingredient__preview}>
            <img src='https://code.s3.yandex.net/react/code/meat-01.png' alt='small ingredient' />
          </div>
        </div>
        <div className={s.order__price}>
          <p className='text text_type_digits-default mr-2'>480</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
