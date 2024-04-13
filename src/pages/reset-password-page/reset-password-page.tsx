import React, { JSX } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import s from './reset-password-page.module.css';
import { AppRoute } from '../../consts';

function ResetPasswordPage(): JSX.Element {
  const [passwordValue, setPasswordValue] = React.useState('');
  const [codeValue, setcodeValue] = React.useState('');
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcodeValue(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // здесь планируется написать код для взаимодействия с сервером
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
