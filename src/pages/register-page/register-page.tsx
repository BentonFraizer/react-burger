import React, { JSX } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import s from './register-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import { AppRoute } from '../../consts';

function RegisterPage(): JSX.Element {
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
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
    // здесь планируется написать код для взаимодействия с сервером
  };

  return (
    <div className={s.wrapper}>
      <AppHeader />
      <main className={s.main}>
        <form onSubmit={(e) => onFormSubmit(e)}>
          <p className='text text_type_main-medium mb-6'>
            Регистрация
          </p>
          <Input
            type='text'
            placeholder={'Имя'}
            onChange={onNameChange}
            value={nameValue}
            name='name'
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
          />
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
            Зарегистрироваться
          </Button>
          <p className='text text_type_main-default'>
            Уже зарегистрированы?{' '}
            <Link to={AppRoute.login}>Войти</ Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default RegisterPage;
