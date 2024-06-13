import React from 'react';
import sprite from 'assets/svg/sprite-cards.svg';
import css from './LogoutBtn.module.css';

const LogoutBtn = ({ setIsOpenModal }) => {
  const handleClick = () => {
    setIsOpenModal(true);
  };

  return (
    <button type="button" className={css.logoutBtn} onClick={handleClick}>
      Log out
      <svg width="24" height="24">
        <use href={`${sprite}#icon-logout-white`} />
      </svg>
    </button>
  );
};

export default LogoutBtn;
