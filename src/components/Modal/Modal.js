import modal from './Modal.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

function Modal({ children, isOpen, onClose }) {
  const modalRoot = document.querySelector('#modals');

  React.useEffect(() => {
    const handleEscPress = (evt) => {
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

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.object.isRequired
  ]),
  onClose: PropTypes.func.isRequired
}

export default Modal;
