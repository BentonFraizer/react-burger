import React, { JSX } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { MainPage } from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.main} element={<MainPage />} />
      <Route path={AppRoute.login} element={<LoginPage />} />
      <Route path={AppRoute.register} element={<RegisterPage />} />
      <Route path={AppRoute.forgotPassword} element={<ForgotPasswordPage />} />
      <Route path={AppRoute.resetPassword} element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
