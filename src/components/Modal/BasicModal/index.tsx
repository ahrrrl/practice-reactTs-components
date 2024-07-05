import React from 'react';
import ReactDOM from 'react-dom';
import './defaultStyle.css';

interface BasicModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  classNameModal?: string;
  classNameOverlay?: string;
}

const BasicModal: React.FC<BasicModalProps> = ({
  isOpen,
  onClose,
  closeOnOverlayClick = false,
  children,
  classNameModal = '',
  classNameOverlay = '',
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const modalRoot = document.getElementById('modalRoot');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className={`modal-overlay ${classNameOverlay}`}
        onClick={handleOverlayClick}
      />
      <div className={`modal-container ${classNameModal}`}>{children}</div>
    </>,
    modalRoot
  );
};

export default BasicModal;
