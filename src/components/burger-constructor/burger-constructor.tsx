import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import s from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderStatus from '../order-status/order-status';
import { useModal } from '../../hooks/useModal';
import { Ingredient, UniqueIdIngredient, User } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { RootState } from '../../index';
import {
  addConstructorBun,
  addConstructorIngredient,
  getConstructorBun,
  getConstructorIngredients,
  removeConstructorIngredient,
} from '../../services/actions/constructor-ingredients';
import { deleteOrderNumber, getOrderNumber } from '../../services/actions/order';
import uniqueIdIngredient from '../../types/uniqueIdIngredient';
import EmptyBun from './empty-bun/empty-bun';
import EmptyFilling from './empty-filling/empty-filling';
import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';
import { AppRoute } from '../../consts';

function BurgerConstructor() {
  const navigate = useNavigate();
  const bun = useAppSelector((state: RootState) => state.constructorIngredients.bun) as Ingredient;
  const user = useAppSelector((state) => state.user.user) as User;
  const constructorIngredients = useAppSelector(
    (state: RootState) => state.constructorIngredients.constructorIngredients,
  ) as uniqueIdIngredient[];
  const isRequesting = useAppSelector((state) => state.order.orderRequest);
  const isInitialMount = useRef(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConstructorIngredients());
    dispatch(getConstructorBun());
  }, [dispatch]);

  const totalPrice = useMemo(() => {
    if (bun === null && constructorIngredients.length === 0) {
      return 0;
    }
    if (bun === null && constructorIngredients.length !== 0) {
      return constructorIngredients.reduce((acc, cur) => acc + cur.price, 0);
    }
    const bunsCost = bun.price * 2;
    const mainsCost = constructorIngredients.reduce((acc, cur) => acc + cur.price, 0);
    return bunsCost + mainsCost;
  }, [bun, constructorIngredients]);

  const { isModalOpened, openModal, closeModal } = useModal();

  const handleMakeOrderBtnClick = () => {
    if (user === null) {
      navigate(AppRoute.login);
    } else {
      isInitialMount.current = false;
      openModal();
      const bunId = [bun?._id];
      const mainsIds = constructorIngredients.map((ingredient) => ingredient._id);
      dispatch(getOrderNumber([...bunId, ...mainsIds]));
    }
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch(deleteOrderNumber());
  };

  const handleDeleteIngredientBtnClick = (ingredient: UniqueIdIngredient) => {
    dispatch(removeConstructorIngredient(ingredient));
  };

  // Хуки обрабатывают перетаскивание булок из списка ингредиентов в конструктор
  const [{ canDrop }, dropTargetForTopBun] = useDrop({
    accept: 'bun',
    drop(item: Ingredient) {
      dispatch(addConstructorBun(item));
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });
  const [, dropTargetForBottomBun] = useDrop({
    accept: 'bun',
    drop(item: Ingredient) {
      dispatch(addConstructorBun(item));
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });
  const isDraggingClass = canDrop ? s['is-dragging'] : '';

  // Хук обрабатывают перетаскивание начинок и соусов из списка ингредиентов в конструктор
  const [{ canFillingDrop }, dropTargetForFillings] = useDrop({
    accept: 'filling',
    drop(item: UniqueIdIngredient) {
      dispatch(addConstructorIngredient(item, uuidv4()));
    },
    collect: (monitor) => ({
      canFillingDrop: monitor.canDrop(),
    }),
  });
  const isFillingDraggingClass = canFillingDrop ? s['is-dragging'] : '';

  const isMakeOrderBtnDisabled = bun === null || constructorIngredients.length === 0;
  return (
    <div className={s['burger-constructor']}>
      {bun === null ? <EmptyBun type={'top'} />
        : <div className={isDraggingClass} ref={dropTargetForTopBun}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={bun?.name}
            price={bun?.price}
            thumbnail={bun?.image}
            extraClass={`mb-2 ${s['bun-top']}`}
          />
        </div>
      }
      {constructorIngredients.length !== 0
        ? <ul className={`${s['constructor-elements__wrapper']} ${isFillingDraggingClass}`} ref={dropTargetForFillings}>
          {constructorIngredients.map((main, index) => <DraggableConstructorElement
            key={main.uniqueId}
            index={index}
            main={main}
            onDeleteIngredient={handleDeleteIngredientBtnClick} />)}
        </ul>
        : <EmptyFilling />
      }
      {bun === null ? <EmptyBun type='bottom' />
        : <div className={isDraggingClass} ref={dropTargetForBottomBun}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bun?.name}
            price={bun?.price}
            thumbnail={bun?.image}
            extraClass={`mt-2 mb-10 ${s['bun-bottom']}`}
          />
        </div>
      }

      <div className={s['preorder-info']}>
        <div className={`${s['total-price']} mr-10`}>
          <div className='total-price__value mr-2'>
            <p className='text text_type_digits-medium'>{totalPrice}</p>
          </div>
          <div className='total-price__icon'>
            <CurrencyIcon type='primary' />
          </div>
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={handleMakeOrderBtnClick}
          disabled={isMakeOrderBtnDisabled}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpened && <Modal
        title={isRequesting ? 'Оформляем заказ...' : ''}
        onClose={handleCloseModal}
        isModalOpen={isModalOpened}>
        <OrderStatus />
      </Modal>}
    </div>
  );
}

export default BurgerConstructor;
