import React, { JSX, useEffect } from 'react';
import s from './modal.module.css';
import xmark from '../../images/icons/xmark.svg';
import ModalOverlay from './modal-overlay/modal-overlay';
import { isEscKeyPressed } from '../../utils/utils';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  isModalOpen: boolean;
};

function Modal({ title, children, onClose, isModalOpen }: ModalProps): JSX.Element {
  const handleCloseBtnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const handleEscKeyPress = (e: KeyboardEvent) => {
      if (isEscKeyPressed(e)) {
        onClose();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEscKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [isModalOpen]);

  return (
    <div className={s.modal}>
      <div className={s['modal-wrapper']}>
        <ModalOverlay onClose={onClose} />
        <div className={s['modal-content']}>
          <div className={`${s['modal-header']} mb-4`}>
            <p className='text text_type_main-large'>
              {title}
            </p>
            <div className={s['close-btn']} onClick={handleCloseBtnClick}>
              <img src={xmark} alt='крестик закрытия модального окна' />
            </div>
          </div>
          <div className={s['modal-content__wrapper']}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
