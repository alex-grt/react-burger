import category from './Category.module.css';
import React from 'react';
import { dataStructure } from '../../utils/types';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient';

const Category = React.forwardRef(({ id, title, data }, ref) => {
  return (
    <li id={id} className={category.category} ref={ref}>
      <h3 className={`${category.category__title} text text_type_main-medium`}>
        {title}
      </h3>
      <ul className={`${category.category__list} pt-6 pb-10 pl-4 pr-4`}>
        {data.map(item => (
          <Ingredient key={item._id} data={item} />
        ))}
      </ul>
    </li>
  );
});

Category.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(dataStructure)).isRequired
}

export default Category;
