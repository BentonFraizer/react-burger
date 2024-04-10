import React, { JSX } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import s from './forgot-password-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import { AppRoute } from '../../consts';

function ForgotPasswordPage(): JSX.Element {
  const [emailValue, setEmailValue] = React.useState('');
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
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
    </div>
  );
}

export default ForgotPasswordPage;
