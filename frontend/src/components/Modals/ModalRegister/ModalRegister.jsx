import React, { useEffect } from 'react';
import css from './ModalRegister.module.css';
import PawPrintBtn from 'components/Buttons/PawPrintBtn/PawPrintBtn';
import { useNavigate } from 'react-router-dom';
import sprite from 'assets/svg/sprite-cards.svg';
import { closeModal } from 'redux/auth/slice';
import { useDispatch } from 'react-redux';

const ModalRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate('/notices');
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleEscape = ({ code }) => {
      code === `Escape` && handleSuccess();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });
  const handleOverlay = event => {
    event.target === event.currentTarget && handleSuccess();
  };

  return (
    <div className={css.modalOverlay} onClick={handleOverlay}>
      <div className={css.modalContainer}>
        <div className={css.modalHeader}>
          <button
            type="button"
            className={css.modalCrossBtn}
            onClick={() => dispatch(closeModal())}
          >
            <svg width="24" height="24">
              <use href={`${sprite}#icon-close`} />
            </svg>
          </button>
        </div>
        <div className={css.modalBody}>
          <div className={css.modalText}>
            <h2 className={css.modalTitle}>Congrats!</h2>
            <p className={css.modalInfo}>
              Your profile has been registered. Confirm email on your mail.
            </p>
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

export default ModalRegister;
