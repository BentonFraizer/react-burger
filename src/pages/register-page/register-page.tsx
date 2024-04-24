import React, { JSX } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import s from './register-page.module.css';
import { AppRoute } from '../../consts';
import { register } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Loader from '../../components/loader/loader';
import useForm from '../../hooks/useForm';

function RegisterPage(): JSX.Element {
  const isRegisterRequest = useAppSelector((state) => state.user.registerRequest);
  const dispatch = useAppDispatch();

  const initialFormValues = {
    name: '',
    email: '',
    password: '',
  };

  const { values, handleChange } = useForm(initialFormValues);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUserData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(register(newUserData));
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
          onChange={handleChange}
          value={values.name}
          name='name'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass='mb-6'
        />
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
        <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20' disabled={isRegisterRequest}>
          {isRegisterRequest ? <Loader small={true} /> : 'Зарегистрироваться'}
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
