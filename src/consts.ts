export const APIRoute = {
  ingredients: 'ingredients',
  orders: 'orders',
  allOrders: 'orders/all', // Эндпоинт для получения заказов всех пользователей на странице "Лента заказов"
  login: 'auth/login', // Эндпоинт для авторизации пользователя
  register: 'auth/register', // Эндпоинт для регистрации пользователя
  logout: 'auth/logout', // Эндпоинт для выхода из системы
  authToken: 'auth/token', // Эндпоинт для обновления токена
  getUser: 'auth/user',
  passwordReset: 'password-reset', // Эндпоинт для отправки email пользователя для восстановления пароля
  passwordResetReset: 'password-reset/reset' // Эндпоинт для установки нового пароля с использованием кода из письма
};

export const AppRoute = {
  main: '/',
  login: '/login',
  register: '/register',
  ingredient: '/ingredients/:id',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  allOrders: '/feed',
  order: '/feed/:number',
  profile: '/profile',
  profileOrders: '/profile/orders',
  profileOrder: '/profile/orders/:number',
  notFound: '*',
};

// базовый url
export const BASE_URL = 'https://norma.nomoreparties.space/api/';

// url для получения заказов всех пользователей на странице "Лента заказов"
export const wsFeedUrl = 'wss://norma.nomoreparties.space/orders/all';

// url для получения заказов залогиненного пользователя во вкладке личного кабинета "История зазказов"
export const wsUserOrdersUrl = 'wss://norma.nomoreparties.space/orders';

export const States = {
  Connecting: 'connecting',
  Disconnecting: 'disconnecting',
  Opened: 'opened',
  Closed: 'closed',
} as const;
