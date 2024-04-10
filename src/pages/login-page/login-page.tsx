import React, { JSX } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import s from './login-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import { AppRoute } from '../../consts';

function LoginPage(): JSX.Element {
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // здесь планируется написать код для взаимодействия с сервером
  };

  return (
    <div className={s.wrapper}>
      <AppHeader />
      <main className={s.main}>
        <form onSubmit={(e) => onFormSubmit(e)}>
          <p className='text text_type_main-medium mb-6'>
            Вход
          </p>
          <EmailInput
            onChange={onEmailChange}
            value={emailValue}
            name='email'
            placeholder='E-mail'
            isIcon={false}
            extraClass='mb-6'
          />
          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name='password'
            icon='ShowIcon'
            extraClass='mb-6'
          />
          <Button htmlType='button' type='primary' size='medium' extraClass='mb-20'>
            Войти
          </Button>
          <p className='text text_type_main-default mb-4'>
            Вы - новый пользователь?{' '}
            <Link to={AppRoute.register}>Зарегистрироваться</ Link>
          </p>
          <p className='text text_type_main-default'>
            Забыли пароль?{' '}
            <Link to={AppRoute.forgotPassword}>Восстановить пароль</ Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
