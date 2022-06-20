import './Category.css';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient';

function Category({ id, title, data, ...props }) {
  return (
    <li id={id} className="category">
      <h3 className="category__title text text_type_main-medium">
        {title}
      </h3>
      <ul className="category__list pt-6 pb-10 pl-4 pr-4">
        {data.map(item => (
          <Ingredient key={item._id} data={item} {...props} />
        ))}
      </ul>
    </li>
  );
}

export default Category;
