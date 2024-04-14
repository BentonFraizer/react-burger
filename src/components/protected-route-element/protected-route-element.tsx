import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

type ProtectedRouteElementProps = {
  onlyUnAuth: boolean,
  component: JSX.Element
}

const ProtectedRouteElement = ({ onlyUnAuth = false, component }: ProtectedRouteElementProps): JSX.Element | null => {
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

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = ProtectedRouteElement;

type OnlyUnAuthProps = {
  component: JSX.Element
}

export const OnlyUnAuth = ({ component }: OnlyUnAuthProps) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
