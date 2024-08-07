import { Ingredient, Order } from '../types';

// Функция определения нажатия клавиши Escape
export const isEscKeyPressed = (evt: KeyboardEvent) => evt.key === 'Escape' || evt.key === 'Esc';

// Функция получения массива ссылок на изображения ингредиентов
export const getIngredientImages = (allIngredients: Ingredient[], order: Order): string[] => {
  const ingredientImages: string[] = [];
  order.ingredients.forEach((ingredientId) => {
    const currentIngredient = allIngredients.find((ingredient) => ingredient._id === ingredientId);
    if (currentIngredient) {
      ingredientImages.push(currentIngredient.image);
    }
  });
  return ingredientImages;
};

// Функция получения стоимости заказа
export const getOrderPrice = (allIngredients: Ingredient[], order: Order): number => {
  let cost = 0;
  order?.ingredients.forEach((ingredientId) => {
    const currentIngredient = allIngredients.find((ingredient) => ingredient._id === ingredientId);
    if (currentIngredient) {
      cost += currentIngredient.price;
    }
  });
  return cost;
};

// Функция для добавления разделителя (пробела) для больших чисел
export const separateNumbers = (priceToCheck: number | null): string | null => {
  if (priceToCheck === null) {
    return null;
  }
  const MIN_VALUE_TO_SEPARATE_ZEROS = 1000;
  if (priceToCheck < MIN_VALUE_TO_SEPARATE_ZEROS) {
    return String(priceToCheck);
  }

  const parts = priceToCheck.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join(' ');
};

// Функция для подсчета количества вхождений в массиве. Т.е. преобразовывает массив строк в объект, где ключом является
// идентификатор ингредиента, а значением - количество раз, которое этот идентификатор встречается в массиве
type CountOccurrencesResult = { [key: string]: number };
export const countOccurrences = (arr: string[] | undefined): CountOccurrencesResult => {        // eslint-disable-line
  if (arr === undefined) {
    return {};
  }

  return arr.reduce((acc: CountOccurrencesResult, ingredientId: string) => {
    acc[ingredientId] = (acc[ingredientId] || 0) + 1;
    return acc;
  }, {});
};
