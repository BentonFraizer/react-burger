import React, { useRef } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import s from './draggable-constructor-element.module.css';
import { UniqueIdIngredient } from '../../../types';
import { useAppDispatch } from '../../../hooks/hooks';
import { moveConstructorIngredient } from '../../../services/actions/constructor-ingredients';

type DraggableConstructorElementProps = {
  main: UniqueIdIngredient;
  index: number;
  onDeleteIngredient: (main: UniqueIdIngredient) => void;
}

function DraggableConstructorElement({ main, index, onDeleteIngredient }: DraggableConstructorElementProps) {
  type ModifiedUniqueIdIngredient = UniqueIdIngredient & { sortIndex: number };
  // Добавляем индекс элементу для дальнейшей корректной обработки элементов во время сортировки
  const modifiedMain: ModifiedUniqueIdIngredient = { ...main, sortIndex: index };
  const sortRef = useRef<HTMLLIElement>(null);
  const dispatch = useAppDispatch();
  const [, dropRef] = useDrop({
    accept: 'sort',
    hover: (item: ModifiedUniqueIdIngredient, monitor) => {
      const dragIndex = item.sortIndex; // Индекс карточки которую перемещает пользователь
      const hoverIndex = index; // Индекс карточки, на которую выполняется наведение

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = sortRef.current?.getBoundingClientRect();
      if (hoverBoundingRect === undefined) {
        return;
      }
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveConstructorIngredient(dragIndex, hoverIndex));

      // eslint-disable-next-line no-param-reassign
      item.sortIndex = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: 'sort',
    item: () => (modifiedMain),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const style = isDragging
    ? { opacity: 0, transition: 'all 0.3s ease-out' }
    : { opacity: 1, transition: 'all 0.3s ease-out' };

  dragRef(dropRef(sortRef));

  return (
    <li ref={sortRef} style={style}>
      <ConstructorElement
        text={main.name}
        price={main.price}
        thumbnail={main.image}
        extraClass={`${s['constructor-element']} mt-2 mb-2`}
        handleClose={() => onDeleteIngredient(main)}
      />
    </li>
  );
}

export default DraggableConstructorElement;
