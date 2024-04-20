import React, { JSX, useEffect } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import s from './reset-password-page.module.css';
import { APIRoute, AppRoute } from '../../consts';
import { request } from '../../utils/api';

function ResetPasswordPage(): JSX.Element {
  const navigate = useNavigate();
  const [passwordValue, setPasswordValue] = React.useState('');
  const [codeValue, setCodeValue] = React.useState('');
  const isResetPasswordInstalled = localStorage.getItem('resetPassword');

  // Если переход выполнен не со страницы forgot-password (т.е. флаг 'resetPassword' не равен 'true') переадресуем пользователя
  // на страницу '/login'. В противном случае остаёмся на странице и продолжаем процесс восстановления пароля.
  useEffect(() => {
    if (isResetPasswordInstalled !== 'true') {
      navigate(AppRoute.login);
    }

    localStorage.removeItem('resetPassword');
  }, []);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeValue(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resetPasswordData = {
      password: passwordValue,
      token: codeValue,
    };
    const resetPasswordOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetPasswordData),
    };
    request(APIRoute.passwordResetReset, resetPasswordOptions).then((res) => {
      if (res.success === true) {
        navigate(AppRoute.login);
      }
    })
      .catch((err) => console.log('Ошибка восствновления пароля: ', err));
  };

  return (
    <main className={s.main}>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <p className='text text_type_main-medium mb-6'>
          Восстановление пароля
        </p>
        <PasswordInput
          placeholder='Введите новый пароль'
          onChange={onPasswordChange}
          value={passwordValue}
          name='password'
          icon='ShowIcon'
          extraClass='mb-6'
        />
        <Input
          type='text'
          placeholder='Введите код из письма'
          onChange={onCodeChange}
          value={codeValue}
          name='name'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mb-6'
        />
        <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20'>
          Сохранить
        </Button>
        <p className='text text_type_main-default'>
          Вспомнили пароль?{' '}
          <Link to={AppRoute.login}>Войти</ Link>
        </p>
      </form>
    </main>
  );
}

export default ResetPasswordPage;
