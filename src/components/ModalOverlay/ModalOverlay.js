import modalOverlay from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ onClose }) {
  function handleClose(evt) {
    evt.target.classList.contains('modalOverlay') && onClose();
  }

  return (
    <div
      className={`${modalOverlay.modalOverlay} modalOverlay`}
      onClick={handleClose}
    />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
