import React, { useEffect } from 'react';
import s from './all-orderst-page.module.css';
import OrderCard from '../../components/order-card/order-card';
import { Order } from '../../types';
import { separateNumbers } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { wsFeedInit, wsFeedClose } from '../../services/actions/ws-feed';
import Loader from '../../components/loader/loader';

function AllOrdersPage() {
  const dispatch = useAppDispatch();
  const { connectionState, total, totalToday } = useAppSelector((state) => state.feed);
  const orders = useAppSelector((state) => state.feed?.allOrders) as Order[];

  useEffect(() => {
    if (connectionState === 'closed') {
      dispatch(wsFeedInit());
    }

    return () => {
      if (connectionState === 'opened') {
        dispatch(wsFeedClose());
      }
    };
  }, [dispatch, connectionState]);

  // Функция для получения номерос заказов в зависимости от значения свойства статус
  const separateOrdersByStatus = (ordersForSeparate: Order[]) => {
    const ordersNumbersDone: number[] = [];
    const ordersNumbersPending: number[] = [];

    ordersForSeparate.forEach((order) => {
      if (order.status === 'done') {
        ordersNumbersDone.push(order.number);
      } else if (order.status === 'pending') {
        ordersNumbersPending.push(order.number);
      }
    });

    return [ordersNumbersDone, ordersNumbersPending];
  };

  const [ordersNumbersDone, ordersNumbersPending] = separateOrdersByStatus(orders);

  // Функция для деления передаваемых номеров заказов на колонки по 10 значений в каждой
  const renderColumns = (ordersNumbers: number[]) => {
    const columns = [];
    for (let i = 0; i < ordersNumbers.length; i += 10) {
      columns.push(ordersNumbers.slice(i, i + 10));
    }
    return (
      <>
        {columns.map((column, index) => (
          <div key={index} className={s['orders__numbers-column']}>
            {column.map((orderNumber, orderIndex) => (
              <p key={orderIndex} className='text text_type_digits-default mb-2'>{orderNumber}</p>
            ))}
          </div>
        ))}
      </>
    );
  };

  return (
    <main className={s.main}>
      <section className={s.section}>
        <div className={s.left}>
          <p className={'text text_type_main-large mt-10 mb-5'}>
            Лента заказов
          </p>
          <div className={s.cards__wrapper}>
            {
              connectionState !== 'opened'
                ? <div className={s.loader__wrapper}>
                  <Loader />
                </div>
                : orders.map((order) => (
                  <OrderCard key={order._id} orderInfo={order} />
                ))
            }
          </div>
        </div>

        <div className={s.right}>
          <div className={s.top}>
            <div className={s.done}>
              <div className='done__title'>
                <p className='text text_type_main-medium mb-6'>
                  Готовы:
                </p>
              </div>
              <div className={s['done__orders-numbers']}>
                {
                  connectionState !== 'opened'
                    ? <div className={s.loader__wrapper}>
                      <Loader />
                    </div>
                    : renderColumns(ordersNumbersDone)
                }
              </div>
            </div>
            <div className={s.in__process}>
              <div className='in__process-title'>
                <p className='text text_type_main-medium mb-6'>
                  В работе:
                </p>
              </div>
              <div className={s['in__process-numbers']}>
                {
                  connectionState !== 'opened'
                    ? <div className={s.loader__wrapper}>
                      <Loader />
                    </div>
                    : renderColumns(ordersNumbersPending.reverse())
                }
              </div>
            </div>
          </div>
          <div className={s.middle}>
            <p className='text text_type_main-medium'>
              Выполнено за всё время:
            </p>
            <p className='text text_type_digits-large'>
              {
                connectionState !== 'opened'
                  ? <div className={`${s.loader__wrapper} ${s.left}`}>
                    <Loader />
                  </div>
                  : separateNumbers(total)
              }
            </p>
          </div>
          <div className={s.bottom}>
            <p className='text text_type_main-medium'>
              Выполнено за сегодня:
            </p>
            <p className='text text_type_digits-large'>
              {
                connectionState !== 'opened'
                  ? <div className={`${s.loader__wrapper} ${s.left}`}>
                    <Loader />
                  </div>
                  : totalToday
              }
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AllOrdersPage;
