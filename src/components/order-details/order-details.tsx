import { JSX, useEffect, useState } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import s from './order-details.module.css';
import { IngredientPreview } from '../ingredient-preview/ingredient-preview';
import { Ingredient, Order } from '../../types';
import { countOccurrences, getOrderPrice } from '../../utils/utils';
import { useAppSelector } from '../../hooks/hooks';

function OrderDetails(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderInfo, setOrderInfo] = useState<Order>();
  const location = useLocation();
  const background = location.state && location.state.background;
  const style = !background ? { marginTop: 122 } : { marginTop: 0 };
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const { id } = useParams();
  const getCardsData = async () => {
    const response = await fetch('http://localhost:3001/norma.nomoreparties.space/orders/all');
    return response.json();
  };

  useEffect(() => {
    getCardsData().then((data) => {
      setOrders(data.orders);
    });
  }, []);

  useEffect(() => {
    setOrderInfo(orders.find((order: Order) => order._id === id));
  }, [orders]);

  // Поскольку вложенный тернарный оператор является не корректным решением со стороны ESLint
  // Реализован такой вариант получения значения для поля status
  let orderStatus;

  if (orderInfo?.status === 'done') {
    orderStatus = 'Выполнен';
  } else if (orderInfo?.status === 'pending') {
    orderStatus = 'Готовится';
  } else {
    orderStatus = 'Отменен';
  }

  const occurrences = countOccurrences(orderInfo?.ingredients);

  return (
    <div className={s.order} style={style}>
      <div className={s.order__number}>
        <p className='text text_type_digits-default mb-10'>#{orderInfo?.number}</p>
      </div>
      <div className={s.order__name}>
        <p className='text text_type_main-medium mb-3'>
          {orderInfo?.name}
        </p>
      </div>
      <div className={s.order__status}>
        <p className='text text_type_main-default mb-15'>
          {orderStatus}
        </p>
      </div>
      <div className={s.order__content}>
        <p className='text text_type_main-medium mb-6'>
          Состав:
        </p>
      </div>
      <div className={s.order__ingredients}>

        {
          Object.entries(occurrences).map(([key, value]) => {
            const currentIngredient = (ingredients as Ingredient[]).find((item) => key === item._id);
            if (!currentIngredient) {
              return null;
            }

            return (
              <div className={s.ingredient} key={key}>
                <div className={s.ingredient__img}>
                  <IngredientPreview imageSrc={currentIngredient.image} />
                </div>
                <div className={s.ingredient__name}>
                  <p className='text text_type_main-default'>
                    {currentIngredient.name}
                  </p>
                </div>
                <div className={s.ingredient__cost}>
                  <div className='ingredient__amount'>
                    <p className='text text_type_digits-default mr-2'>{value} x</p>
                  </div>
                  <div className='ingredient__price'>
                    <p className='text text_type_digits-default mr-2'>{currentIngredient.price}</p>
                  </div>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            );
          })
        }

      </div>
      <div className={s.order__info}>
        <div className={s.order__time}>
          <p className='text text_type_main-default'>
            <FormattedDate date={new Date(orderInfo?.createdAt as Date)} />
          </p>
        </div>
        <div className={s.order__total}>
          <p className='text text_type_digits-default mr-2'>{getOrderPrice(ingredients as Ingredient[], orderInfo as Order)}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
