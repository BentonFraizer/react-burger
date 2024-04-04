import { JSX } from 'react';
import { useDrop } from 'react-dnd';
import s from './empty-bun.module.css';
import { addConstructorBun } from '../../../services/actions/constructor-ingredients';
import { useAppDispatch } from '../../../hooks/hooks';
import { Ingredient } from '../../../types';

type EmptyBunProps = {
  type: 'top' | 'bottom';
}

function EmptyBun({ type }: EmptyBunProps): JSX.Element {
  const dispatch = useAppDispatch();
  const positionClass = type === 'top' ? s['constructor-element_pos_top'] : s['constructor-element_pos_bottom'];

  const [{ canDrop }, dropTarget] = useDrop({
    accept: 'bun',
    drop(item: Ingredient) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(addConstructorBun(item));
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  const isDraggingClass = canDrop ? s['is-dragging'] : '';

  return <div className={`${s['constructor-element']}  ${positionClass} ${isDraggingClass}`} ref={dropTarget}>
    <span className={s['constructor-element__row']}>Выберите булки</span>
  </div>;
}

export default EmptyBun;
