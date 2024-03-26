/* eslint no-param-reassign: 0 */
import { Ingredient } from '../types';

// Функция определения нажатия клавиши Escape
export const isEscKeyPressed = (evt: KeyboardEvent) => evt.key === 'Escape' || evt.key === 'Esc';

export function generateRandomIngredients(ingredients: Ingredient[], minIngredients: number, maxIngredients: number) {
  const ingredientsCopy = [...ingredients]; // Создаем копию массива ингредиентов
  const bunIndex = ingredientsCopy.findIndex((ingredient) => ingredient.type === 'bun'); // Ищем индекс элемента с типом 'bun'

  // Удаляем элемент 'bun' из копии массива
  if (bunIndex !== -1) {
    ingredientsCopy.splice(bunIndex, 1);
  }

  // Генерируем случайное количество ингредиентов
  const randomIngredientsCount = Math.floor(Math.random() * (maxIngredients - minIngredients + 1)) + minIngredients;

  const resultArray = [];

  // Добавляем элемент 'bun', если он есть
  if (bunIndex !== -1) {
    resultArray.push(ingredients[bunIndex]);
  }

  // Добавляем случайное количество других ингредиентов
  for (let i = 0; i < randomIngredientsCount; i += 1) {
    const randomIndex = Math.floor(Math.random() * ingredientsCopy.length);
    resultArray.push(ingredientsCopy[randomIndex]);
    ingredientsCopy.splice(randomIndex, 1); // Удаляем выбранный ингредиент из копии массива, чтобы избежать повторений
  }

  return resultArray;
}
