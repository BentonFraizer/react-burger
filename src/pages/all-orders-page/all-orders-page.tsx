import React from 'react';
import s from './all-orderst-page.module.css';
import OrderCard from '../../components/order-card/order-card';

function AllOrdersPage() {
  return (
    <main className={s.main}>
      <section className={s.section}>
        <div className={s.left}>
          <p className={'text text_type_main-large mt-10 mb-5'}>
            Лента заказов
          </p>
          <div className={s.cards__wrapper}>
            <OrderCard/>
          </div>
        </div>

        <div className='right'></div>
      </section>
    </main>
  );
}

export default AllOrdersPage;
