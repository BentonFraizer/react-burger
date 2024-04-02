import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useContext, useEffect, useRef } from 'react';
import s from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useModal } from '../../hooks/useModal';
import { Ingredient } from '../../types';
import { TotalPriceContext } from '../../services/totalPriceContext';
import { OrderNumberContext } from '../../services/orderNumberContext';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { RootState } from '../../index';
import {
  getConstructorBun,
  getConstructorIngredients,
  removeConstructorIngredient,
} from '../../services/actions/constructor-ingredients';
import { deleteOrderNumber, getOrderNumber } from '../../services/actions/order';

function BurgerConstructor() {
  const bun = useAppSelector((state: RootState) => state.constructorIngredients.bun) as Ingredient;
  const constructorIngredients = useAppSelector(
    (state: RootState) => state.constructorIngredients.constructorIngredients,
  ) as Ingredient[];
  const { totalPrice, totalPriceDispatcher } = useContext(TotalPriceContext);
  const { setOrderNumber } = useContext(OrderNumberContext);
  const isInitialMount = useRef(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getConstructorIngredients());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getConstructorBun());
  }, [dispatch]);

  useEffect(() => {
    if (bun !== undefined && bun !== null) {
      const bunsCost = bun.price * 2;
      const mainsCost = constructorIngredients.reduce((acc, cur) => acc + cur.price, 0);
      totalPriceDispatcher({ type: 'set', payload: bunsCost + mainsCost });
    }
  }, [bun, constructorIngredients]);

  const { isModalOpened, openModal, closeModal } = useModal();

  const handleMakeOrderBtnClick = () => {
    isInitialMount.current = false;
    openModal();
    const bunId = [bun?._id];
    const mainsIds = constructorIngredients.map((ingredient) => ingredient._id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getOrderNumber([...bunId, ...mainsIds]));
  };

  const handleCloseModal = () => {
    closeModal();
    setOrderNumber(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(deleteOrderNumber());
  };

  const handleDeleteIngredientBtnClick = (id:string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(removeConstructorIngredient(id));
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
        {constructorIngredients.length
          && constructorIngredients.map((main) => <li key={main._id}>
            <ConstructorElement
              text={main.name}
              price={main.price}
              thumbnail={main.image}
              extraClass={`${s['constructor-element']} mt-4 mb-4`}
              handleClose={() => handleDeleteIngredientBtnClick(main._id)}
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
      {isModalOpened && <Modal onClose={handleCloseModal} isModalOpen={isModalOpened}>
        <OrderDetails />
      </Modal>}
    </div>
  );
}

export default BurgerConstructor;
