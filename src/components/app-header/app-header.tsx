import { JSX } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.css';
import NavBtn from "../nav-btn/nav-btn";

function AppHeader(): JSX.Element {
  // Потом сделать переменную состояния с обработкой её в функции getActiveClass. Подставить в NavBtn className
  return (
    <header className={s["app-header"]}>
      <div className={s.container}>
        <nav>
          <ul className={s["nav-list"]}>
            <li>
              <NavBtn className={`${s["nav-btn"]} ${s.active}`} icon={<BurgerIcon type="primary"/>}>
                Конструктор
              </NavBtn>
            </li>
            <li>
              <NavBtn className={s["nav-btn"]} icon={<ListIcon type="primary"/>}>
                Лента заказов
              </NavBtn>
            </li>
          </ul>

          <div className={s["logo-wrapper"]}>
            <Logo/>
          </div>

          <NavBtn className={s["nav-btn"]} icon={<ProfileIcon type="primary"/>}>
            Личный кабинет
          </NavBtn>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
