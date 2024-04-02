import React, { JSX } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './ingredients-item.module.css';
import Ingredient from '../../../types/ingredient';
import { useAppDispatch } from '../../../hooks/hooks';
import { setIngredientDetails } from '../../../services/actions/ingredient-details';

type IngredientsItemProps = {
  ingredient: Ingredient;
  openModal: () => void;
};

function IngredientsItem({ ingredient, openModal }: IngredientsItemProps): JSX.Element {
  const { image, name, price } = ingredient;
  const dispatch = useAppDispatch();
  const handleIngredientItemClick = (ingredientData: Ingredient) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(setIngredientDetails(ingredientData));
    openModal();
  };

  return (
    <div className={s['ingredient-item']} onClick={() => handleIngredientItemClick(ingredient)}>
      <div className={`${s['ingredient-item__img']} mb-1`}>
        <img src={image} alt={name} />
      </div>
      <div className={`${s['ingredient-item__price']} mb-1`}>
        <div className={`${s['price-value']} mr-2`}>
          <p className='text text_type_digits-default'>{price}</p>
        </div>
        <div className={s['price-icon']}>
          <CurrencyIcon type='primary' />
        </div>
      </div>
      <div className={s['ingredient-item__name']}>
        <p className='text text_type_main-default'>
          {name}
        </p>
      </div>
      <div className={`${s['ingredient-item__counter']}`}>
        <Counter count={1} size='default' extraClass='m-1' />
      </div>
    </div>
  );
}

export default IngredientsItem;
