import { JSX } from 'react';
import s from './ingredient-details.module.css';
import { Ingredient } from '../../../types';

type IngredientDetailsProps = {
  ingredient: Ingredient;
}

function IngredientDetails({ ingredient }: IngredientDetailsProps): JSX.Element {
  const { image_large: imageLarge, name, calories, proteins, fat, carbohydrates } = ingredient;
  return (
    <div className={s['ingredient-details']}>
      <div className='ingredient-image mb-4'>
        <img src={imageLarge} alt='внешний вид ингредиента' />
      </div>
      <div className='ingredient-name mb-8'>
        <p className='text text_type_main-medium'>
          {name}
        </p>
      </div>
      <ul className={`${s['ingredient-macronutrients']}`}>
        <li className={'macronutrient'}>
          <div className='macronutrient-name mb-2'>
            <p className='text text_type_main-default'>
              Калории, ккал
            </p>
          </div>
          <div className='macronutrient-amount'>
            <p className='text text_type_digits-default'>{calories}</p>
          </div>
        </li>
        <li className={'macronutrient'}>
          <div className='macronutrient-name mb-2'>
            <p className='text text_type_main-default'>
              Белки, г
            </p>
          </div>
          <div className='macronutrient-amount'>
            <p className='text text_type_digits-default'>{proteins}</p>
          </div>
        </li>
        <li className={'macronutrient'}>
          <div className='macronutrient-name mb-2'>
            <p className='text text_type_main-default'>
              Жиры, г
            </p>
          </div>
          <div className='macronutrient-amount'>
            <p className='text text_type_digits-default'>{fat}</p>
          </div>
        </li>
        <li className={'macronutrient'}>
          <div className='macronutrient-name mb-2'>
            <p className='text text_type_main-default'>
              Углеводы, г
            </p>
          </div>
          <div className='macronutrient-amount'>
            <p className='text text_type_digits-default'>{carbohydrates}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
