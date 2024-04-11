import React from 'react';
import s from './profile-page.module.css';
import AppHeader from '../../components/app-header/app-header';

function ProfilePage() {
  return (
    <div className={s.wrapper}>
      <AppHeader />
      <main className={s.main}>
        <section className={s.section}>
          Страница "Личный кабинет".
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;
