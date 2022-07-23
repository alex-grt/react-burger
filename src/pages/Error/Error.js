import error from './Error.module.css';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  // eslint-disable-next-line no-unused-vars
  Typography
} from '@ya.praktikum/react-developer-burger-ui-components';

function Error({ name, text }) {
  return (
    <section className={error.error}>
      <div className={`${error.error__cover} p-15`}>
        <h2 className={`${error.error__title} text text_type_digits-large pb-10`}>
          {name}
        </h2>
        <p className={`${error.error__text} text text_type_main-medium`}>
          {text}
        </p>
      </div>
    </section>
  );
}

Error.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Error;
