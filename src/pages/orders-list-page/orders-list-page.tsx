import React from 'react';
import s from './orders-list-page.module.css';
import AppHeader from '../../components/app-header/app-header';

function OrdersListPage() {
  return (
    <div className={s.wrapper}>
      <AppHeader />
      <main className={s.main}>
        <section className={s.section}>
          Страница "Лента заказов".
        </section>
      </main>
    </div>
  );
}

export default OrdersListPage;
