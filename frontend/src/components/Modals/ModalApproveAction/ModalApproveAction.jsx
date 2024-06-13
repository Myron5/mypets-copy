import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import sprite from 'assets/svg/sprite-cards.svg';
import css from './ModalApproveAction.module.css';

const ModalApproveAction = ({
  children,
  handleCancel,
  handleSuccess,
  successButtonText,
}) => {
  useEffect(() => {
    const handleEscape = ({ code }) => {
      code === 'Escape' && handleCancel();
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleCancel]);

  const handleOverlay = event => {
    event.target === event.currentTarget && handleCancel();
  };

  return createPortal(
    <div className={css.modalOverlay} onClick={handleOverlay}>
      <div className={css.modalContainer}>
        <div className={css.modalHeader}>
          <button
            type="button"
            className={css.modalCrossBtn}
            onClick={handleCancel}
          >
            <svg width="24" height="24">
              <use href={`${sprite}#icon-close`} />
            </svg>
          </button>
        </div>
        <div className={css.modalBody}>
          <div className={css.modalText}>{children}</div>
          <div className={css.modalActions}>
            <button
              type="button"
              onClick={handleCancel}
              className={css.modalCancelBtn}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSuccess}
              className={css.modalYesBtn}
            >
              {successButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalApproveAction;
