import React, { useEffect } from 'react';
import css from './ModalAcces.module.css';
import sprite from '../../../assets/svg/sprite-cards.svg';

const ModalAcces = ({ onClose, className, title, id, handleDeleteClick }) => {
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={`${css.modal} ${className}`}>
        <div className={css.modalContent}>
          <button className={css.closeBtn} onClick={onClose}>
            <svg width="14" height="14">
              <use href={`${sprite}#icon-shape`}></use>
            </svg>
          </button>
          <h2 className={css.title}>Delete advertisement?</h2>
          <div className={css.textWrap}>
            <p className={css.text}>
              Are you sure you want to delete?
              <span className={css.title_span}>“{title}”</span> You can't undo
              this action.
            </p>
          </div>
          <div className={css.button_wrap}>
            <button type="button" className={css.cancel_btn} onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className={css.del_btn}
              onClick={() => handleDeleteClick(id)}
            >
              Yes
              <svg width="24" height="24">
                <use href={`${sprite}#icon-trash-2`} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAcces;
