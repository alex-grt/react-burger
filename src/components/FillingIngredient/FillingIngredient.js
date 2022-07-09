import fillingIngredient from './FillingIngredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { CHANGE_BURGER } from '../../services/actions';
import { dataStructure } from '../../utils/types';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';

function FillingIngredient({ data, index }) {
  const dispatch = useDispatch();
  const { burger } = useSelector(store => store.burger);
  const ref = useRef(null);
  const buns = burger.filter(item => item.type === 'bun' ? item : null);
  const filling = burger.filter(item => item.type !== 'bun' ? item : null);

  function moveItem(dragIndex, hoverIndex) {
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
    hover: (item, monitor) => {
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

  const dragDropRef = drag(drop(ref));

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
      ref={dragDropRef}
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

FillingIngredient.propTypes = {
  data: PropTypes.shape({
    ...dataStructure,
    timeId: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
}

export default FillingIngredient;
