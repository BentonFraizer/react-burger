import { APIRoute, BASE_URL } from '../consts';

// создаем функцию проверки ответа на `ok`
// не забываем выкидывать ошибку, чтобы она попала в `catch`
const checkResponse = (res: Response) => (res.ok ? res.json() : res.json().then((err) => Promise.reject(err)));

// создаем функцию проверки на `success`
const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
// а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
export const request = (endpoint: string, options?: RequestInit) => fetch(`${BASE_URL}${endpoint}`, options)
  .then(checkResponse)
  .then(checkSuccess);

// Пока не разобрался с кодом ниже.
export const refreshToken = () => fetch(`${BASE_URL}${APIRoute.authToken}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify({
    token: localStorage.getItem('refreshToken'),
  }),
}).then(checkResponse);

type ExtendedHeadersInit = HeadersInit & { authorization?: string };

export const fetchWithRefresh = async (url: string, options?: RequestInit & { headers?: ExtendedHeadersInit }) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); // обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      if (options && options.headers) {
        // eslint-disable-next-line no-param-reassign
        options.headers.authorization = refreshData.accessToken;
      }
      const res = await fetch(url, options); // повторяем запрос
      return checkResponse(res);
      // eslint-disable-next-line no-else-return
    } else {
      return Promise.reject(err);
    }
  }
};
