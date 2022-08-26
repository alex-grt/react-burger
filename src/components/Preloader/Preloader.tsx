import preloader from './Preloader.module.css';
import { FC } from 'react';
import ReactDOM from 'react-dom';
import { useAppSelector } from '../../hooks';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

const Preloader: FC = () => {
  const modalRoot = document.querySelector('#modals') as HTMLElement;
  const isOpen: boolean = useAppSelector(store => store.preloader.open);

  return ReactDOM.createPortal(
    <div
      className={`${preloader.preloader} ${
        isOpen && preloader.preloader_opened
      }`}
    >
      <div className={preloader.preloader__substrate}>
        <Logo />
      </div>
    </div>
    , modalRoot
  );
}

export default Preloader;
