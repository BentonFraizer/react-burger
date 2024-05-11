import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './profile-page.module.css';
import { APIRoute, AppRoute } from '../../consts';
import { logout, setUser } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import LoaderLayout from '../../components/loader-layout/loader-layout';
import { Register, User } from '../../types';
import { fetchWithRefresh } from '../../utils/api';
import Loader from '../../components/loader/loader';

const SAVE_BTN_STYLES = {
  width: 166,
  display: 'flex',
  justifyContent: 'center',
};

function ProfilePage() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLogoutRequest = useAppSelector((state) => state.user.logoutRequest);
  const user = useAppSelector((state) => state.user.user) as User;
  const [nameValue, setNameValue] = React.useState(user.name);
  const [emailValue, setEmailValue] = React.useState(user.email);
  const [passwordValue, setPasswordValue] = React.useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const emptyPassword = '';
  const isInputsHaveChanges = user.name !== nameValue || user.email !== emailValue || emptyPassword !== passwordValue;
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const onFormReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue(emptyPassword);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRequesting(true);
    const updatedUserData = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };
    const refreshRequest = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken') as string,
      },
      body: JSON.stringify(updatedUserData),
    };
    fetchWithRefresh(APIRoute.getUser, refreshRequest).then((data: Register) => {
      setPasswordValue(emptyPassword);
      dispatch(setUser(data.user));
      setIsRequesting(false);
    })
      .catch((err) => {
        setIsRequesting(false);
        console.log('Ошибка обновления данных: ', err);
      });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const form = <form onSubmit={(e) => onFormSubmit(e)} onReset={(e) => onFormReset(e)}>
    <Input
      type='text'
      placeholder='Имя'
      onChange={onNameChange}
      value={nameValue}
      name='name'
      error={false}
      errorText='Ошибка'
      extraClass='mb-6'
      icon='EditIcon'
    />
    <EmailInput
      onChange={onEmailChange}
      value={emailValue}
      name='email'
      placeholder='E-mail'
      isIcon={true}
      extraClass='mb-6'
    />
    <PasswordInput
      autoComplete='off'
      onChange={onPasswordChange}
      value={passwordValue}
      name='password'
      icon='EditIcon'
      extraClass='mb-6'
    />
    {
      isInputsHaveChanges && <div className={s.buttons}>
        <Button htmlType='reset' type='secondary' size='medium'>
          Отмена
        </Button>
        <Button htmlType='submit' type='primary' size='medium' style={SAVE_BTN_STYLES} disabled={isRequesting}>
          {isRequesting ? <Loader small={true} /> : 'Сохранить'}
        </Button>
      </div>
    }
  </form>;

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
            {
              location.pathname === AppRoute.profile
                ? form
                : <Outlet />
            }
          </div>
        </div>
      </section>
      {isLogoutRequest && <LoaderLayout />}
    </main>
  );
}

export default ProfilePage;
