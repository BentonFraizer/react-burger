import React, { JSX } from 'react';
import s from './modal.module.css';
import xmark from '../../images/icons/xmark.png';
import ModalOverlay from './modal-overlay/modal-overlay';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ title, children, onClose }: ModalProps): JSX.Element {
  const handleCloseBtnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

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
