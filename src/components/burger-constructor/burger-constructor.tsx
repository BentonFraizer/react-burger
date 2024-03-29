import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useContext, useEffect, useRef, useState } from 'react';
import s from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useModal } from '../../hooks/useModal';
import { IngredientsContext } from '../../services/ingredientsContext';
import { generateRandomIngredients, request } from '../../utils/utils';
import { Ingredient } from '../../types';
import { TotalPriceContext } from '../../services/totalPriceContext';
import { APIRoute, BACKEND_URL } from '../../consts';
import { OrderNumberContext } from '../../services/orderNumberContext';

function BurgerConstructor() {
  const { data } = useContext(IngredientsContext);
  const { totalPrice, totalPriceDispatcher } = useContext(TotalPriceContext);
  const { setOrderNumber } = useContext(OrderNumberContext);
  // Код ниже необходим для генерации случайного количества ингредиентов между закреплёнными элементами типа bun
  const [randomIngredients, setRandomIngredients] = useState<Ingredient[]>([]);
  const [mains, setMains] = useState<Ingredient[]>([]);
  const [identifiersForOrder, setIdentifiersForOrder] = useState<string[]>([]);
  const isInitialMount = useRef(true);

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

  useEffect(() => {
    if (bun !== undefined) {
      const bunsCost = bun.price * 2;
      const mainsCost = mains.reduce((acc, cur) => acc + cur.price, 0);
      totalPriceDispatcher({ type: 'set', payload: bunsCost + mainsCost });
    }
  }, [bun, mains]);

  const { isModalOpened, openModal, closeModal } = useModal();

  const orderNumberUrl = `${BACKEND_URL}/${APIRoute.orders}`;
  const orderNumberOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: identifiersForOrder }),
  };

  useEffect(() => {
    if (!isInitialMount.current) {
      request(orderNumberUrl, orderNumberOptions)
        .then((receivedData) => setOrderNumber(receivedData.order.number)).catch((error) => {
          // eslint-disable-next-line
          console.error('Ошибка получения данных в компоненте BurgerConstructor', error);
        });
    }
  }, [identifiersForOrder]);

  const handleMakeOrderBtnClick = () => {
    isInitialMount.current = false;
    openModal();
    const bunId = [bun._id];
    const mainsIds = mains.map((main) => main._id);
    setIdentifiersForOrder([...bunId, ...mainsIds]);
  };

  const handleCloseModalClick = () => {
    closeModal();
    setOrderNumber(null);
  };

  // Полностью запутался в типах для контекста поэтому в паре мест пришлось использовать @ts-ignore
  // хотя знаю, что это очень плохая практика.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { totalPrice: totalPrice1 } = totalPrice;
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
              price={main.price}
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
            <p className='text text_type_digits-medium'>{totalPrice1}</p>
          </div>
          <div className='total-price__icon'>
            <CurrencyIcon type='primary' />
          </div>
        </div>
        <Button htmlType='button' type='primary' size='medium' onClick={handleMakeOrderBtnClick}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpened && <Modal onClose={handleCloseModalClick} isModalOpen={isModalOpened}>
        <OrderDetails />
      </Modal>}
    </div>
  );
}

export default BurgerConstructor;
