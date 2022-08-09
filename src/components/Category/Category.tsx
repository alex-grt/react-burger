import category from './Category.module.css';
import { forwardRef } from 'react';
import { IData } from '../../utils/types';
import Ingredient from '../Ingredient/Ingredient';

interface ICategoryProps {
  id: string;
  title: string;
  data: IData[];
}

const Category = forwardRef<HTMLLIElement, ICategoryProps>(
  ({ id, title, data }, ref) => {
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

export default Category;
