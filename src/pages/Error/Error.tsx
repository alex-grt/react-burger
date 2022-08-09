import error from './Error.module.css';
import { FC } from 'react';

interface IErrorProps {
  name: string;
  text: string;
}

const Error: FC<IErrorProps> = ({ name, text }) => {
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

export default Error;
