import React, { JSX, useEffect, useState } from 'react';
import { Order } from '../../types';
import s from './orders.module.css';
import OrderCard from '../order-card/order-card';

function Orders(): JSX.Element {
  const [personalOrders, setPersonalOrders] = useState<Order[]>([]);

  const getCardsData = async () => {
    const response = await fetch('http://localhost:3001/norma.nomoreparties.space/orders');
    return response.json();
  };

  useEffect(() => {
    getCardsData().then((data) => {
      setPersonalOrders(data.orders);
    });
  }, []);

  return (
    <div className={s.orders}>
      {
        personalOrders.map((order) => (
          <OrderCard key={order._id} orderInfo={order} />
        ))
      }
    </div>
  );
}

export default Orders;
