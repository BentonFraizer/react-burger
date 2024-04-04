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
  id: string;
  onDeleteIngredient: (main: UniqueIdIngredient) => void;
}

function DraggableConstructorElement({ main, index, id, onDeleteIngredient }: DraggableConstructorElementProps) {
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useAppDispatch();

  const [, drop] = useDrop<UniqueIdIngredient, void>({
    accept: 'filling',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: UniqueIdIngredient, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.uniqueId;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(moveConstructorIngredient(dragIndex, hoverIndex));

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.uniqueId = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'filling',
    item: () => ({ id, index }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <li key={main.uniqueId} ref={ref} style={{ opacity }}>
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
