import React, { JSX } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { MainPage } from '../../pages/main-page/main-page';

function App():JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
