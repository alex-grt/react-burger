import modal from './Modal.module.css';
import { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

interface IModalProps {
  children: ReactNode;
  isOpen: boolean | object;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, isOpen, onClose }) => {
  const modalRoot = document.querySelector('#modals') as HTMLElement;

  useEffect(() => {
    const handleEscPress = (evt: KeyboardEvent) => {
      evt.key === 'Escape' && onClose();
    }

    document.addEventListener('keydown', handleEscPress);

    return () => document.removeEventListener('keydown', handleEscPress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <div className={`${modal.modalArea} ${isOpen ? modal.modalArea_opened : ''}`}>
      <ModalOverlay onClose={onClose} />
      <div className={`${modal.modal} p-10`}>
        <div className={modal.modal__cover} aria-label="закрыть">
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
    , modalRoot
  );
}

export default Modal;
