import { JSX } from 'react';
import { Link } from 'react-router-dom';
import s from './not-found-page.module.css';
import emptyPlateImg from '../../images/empty-plate.png';
import { AppRoute } from '../../consts';

function NotFoundPage(): JSX.Element {
  return (
    <main className={s.main}>
      <section className={s.section}>
        <img src={emptyPlateImg} alt='empty plate'/>
        <div className={s.message}>
          <p className="text text_type_main-large mt-8 mb-8">
            404
          </p>
          <p className="text text_type_main-medium mb-4">
            Страница не найдена
          </p>
          <p className="text text_type_main-small">
            <Link to={AppRoute.main}>
              Вернуться на главную
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
