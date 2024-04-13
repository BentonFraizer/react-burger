import { JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import s from './ingredient-details.module.css';
import { Ingredient } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { setIngredientDetails } from '../../../services/actions/ingredient-details';

function IngredientDetails(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const filteredIngredient = (ingredients as Ingredient[]).find((item) => item._id === id);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient>();

  useEffect(() => {
    if (filteredIngredient) {
      setCurrentIngredient(filteredIngredient);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(setIngredientDetails(filteredIngredient));
    }
  }, [dispatch, filteredIngredient]);

  return (currentIngredient ? <div className={s['ingredient-details']}>
      <div className='ingredient-image mb-4'>
        <img src={currentIngredient.image_large} alt='внешний вид ингредиента' />
      </div>
      <div className='ingredient-name mb-8'>
        <p className='text text_type_main-medium'>
          {currentIngredient.name}
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
            <p className='text text_type_digits-default'>{currentIngredient.calories}</p>
          </div>
        </li>
        <li className={'macronutrient'}>
          <div className='macronutrient-name mb-2'>
            <p className='text text_type_main-default'>
              Белки, г
            </p>
          </div>
          <div className='macronutrient-amount'>
            <p className='text text_type_digits-default'>{currentIngredient.proteins}</p>
          </div>
        </li>
        <li className={'macronutrient'}>
          <div className='macronutrient-name mb-2'>
            <p className='text text_type_main-default'>
              Жиры, г
            </p>
          </div>
          <div className='macronutrient-amount'>
            <p className='text text_type_digits-default'>{currentIngredient.fat}</p>
          </div>
        </li>
        <li className={'macronutrient'}>
          <div className='macronutrient-name mb-2'>
            <p className='text text_type_main-default'>
              Углеводы, г
            </p>
          </div>
          <div className='macronutrient-amount'>
            <p className='text text_type_digits-default'>{currentIngredient.carbohydrates}</p>
          </div>
        </li>
      </ul>
    </div> : null
  );
}

export default IngredientDetails;
