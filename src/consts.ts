export const APIRoute = {
  ingredients: 'ingredients',
  orders: 'orders',
  login: 'auth/login', // Эндпоинт для авторизации пользователя
  register: 'auth/register', // Эндпоинт для регистрации пользователя
  logout: 'auth/logout', // Эндпоинт для выхода из системы
  authToken: 'auth/token', // Эндпоинт для обновления токена
  getUser: 'auth/user',
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
  profileOrders: '/profile/orders',

  // Catalog: '/catalog/page_:pageNumber',
  // Product: '/product/:id',
};

// базовый url
export const BASE_URL = 'https://norma.nomoreparties.space/api/';
