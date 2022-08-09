import preloader from './Preloader.module.css';
import { FC } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { TStore } from '../../utils/types';

const Preloader: FC = () => {
  const modalRoot = document.querySelector('#modals') as HTMLElement;
  const isOpen: boolean = useSelector((store: TStore) => store.preloader.open);

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
