import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { AppRoute } from '../../consts';

type ProtectedRouteProps = {
  onlyForUnAuth?: boolean,
  component: JSX.Element
}

const ProtectedRoute = ({ onlyForUnAuth = false, component }: ProtectedRouteProps): JSX.Element | null => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const user = useAppSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return null;
  }

  if (onlyForUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: AppRoute.main } };
    return <Navigate to={from} />;
  }

  if (!onlyForUnAuth && !user) {
    return <Navigate to={AppRoute.login} state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyForAuth = ProtectedRoute;

type OnlyUnAuthProps = {
  component: JSX.Element
}

export const OnlyForUnAuth = ({ component }: OnlyUnAuthProps) => (
  <ProtectedRoute onlyForUnAuth={true} component={component} />
);
