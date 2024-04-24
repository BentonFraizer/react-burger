import React, { JSX } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import s from './login-page.module.css';
import { AppRoute } from '../../consts';
import { login } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Loader from '../../components/loader/loader';
import useForm from '../../hooks/useForm';

function LoginPage(): JSX.Element {
  const isLoginRequest = useAppSelector((state) => state.user.loginRequest);
  const dispatch = useAppDispatch();

  // Инициализация состояния значений полей ввода
  const initialFormValues = {
    email: '',
    password: ''
  };

  // Использование кастомного хука useForm
  const { values, handleChange } = useForm(initialFormValues);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registeredUserData = {
      email: values.email,
      password: values.password,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(login(registeredUserData));
  };

  return (
    <main className={s.main}>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <p className='text text_type_main-medium mb-6'>
          Вход
        </p>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name='email'
          placeholder='E-mail'
          isIcon={false}
          extraClass='mb-6'
        />
        <PasswordInput
          autoComplete='off'
          onChange={handleChange}
          value={values.password}
          name='password'
          icon='ShowIcon'
          extraClass='mb-6'
        />
        <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20' disabled={isLoginRequest}>
          {isLoginRequest ? <Loader small={true}/> : 'Войти'}
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
  );
}

export default LoginPage;
