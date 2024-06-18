import React, { JSX, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import AllOrdersPage from '../../pages/all-orders-page/all-orders-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/actions/ingredients';
import { useAppDispatch } from '../../hooks/hooks';
import IngredientInfoPage from '../../pages/ingredient-info-page/ingredient-info-page';
import { checkUserAuth } from '../../services/actions/user';
import { OnlyForAuth, OnlyForUnAuth } from '../protected-route/protected-route';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OrderPage from '../../pages/order-page/order-page';
import OrderDetails from '../order-details/order-details';
import Orders from '../orders/orders';
import UserForm from '../user-form/user-form';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модального окна
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={AppRoute.main} element={<MainPage />} />
        <Route path={AppRoute.ingredient} element={<IngredientInfoPage />} />
        <Route path={AppRoute.login} element={<OnlyForUnAuth component={<LoginPage />} />} />
        <Route path={AppRoute.register} element={<OnlyForUnAuth component={<RegisterPage />} />} />
        <Route path={AppRoute.forgotPassword} element={<OnlyForUnAuth component={<ForgotPasswordPage />} />} />
        <Route path={AppRoute.resetPassword} element={<OnlyForUnAuth component={<ResetPasswordPage />} />} />
        <Route path={AppRoute.allOrders} element={<AllOrdersPage />} />
        <Route path={AppRoute.order} element={<OrderPage />} />
        <Route path={AppRoute.profile} element={<OnlyForAuth component={<ProfilePage />} />}>
          <Route index element={<UserForm />} />
          <Route path={AppRoute.profileOrders} element={<Orders />} />
        </Route>
        <Route path={AppRoute.profileOrder} element={<OnlyForAuth component={<OrderPage />} />} />
        <Route path={AppRoute.notFound} element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={AppRoute.ingredient}
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </ Modal>
            }
          />
          <Route
            path={AppRoute.order}
            element={
              <Modal onClose={handleModalClose}>
                <OrderDetails />
              </ Modal>
            }
          />
          <Route
            path={AppRoute.profileOrder}
            element={
              <OnlyForAuth component={
                <Modal onClose={handleModalClose}>
                  <OrderDetails />
                </ Modal>} />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
