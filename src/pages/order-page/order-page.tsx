import { JSX } from 'react';
import s from './order-page.module.css';
import OrderDetails from '../../components/order-details/order-details';

function OrderPage(): JSX.Element {
  return (
    <main className={s.main}>
      <section className={s.section}>
        <OrderDetails />
      </section>
    </main>
  );
}

export default OrderPage;
