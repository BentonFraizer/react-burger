import React, { JSX, useEffect } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import s from './forgot-password-page.module.css';
import { APIRoute, AppRoute } from '../../consts';
import { request } from '../../utils/api';

function ForgotPasswordPage(): JSX.Element {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = React.useState('');

  // Если вспомогательный флаг не установлен, то пользователь не сможет попасть на страницу reset-password.
  // Таким образом, ни с какой другой страницы, кроме forgot-page, войти на страницу reset-password войти будет нельзя.
  useEffect(() => {
    localStorage.setItem('resetPassword', 'true');
  }, []);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const forgotPasswordData = {
      email: emailValue,
    };
    const forgotPasswordOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(forgotPasswordData),
    };
    request(APIRoute.passwordReset, forgotPasswordOptions).then((res) => {
      if (res.success === true) {
        navigate(AppRoute.resetPassword);
      }
    })
      .catch((err) => console.log('Ошибка отправки e-mail: ', err));
  };

  return (
    <main className={s.main}>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <p className='text text_type_main-medium mb-6'>
          Восстановление пароля
        </p>
        <EmailInput
          onChange={onEmailChange}
          value={emailValue}
          name='email'
          placeholder='Укажите e-mail'
          isIcon={false}
          extraClass='mb-6'
        />
        <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20'>
          Восстановить
        </Button>
        <p className='text text_type_main-default'>
          Вспомнили пароль?{' '}
          <Link to={AppRoute.login}>Войти</ Link>
        </p>
      </form>
    </main>
  );
}

export default ForgotPasswordPage;
