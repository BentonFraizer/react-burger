import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import s from './burger-constructor.module.css';
import { Ingredient } from '../../types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useModal } from '../../hooks/useModal';

type BurgerConstructorProps = {
  data: Ingredient[]
}

function BurgerConstructor({ data }: BurgerConstructorProps) {
  const firstBurger = data[0];
  const mains = data.filter((ingredient) => ingredient.type === 'main');
  const { isModalOpened, openModal, closeModal } = useModal();

  return (
    <div className={s['burger-constructor']}>
      <ConstructorElement
        type='top'
        isLocked={true}
        text='Краторная булка N-200i (верх)'
        price={200}
        thumbnail={firstBurger?.image}
        extraClass={'mb-4'}
      />
      <ul className={s['constructor-elements__wrapper']}>
        {mains.length
          && mains.map((main) => <li key={main._id}>
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={main.image}
              extraClass={`${s['constructor-element']} mt-4 mb-4`}
            />
          </li>)
        }
      </ul>
      <ConstructorElement
        type='bottom'
        isLocked={true}
        text='Краторная булка N-200i (низ)'
        price={200}
        thumbnail={firstBurger?.image}
        extraClass={'mt-4 mb-10'}
      />
      <div className={s['preorder-info']}>
        <div className={`${s['total-price']} mr-10`}>
          <div className='total-price__value mr-2'>
            <p className='text text_type_digits-medium'>610</p>
          </div>
          <div className='total-price__icon'>
            <CurrencyIcon type='primary' />
          </div>
        </div>
        <Button htmlType='button' type='primary' size='medium' onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpened && <Modal onClose={closeModal} isModalOpen={isModalOpened}>
          <OrderDetails />
        </Modal>}
    </div>
  );
}

export default BurgerConstructor;
