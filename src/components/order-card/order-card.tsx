import { JSX } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation } from 'react-router-dom';
import s from './order-card.module.css';
import { Ingredient, Order } from '../../types';
import { useAppSelector } from '../../hooks/hooks';
import { IngredientPreview } from '../ingredient-preview/ingredient-preview';
import { getIngredientImages, getOrderPrice } from '../../utils/utils';

type OrderCardProps = {
  orderInfo: Order;
}

const MAX_INGREDIENTS_PREVIEWS_COUNT = 6;

function OrderCard({ orderInfo }: OrderCardProps): JSX.Element {
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const location = useLocation();
  const { number, createdAt, name, _id } = orderInfo;
  const images = getIngredientImages(ingredients as Ingredient[], orderInfo).reverse();

  const extraIngredientsCount = images.length >= 6 ? images.length - MAX_INGREDIENTS_PREVIEWS_COUNT : images.length;

  return (
    <Link to={`${location.pathname}/${_id}`} state={{ background: location }} className={s.order__link}>
      <div className={s.order__card}>
        <div className={s.order__info}>
          <div className='order__number'>
            <p className='text text_type_digits-default'>#{number}</p>
          </div>
          <div className={s['order__created-date']}>
            <p className='text text_type_main-default'>
              <FormattedDate date={new Date(createdAt)} />
            </p>
          </div>
        </div>
        <div className={s.order__title}>
          <p className='text text_type_main-medium'>
            {name}
          </p>
        </div>
        <div className={s.order__details}>
          <div className={s.ingredients__icons}>
            {images.length <= MAX_INGREDIENTS_PREVIEWS_COUNT
              ? images.map((image) => <IngredientPreview key={uuidv4()} imageSrc={image} />)
              : images.splice(0, MAX_INGREDIENTS_PREVIEWS_COUNT)
                .map((image, index) => {
                  if (index === 0) {
                    return <IngredientPreview key={uuidv4()} imageSrc={image} extraIngredientsCount={extraIngredientsCount}/>;
                  }
                  return <IngredientPreview key={uuidv4()} imageSrc={image} />;
                })
            }
          </div>
          <div className={s.order__price}>
            <p className='text text_type_digits-default mr-2'>{getOrderPrice(ingredients as Ingredient[], orderInfo)}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
