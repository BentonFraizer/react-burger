import { JSX } from 'react';
import s from './ingredient-group.module.css';
import { Ingredient } from '../../../types';
import IngredientsItem from '../ingredients-item/ingredients-item';

type IngredientGroupProps = {
  type: string;
  ingredients: Ingredient[];
  getCurrentIngredient: (ingredient: Ingredient) => void;
  openModal: () => void;
};

function IngredientsGroup({ type, ingredients, getCurrentIngredient, openModal }: IngredientGroupProps): JSX.Element {
  const groupTitle = { bun: 'Булки', sauce: 'Соусы', main: 'Начинки' }[type];

  return (
    <div className={s['ingredients-group']}>
      <div className={s['ingredients-group__title']}>
        <p className='text text_type_main-medium'>{groupTitle}</p>
      </div>
      <div className={`${s['ingredient-item__container']} pt-6 pl-4 pr-4 pb-10`}>
        {ingredients.map((ingredient) => (
          <IngredientsItem
            key={ingredient._id}
            ingredient={ingredient}
            getCurrentIngredient={getCurrentIngredient}
            openModal={openModal} />
        ))}
      </div>
    </div>
  );
}

export default IngredientsGroup;
