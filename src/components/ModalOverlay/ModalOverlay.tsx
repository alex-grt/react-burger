import modalOverlay from './ModalOverlay.module.css';
import { FC } from 'react';

interface IModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  return (
    <div
      className={modalOverlay.modalOverlay}
      onClick={onClose}
    />
  );
}

export default ModalOverlay;
