import React, { JSX, useEffect, useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import s from './reset-password-page.module.css';
import { APIRoute, AppRoute } from '../../consts';
import { request } from '../../utils/api';
import Loader from '../../components/loader/loader';
import useForm from '../../hooks/useForm';

function ResetPasswordPage(): JSX.Element {
  const navigate = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);
  const isResetPasswordInstalled = localStorage.getItem('resetPassword');

  // Если переход выполнен не со страницы forgot-password (т.е. флаг 'resetPassword' не равен 'true') переадресуем пользователя
  // на страницу '/login'. В противном случае остаёмся на странице и продолжаем процесс восстановления пароля.
  useEffect(() => {
    if (isResetPasswordInstalled !== 'true') {
      navigate(AppRoute.login);
    }

    localStorage.removeItem('resetPassword');
  }, []);

  const initialFormValues = {
    password: '',
    token: '',
  };

  const { values, handleChange } = useForm(initialFormValues);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRequesting(true);
    const resetPasswordData = {
      password: values.password,
      token: values.token,
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
        setIsRequesting(false);
        navigate(AppRoute.login);
      }
    })
      .catch((err) => {
        setIsRequesting(false);
        console.log('Ошибка восствновления пароля: ', err);
      });
  };

  return (
    <main className={s.main}>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <p className='text text_type_main-medium mb-6'>
          Восстановление пароля
        </p>
        <PasswordInput
          placeholder='Введите новый пароль'
          onChange={handleChange}
          value={values.password}
          name='password'
          icon='ShowIcon'
          extraClass='mb-6'
        />
        <Input
          type='text'
          placeholder='Введите код из письма'
          onChange={handleChange}
          value={values.token}
          name='token'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mb-6'
        />
        <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20' disabled={isRequesting}>
          {isRequesting ? <Loader small={true} /> : 'Сохранить'}
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
