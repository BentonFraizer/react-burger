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
