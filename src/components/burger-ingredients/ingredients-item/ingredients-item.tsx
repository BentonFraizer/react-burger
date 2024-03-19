import React, { JSX } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './ingredients-item.module.css';
import Ingredient from '../../../types/ingredient';
import Modal from '../../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useModal } from '../../../hooks/useModal';

type IngredientsItemProps = {
  ingredient: Ingredient;
};

function IngredientsItem({ ingredient }: IngredientsItemProps): JSX.Element {
  const { image, name, price } = ingredient;
  const { isModalOpened, openModal, closeModal } = useModal();

  return (
    <div className={s['ingredient-item']} onClick={openModal}>
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
      {isModalOpened && <Modal title='Детали ингредиента' onClose={closeModal} isModalOpen={isModalOpened}>
        <IngredientDetails
          imageSrc={ingredient?.image_large}
          name={ingredient?.name}
          calories={ingredient?.calories}
          proteins={ingredient?.proteins}
          fat={ingredient?.fat}
          carbohydrates={ingredient?.carbohydrates} />
      </Modal>}
    </div>
  );
}

export default IngredientsItem;
