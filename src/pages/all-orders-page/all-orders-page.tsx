import React, { useEffect, useState } from 'react';
import s from './all-orderst-page.module.css';
import OrderCard from '../../components/order-card/order-card';
import { Order } from '../../types';

function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pageInfo, setPageInfo] = useState();
  const getCardsData = async () => {
    const response = await fetch('http://localhost:3001/norma.nomoreparties.space/orders/all');
    return response.json();
  };

  useEffect(() => {
    getCardsData().then((data) => {
      setOrders(data.orders);
      setPageInfo(data);
    });
  }, []);

  return (
    <main className={s.main}>
      <section className={s.section}>
        <div className={s.left}>
          <p className={'text text_type_main-large mt-10 mb-5'}>
            Лента заказов
          </p>
          <div className={s.cards__wrapper}>
            {
              orders.map((order) => (
                <OrderCard key={order._id} orderInfo={order} />
              ))
            }
          </div>
        </div>

        <div className='right'></div>
      </section>
    </main>
  );
}

export default AllOrdersPage;
