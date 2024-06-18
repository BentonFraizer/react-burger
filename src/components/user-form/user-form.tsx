import React, { useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchWithRefresh } from '../../utils/api';
import { APIRoute } from '../../consts';
import { Register, User } from '../../types';
import { setUser } from '../../services/actions/user';
import s from './user-form.module.css';
import Loader from '../loader/loader';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const SAVE_BTN_STYLES = {
  width: 166,
  display: 'flex',
  justifyContent: 'center',
};

function UserForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user) as User;
  const [nameValue, setNameValue] = React.useState(user.name);
  const [emailValue, setEmailValue] = React.useState(user.email);
  const [passwordValue, setPasswordValue] = React.useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const emptyPassword = '';
  const isInputsHaveChanges = user.name !== nameValue || user.email !== emailValue || emptyPassword !== passwordValue;
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const onFormReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue(emptyPassword);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRequesting(true);
    const updatedUserData = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };
    const refreshRequest = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken') as string,
      },
      body: JSON.stringify(updatedUserData),
    };
    fetchWithRefresh(APIRoute.getUser, refreshRequest).then((data: Register) => {
      setPasswordValue(emptyPassword);
      dispatch(setUser(data.user));
      setIsRequesting(false);
    })
      .catch((err) => {
        setIsRequesting(false);
        console.log('Ошибка обновления данных: ', err);
      });
  };

  return (
    <div className={s.form__wrapper}>
      <form onSubmit={(e) => onFormSubmit(e)} onReset={(e) => onFormReset(e)}>
        <Input
          type='text'
          placeholder='Имя'
          onChange={onNameChange}
          value={nameValue}
          name='name'
          error={false}
          errorText='Ошибка'
          extraClass='mb-6'
          icon='EditIcon'
        />
        <EmailInput
          onChange={onEmailChange}
          value={emailValue}
          name='email'
          placeholder='E-mail'
          isIcon={true}
          extraClass='mb-6'
        />
        <PasswordInput
          autoComplete='off'
          onChange={onPasswordChange}
          value={passwordValue}
          name='password'
          icon='EditIcon'
          extraClass='mb-6'
        />
        {
          isInputsHaveChanges && <div className={s.buttons}>
            <Button htmlType='reset' type='secondary' size='medium'>
              Отмена
            </Button>
            <Button htmlType='submit' type='primary' size='medium' style={SAVE_BTN_STYLES} disabled={isRequesting}>
              {isRequesting ? <Loader small={true} /> : 'Сохранить'}
            </Button>
          </div>
        }
      </form>
    </div>
  );
}

export default UserForm;
