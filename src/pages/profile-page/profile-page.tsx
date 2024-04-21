import React from 'react';
import { Outlet } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './profile-page.module.css';
import { AppRoute } from '../../consts';
import { logout } from '../../services/actions/user';
import { useAppDispatch } from '../../hooks/hooks';
// import { useAppDispatch } from '../../hooks/hooks';
// import { request } from '../../utils/api';
// import { Register } from '../../types';
// import { setUser } from '../../services/actions/user';

function ProfilePage() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  // const dispatch = useAppDispatch();
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Код ниже не валидный. Здесь необходимо переделать логику на:
    // получение и подстановку данных
    // и на изменение данных (при отмене вернуть старые (взять из хранилища), при сохранении - отправить на сервер)
    //   const newUserData = {
    //     email: emailValue,
    //     password: passwordValue,
    //     name: nameValue,
    //   };
    //   const registerRequest = {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newUserData),
    //   };
    //   request(APIRoute.register, registerRequest).then((data: Register) => {
    //     localStorage.setItem('accessToken', data.accessToken);
    //     localStorage.setItem('refreshToken', data.refreshToken);
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     dispatch(setUser(data.user));
    //   })
    //     .catch((err) => console.log('Ошибка регистрации: ', err));
  };

  const handleLogout = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(logout());
  };

  const form = <form onSubmit={(e) => onFormSubmit(e)}>
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
    {/* // возможно первую кнопку тоже необходимо реализовать htmlType='submit' или вообще htmlType='reset' */}
    <div className={s.buttons}>
      <Button htmlType='button' type='secondary' size='medium'>
        Отмена
      </Button>
      <Button htmlType='submit' type='primary' size='medium'>
        Сохранить
      </Button>
    </div>
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
            <p className="text text_type_main-default">
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
    </main>
  );
}

export default ProfilePage;
