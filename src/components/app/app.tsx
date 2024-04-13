import React, { JSX, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { MainPage } from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import OrdersListPage from '../../pages/orders-list-page/orders-list-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/actions/ingredients';
import { useAppDispatch } from '../../hooks/hooks';
import IngredientInfoPage from '../../pages/ingredient-info-page/ingredient-info-page';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(getIngredients());
  }, []);

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={AppRoute.main} element={<MainPage />} />
        <Route path={'/ingredients/:id'} element={<IngredientInfoPage />} />
        <Route path={AppRoute.login} element={<LoginPage />} />
        <Route path={AppRoute.register} element={<RegisterPage />} />
        <Route path={AppRoute.forgotPassword} element={<ForgotPasswordPage />} />
        <Route path={AppRoute.resetPassword} element={<ResetPasswordPage />} />
        <Route path={AppRoute.ordersList} element={<OrdersListPage />} />
        <Route path={AppRoute.profile} element={<ProfilePage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </ Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
