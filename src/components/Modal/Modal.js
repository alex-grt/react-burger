import './Modal.css';
import React from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  Box,
  CloseIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function Modal({ children, onClose }) {
  React.useEffect(() => {
    const handleEscPress = (evt) => {
      evt.key === 'Escape' && onClose();
    }

    document.addEventListener('keydown', handleEscPress);

    return () => document.removeEventListener('keydown', handleEscPress);
  }, []);

  return (
    <div className="modal p-10">
      <div className="modal__cover" aria-label="закрыть">
        <CloseIcon type="primary" onClick={onClose} />
      </div>
      {children}
    </div>
  );
}

export default Modal;
