import { JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import s from './ingredient-details.module.css';
import { Ingredient } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { setIngredientDetails } from '../../../services/actions/ingredient-details';
import Loader from '../../loader/loader';
import { isEscKeyPressed } from '../../../utils/utils';

function IngredientDetails(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const filteredIngredient = (ingredients as Ingredient[]).find((item) => item._id === id);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient>();

  useEffect(() => {
    if (filteredIngredient) {
      setCurrentIngredient(filteredIngredient);
      dispatch(setIngredientDetails(filteredIngredient));
    }
  }, [dispatch, filteredIngredient]);

  useEffect(() => {
    const handleEscKeyPress = (e: KeyboardEvent) => {
      if (isEscKeyPressed(e)) {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  if (!currentIngredient) {
    return (
      <div className={s.loader__wrapper}>
        <Loader />
      </div>
    );
  }

  return (currentIngredient ? <div className={s['ingredient-details']}>
      <div className={`${s['ingredient-image']} mb-4`}>
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
