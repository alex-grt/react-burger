import preloader from './Preloader.module.css';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function Preloader() {
  const modalRoot = document.querySelector('#modals');
  const isOpen = useSelector(store => store.preloader.open);

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
