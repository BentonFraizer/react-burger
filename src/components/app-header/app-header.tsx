import { JSX } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import s from './app-header.module.css';
import NavBtn from '../nav-btn/nav-btn';
import { AppRoute } from '../../consts';
import { useAppSelector } from '../../hooks/hooks';
import { User } from '../../types';

function AppHeader(): JSX.Element {
  const userName = useAppSelector((state) => state.user.user) as User;

  return (
    <header className={s['app-header']}>
      <div className={s.container}>
        <nav>
          <ul className={s['nav-list']}>
            <li>
              <NavBtn
                className={`${s['nav-btn']} `}
                icon={<BurgerIcon type='primary' />}
                to={AppRoute.main}
              >
                Конструктор
              </NavBtn>
            </li>
            <li>
              <NavBtn
                className={s['nav-btn']}
                icon={<ListIcon type='primary' />}
                to={AppRoute.allOrders}
              >
                Лента заказов
              </NavBtn>
            </li>
          </ul>

          <div className={s['logo-wrapper']}>
            <Link to={AppRoute.main}>
              <Logo />
            </Link>
          </div>

          <NavBtn
            className={s['nav-btn']}
            icon={<ProfileIcon type='primary' />}
            to={AppRoute.profile}
          >
            {userName === null ? 'Личный кабинет' : String(userName.name)}
          </NavBtn>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
