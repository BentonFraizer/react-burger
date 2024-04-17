import React, { JSX } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import s from './register-page.module.css';
import { APIRoute, AppRoute } from '../../consts';
import { request } from '../../utils/api';
import { setUser } from '../../services/actions/user';
import { useAppDispatch } from '../../hooks/hooks';
import { Register } from '../../types';

function RegisterPage(): JSX.Element {
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const dispatch = useAppDispatch();
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
    const newUserData = {
      email: emailValue,
      password: passwordValue,
      name: nameValue,
    };
    const registerRequest = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    };
    request(APIRoute.register, registerRequest).then((data: Register) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(setUser(data.user));
    })
      .catch((err) => console.log('Ошибка регистрации: ', err));
  };

  return (
    <main className={s.main}>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <p className='text text_type_main-medium mb-6'>
          Регистрация
        </p>
        <Input
          type='text'
          placeholder='Имя'
          onChange={onNameChange}
          value={nameValue}
          name='name'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mb-6'
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
          autoComplete='off'
          onChange={onPasswordChange}
          value={passwordValue}
          name='password'
          icon='ShowIcon'
          extraClass='mb-6'
        />
        <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20'>
          Зарегистрироваться
        </Button>
        <p className='text text_type_main-default'>
          Уже зарегистрированы?{' '}
          <Link to={AppRoute.login}>Войти</ Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;
