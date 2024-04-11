import { JSX, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import s from './ingredient-group.module.css';
import { Ingredient } from '../../../types';
import IngredientsItem from '../ingredients-item/ingredients-item';

type IngredientGroupProps = {
  type: string;
  ingredients: Ingredient[];
  openModal: () => void;
  onGetGroupRef: (ref: HTMLDivElement | null) => void;
};

function IngredientsGroup({ type, ingredients, openModal, onGetGroupRef }: IngredientGroupProps): JSX.Element {
  const groupTitle = { bun: 'Булки', sauce: 'Соусы', main: 'Начинки' }[type];
  const ingredientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onGetGroupRef(ingredientRef.current);
  }, [onGetGroupRef]);

  return (
    <div className={s['ingredients-group']} ref={ingredientRef}>
      <div className={s['ingredients-group__title']}>
        <p className='text text_type_main-medium'>{groupTitle}</p>
      </div>
      <div className={`${s['ingredient-item__container']} pt-6 pl-4 pr-4 pb-10`}>
        {ingredients.map((ingredient) => (
          <Link to={`/ingredients/${ingredient._id}`} key={ingredient._id}>
            <IngredientsItem
              ingredient={ingredient}
              openModal={openModal} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default IngredientsGroup;
