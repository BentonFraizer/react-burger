import { BASE_URL } from '../consts';
// Функция определения нажатия клавиши Escape
export const isEscKeyPressed = (evt: KeyboardEvent) => evt.key === 'Escape' || evt.key === 'Esc';

// создаем функцию проверки ответа на `ok`
const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(`Ошибка ${res.status}`);
};

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
export const request = (endpoint: string, options?: any) => fetch(`${BASE_URL}${endpoint}`, options)
  .then(checkResponse)
  .then(checkSuccess);
