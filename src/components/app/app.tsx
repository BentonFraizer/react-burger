import React, { JSX } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { MainPage } from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.main} element={<MainPage />} />
        <Route path={AppRoute.login} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
