import React from 'react';
import s from './modal-overlay.module.css';

type ModalOverlayProps = {
  onClose: () => void;
}

function ModalOverlay({ onClose }: ModalOverlayProps) {
  const handleCloseBtnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className={s['modal-overlay']} onClick={handleCloseBtnClick} />
  );
}

export default ModalOverlay;
