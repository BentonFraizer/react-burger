// Функция определения нажатия клавиши Escape
export const isEscKeyPressed = (evt: KeyboardEvent) => evt.key === 'Escape' || evt.key === 'Esc';
// Функция для проверки ответа сервера на наличие ошибки
export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return new Error(`Ошибка ${res.status}`);
};

// Функция для запроса данных с сервера. Принимает необходимые аргументы для выполнения корректного запроса.
export const request = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  return checkResponse(res);
};
