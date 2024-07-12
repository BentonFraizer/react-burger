import React, { JSX, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { isEscKeyPressed } from '../../utils/utils';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

const modalContentEl = document.getElementById('modals') as HTMLElement;

function Modal({ title, children, onClose }: ModalProps): JSX.Element {
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
    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [onClose]);

  return (
    createPortal(
      <div className={s.modal} data-cy='modal'>
        <div className={s['modal-wrapper']}>
          <ModalOverlay onClose={onClose} />
          <div className={s['modal-content']}>
            <div className={`${s['modal-header']} mb-4`}>
              <p className='text text_type_main-large'>
                {title}
              </p>
              <div className={s['close-btn']} onClick={handleCloseBtnClick} data-cy='close-modal-btn'>
                <CloseIcon type='primary' />
              </div>
            </div>
            <div className={s['modal-content__wrapper']}>
              {children}
            </div>
          </div>
        </div>
      </div>,
      modalContentEl,
    )
  );
}

export default Modal;
