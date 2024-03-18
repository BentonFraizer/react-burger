import { JSX } from 'react';
import s from './ingredient-details.module.css';

type IngredientDetailsProps = {
  imageSrc: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

function IngredientDetails(props: IngredientDetailsProps): JSX.Element {
  const { imageSrc, name, calories, proteins, fat, carbohydrates } = props;
  return (
    <div className={s['ingredient-details']}>
      <div className='ingredient-image mb-4'>
        <img src={imageSrc} alt='внешний вид ингредиента' />
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
