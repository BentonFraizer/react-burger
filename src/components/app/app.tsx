import React, { JSX } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { MainPage } from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';

function App(): JSX.Element {
  // В том случае, если здесь необходимо будет работать с хуками из react-router то в таком случае,
  // BrowserRouter нужно выносить выше, в файл index.tsx
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.main} element={<MainPage />} />
        <Route path={AppRoute.login} element={<LoginPage />} />
        <Route path={AppRoute.register} element={<RegisterPage />} />
        <Route path={AppRoute.forgotPassword} element={<ForgotPasswordPage />} />
        <Route path={AppRoute.resetPassword} element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
