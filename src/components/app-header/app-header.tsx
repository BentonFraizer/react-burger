import { JSX } from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.css';

function AppHeader(): JSX.Element {
  return (
    <header className={s['app-header']}>
      <div className={s.container}>
        <Logo />
      </div>
    </header>
  );
}

export default AppHeader;
