import fillingIngredient from './FillingIngredient.module.css';
import { FC, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useDrag, useDrop } from 'react-dnd';
import { CHANGE_BURGER } from '../../services/actions';
import { IDataWithTimestamp } from '../../utils/types';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

interface IFillingIngredientProps {
  data: IDataWithTimestamp;
  index: number;
}

const FillingIngredient: FC<IFillingIngredientProps> = ({ data, index }) => {
  const dispatch = useAppDispatch();
  const { burger } = useAppSelector(store => store.burger);
  const ref = useRef<HTMLLIElement>(null);
  const buns: IDataWithTimestamp[] = burger.filter(
    item => item.type === 'bun' ? item : null
  );
  const filling: IDataWithTimestamp[] = burger.filter(
    item => item.type !== 'bun' ? item : null
  );

  function moveItem(dragIndex: number, hoverIndex: number) {
    const dragItem = filling[dragIndex];
    const hoverItem = filling[hoverIndex];
    filling[dragIndex] = hoverItem;
    filling[hoverIndex] = dragItem;

    dispatch({
      type: CHANGE_BURGER,
      burger: [...buns, ...filling]
    });
  };

  const [{ isDrag }, drag] = useDrag({
    type: 'filling',
    item: { index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'filling',
    hover: (item: { index: number }, monitor: any) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (!ref.current) return;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  drag(drop(ref));

  function handleDelete() {
    dispatch({
      type: CHANGE_BURGER,
      burger: burger.filter(item => item.timeId === data.timeId ? null : item)
    });
  }

  return (
    <li
      className={`${fillingIngredient.burger__ingredient} ${
        isDrag && fillingIngredient.burger__ingredient_dragged
      }`}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={handleDelete}
      />
    </li>
  );
};

export default FillingIngredient;
