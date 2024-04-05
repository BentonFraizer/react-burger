import { JSX } from 'react';
import s from './order-details.module.css';
import doneIcon from '../../images/icons/done.svg';
import { useAppSelector } from '../../hooks/hooks';
import Loader from '../loader/loader';

function OrderDetails(): JSX.Element {
  const { orderNumber, orderRequest } = useAppSelector((state) => state.order);

  return (<div className={s['order-details']}>
    {
      orderRequest
        ? <Loader />
        : <>
          <div className={`${s['order-number']} mb-10`}>
            <p className='text text_type_digits-large'>{orderNumber}</p>
          </div>
          <div className={s['order-id']}>
            <p className='text text_type_main-medium mb-15'>
              идентификатор заказа
            </p>
          </div>
          <div className={`${s['order-icon']} mb-15`}>
            <img src={doneIcon} alt='Заказ принят' />
          </div>
          <div className={`${s['order-text']} mb-15`}>
            <p className={'text text_type_main-default mb-2'}>
              Ваш заказ начали готовить
            </p>
            <p className={`${s.text} text_type_main-default mb-2`}>
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
        </>
    }
  </div>);
}

export default OrderDetails;
