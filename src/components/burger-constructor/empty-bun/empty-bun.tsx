import { JSX } from 'react';
import { useDrop } from 'react-dnd';
import s from './empty-bun.module.css';
import { addConstructorBun, replaceConstructorBun } from '../../../services/actions/constructor-ingredients';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Ingredient } from '../../../types';

type EmptyBunProps = {
  type: 'top' | 'bottom';
}

function EmptyBun({ type }: EmptyBunProps): JSX.Element {
  const dispatch = useAppDispatch();
  const cn = type === 'top' ? s['constructor-element_pos_top'] : s['constructor-element_pos_bottom'];
  const currentBun = useAppSelector((state) => state.constructorIngredients.bun);

  // const onDropHandler = (uniqueIdIngredient: Ingredient) => {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   dispatch(deleteConstructorBun());
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   dispatch(addConstructorBun(uniqueIdIngredient));
  // };

  const [, dropTarget] = useDrop({
    accept: 'bun',
    drop(item: Ingredient) {
      if (currentBun !== null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(replaceConstructorBun(item));
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(addConstructorBun(item));
      }
    },
  });

  return <div className={`${s['constructor-element']}  ${cn}`} ref={dropTarget}>
    <span className={s['constructor-element__row']}>Выберите булки</span>
  </div>;
}

export default EmptyBun;
