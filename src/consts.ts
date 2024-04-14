export const APIRoute = {
  ingredients: 'ingredients',
  orders: 'orders',
  register: 'auth/register',
  authToken: 'auth/token',
};

export const AppRoute = {
  main: '/',
  login: '/login',
  register: '/register',
  ingredient: '/ingredients/:id',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  // предполагаемое название ленты заказов
  ordersList: '/orders-list',
  profile: '/profile',

  // Catalog: '/catalog/page_:pageNumber',
  // Product: '/product/:id',
};

// базовый url
export const BASE_URL = 'https://norma.nomoreparties.space/api/';
