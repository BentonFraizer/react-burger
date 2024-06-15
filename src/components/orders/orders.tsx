import React, { JSX, useEffect } from 'react';
import s from './orders.module.css';
import OrderCard from '../order-card/order-card';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { wsUserOrdersClose, wsUserOrdersInit } from '../../services/actions/ws-user-orders';

function Orders(): JSX.Element {
  const dispatch = useAppDispatch();
  const { connectionState } = useAppSelector((state) => state.userOrders);
  const { userOrders } = useAppSelector((state) => state.userOrders);

  useEffect(() => {
    if (connectionState === 'closed') {
      dispatch(wsUserOrdersInit());
    }

    return () => {
      if (connectionState === 'opened') {
        dispatch(wsUserOrdersClose());
      }
    };
  }, [dispatch, connectionState]);

  return (
    <div className={s.orders}>
      {
        userOrders?.map((order) => (
          <OrderCard key={order._id} orderInfo={order} />
        ))
      }
    </div>
  );
}

export default Orders;
