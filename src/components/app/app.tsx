import React from 'react';
import s from './app.module.css';
import AppHeader from '../app-header/app-header';

function App() {
  return (
    <div className={s.app}>
      <AppHeader />
    </div>
  );
}

export default App;
