import React, { useState } from 'react';
import BasicModal from '../BasicModal';

interface ModalTriggerProps extends React.PropsWithChildren {
  renderModalContent: (closeModal: () => void) => React.ReactNode;
  closeOnOverlayClick?: boolean;
  className?: string;
  classNameModal?: string;
  classNameOverlay?: string;
}

const ModalTrigger: React.FC<ModalTriggerProps> = ({
  renderModalContent,
  closeOnOverlayClick,
  children,
  className = '',
  classNameModal,
  classNameOverlay,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button className={`modal-trigger ${className}`} onClick={openModal}>
        {children}
      </button>
      <BasicModal
        isOpen={isOpen}
        onClose={closeModal}
        closeOnOverlayClick={closeOnOverlayClick}
        classNameModal={classNameModal}
        classNameOverlay={classNameOverlay}
      >
        {renderModalContent(closeModal)}
      </BasicModal>
    </>
  );
};

export default ModalTrigger;
