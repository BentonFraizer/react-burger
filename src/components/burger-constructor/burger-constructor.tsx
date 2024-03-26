import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useContext, useEffect, useState } from 'react';
import s from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useModal } from '../../hooks/useModal';
import { IngredientsContext } from '../../services/ingredientsContext';
import { generateRandomIngredients } from '../../utils/utils';
import { Ingredient } from '../../types';

function BurgerConstructor() {
  const { data } = useContext(IngredientsContext);
  // Код ниже необходим для генерации случайного количества ингредиентов между закреплёнными элементами типа bun
  const [randomIngredients, setRandomIngredients] = useState<Ingredient[]>([]);
  const [mains, setMains] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (data.length !== 0) {
      const random = generateRandomIngredients(data, 2, data.length - 1);
      setRandomIngredients(random);
    }
  }, [data]);

  useEffect(() => {
    if (randomIngredients.length !== 0) {
      const exceptBunIngredients = randomIngredients.filter((ingredient) => ingredient.type !== 'bun');
      setMains(exceptBunIngredients);
    }
  }, [randomIngredients]);

  const bun = randomIngredients[0];

  const { isModalOpened, openModal, closeModal } = useModal();

  return (
    <div className={s['burger-constructor']}>
      <ConstructorElement
        type='top'
        isLocked={true}
        text={bun?.name}
        price={bun?.price}
        thumbnail={bun?.image}
        extraClass={'mb-4'}
      />
      <ul className={s['constructor-elements__wrapper']}>
        {mains.length
          && mains.map((main) => <li key={main._id}>
            <ConstructorElement
              text={main.name}
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
        text={bun?.name}
        price={bun?.price}
        thumbnail={bun?.image}
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
