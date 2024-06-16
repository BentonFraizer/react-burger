import { JSX, useEffect, useState } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './order-details.module.css';
import { IngredientPreview } from '../ingredient-preview/ingredient-preview';
import { Ingredient, Order } from '../../types';
import { countOccurrences, getOrderPrice, isEscKeyPressed } from '../../utils/utils';
import { useAppSelector } from '../../hooks/hooks';
import { APIRoute } from '../../consts';
import Loader from '../loader/loader';
import { request } from '../../utils/api';

function OrderDetails(): JSX.Element {
  const [order, setOrder] = useState<Order>();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const style = !background ? { marginTop: 122 } : { marginTop: 0 };
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const { number } = useParams();

  const getCardInfo = async () => request(`${APIRoute.orders}/${number}`);

  useEffect(() => {
    getCardInfo().then((data) => {
      setOrder(data.orders[0]);
    });
  }, []);

  useEffect(() => {
    const handleEscKeyPress = (e: KeyboardEvent) => {
      if (isEscKeyPressed(e)) {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  if (!order) {
    return (
      <div className={s.loader__wrapper}>
        <Loader />
      </div>
    );
  }

  const orderStatus = {
    done: { text: 'Выполнен', style: s.light__blue },
    pending: { text: 'Готовится', style: s.white },
    created: { text: 'Создан', style: s.white },
  } as const;

  const occurrences = countOccurrences(order?.ingredients);

  return (
    <div className={s.order} style={style}>
      <div className={s.order__number}>
        <p className='text text_type_digits-default mb-10'>#{order?.number}</p>
      </div>
      <div className={s.order__name}>
        <p className='text text_type_main-medium mb-3'>
          {order?.name}
        </p>
      </div>
      <div className={s.order__status}>
        <p className={`text text_type_main-default mb-15 ${orderStatus[order.status].style}`}>
          {orderStatus[order.status].text}
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
            <FormattedDate date={new Date(order?.createdAt as Date)} />
          </p>
        </div>
        <div className={s.order__total}>
          <p className='text text_type_digits-default mr-2'>{getOrderPrice(ingredients as Ingredient[], order as Order)}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
