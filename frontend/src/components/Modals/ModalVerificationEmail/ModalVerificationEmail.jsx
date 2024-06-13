import React, { useEffect } from 'react';
import PawPrintBtn from 'components/Buttons/PawPrintBtn/PawPrintBtn';
import css from './ModalVerificationEmail.module.css';
import sprite from 'assets/svg/sprite-cards.svg';

const ModalVerificeteEmail = ({ handleSuccess, handleClose }) => {
  useEffect(() => {
    const handleEscape = ({ code }) => {
      code === `Escape` && handleClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });
  const handleOverlay = event => {
    event.target === event.currentTarget && handleClose();
  };

  return (
    <div className={css.modalOverlay} onClick={handleOverlay}>
      <div className={css.modalContainer}>
        <div className={css.modalHeader}>
          <button
            type="button"
            className={css.modalCrossBtn}
            onClick={handleClose}
          >
            <svg width="24" height="24">
              <use href={`${sprite}#icon-close`} />
            </svg>
          </button>
        </div>
        <div className={css.modalBody}>
          <div className={css.modalText}>
            <h2 className={css.modalTitle}>Congrats!</h2>
            <p className={css.modalInfo}>Your email has been verified</p>
            <div className={css.modalContainerBtn}>
              <PawPrintBtn
                handleSuccess={handleSuccess}
                title={'Go to pets'}
                type={'button'}
              />
            </div>
          </div>
          <div className={css.modalActions}></div>
        </div>
      </div>
    </div>
  );
};

export default ModalVerificeteEmail;
