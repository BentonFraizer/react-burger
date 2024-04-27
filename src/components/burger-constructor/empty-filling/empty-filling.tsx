import { JSX } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import s from './empty-filling.module.css';
import { Ingredient } from '../../../types';
import { addConstructorIngredient } from '../../../services/actions/constructor-ingredients';
import { useAppDispatch } from '../../../hooks/hooks';

function EmptyFilling(): JSX.Element {
  const dispatch = useAppDispatch();

  const [{ canDrop }, dropTarget] = useDrop({
    accept: 'filling',
    drop(item: Ingredient) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(addConstructorIngredient(item, uuidv4()));
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });
  const isDraggingClass = canDrop ? s['is-dragging'] : '';

  return <div className={`${s['constructor-element']} ${isDraggingClass} mb-2 mt-2`} ref={dropTarget}>
    <span className={s['constructor-element__row']}>Выберите начинку</span>
  </div>;
}

export default EmptyFilling;
