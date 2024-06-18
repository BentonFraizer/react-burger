import React from 'react';
import { Outlet } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './profile-page.module.css';
import { AppRoute } from '../../consts';
import { logout } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import LoaderLayout from '../../components/loader-layout/loader-layout';

function ProfilePage() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLogoutRequest = useAppSelector((state) => state.user.logoutRequest);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <main className={s.main}>
      <section className={s.section}>
        <div className={s.profile}>
          <div className={s.left}>
            <Link to={AppRoute.profile} className={location.pathname === AppRoute.profile ? s.active : ''}>
              <Button htmlType='button' type='secondary' size='medium'>
                Профиль
              </Button>
            </Link>
            <Link to={AppRoute.profileOrders} className={location.pathname === AppRoute.profileOrders ? s.active : ''}>
              <Button htmlType='button' type='secondary' size='medium'>
                История заказов
              </Button>
            </Link>
            <Button htmlType='button' type='secondary' size='medium' onClick={handleLogout}>
              Выход
            </Button>
            <p className='text text_type_main-default'>
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
          <div className={s.right}>
            <Outlet />
          </div>
        </div>
      </section>
      {isLogoutRequest && <LoaderLayout />}
    </main>
  );
}

export default ProfilePage;
