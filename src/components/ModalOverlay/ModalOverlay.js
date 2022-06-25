import './ModalOverlay.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

function ModalOverlay({ children, isOpen, onClose }) {
  const modalRoot = document.querySelector('.page-area');

  function handleClose(evt) {
    evt.target.classList.contains('modal-overlay_opened') && onClose();
  }

  return ReactDOM.createPortal(
    <div
      className={`modal-overlay${isOpen ? ' modal-overlay_opened' : ''}`}
      onClick={handleClose}
    >
      <Modal onClose={onClose}>
        {children}
      </Modal>
    </div>
    , modalRoot
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
