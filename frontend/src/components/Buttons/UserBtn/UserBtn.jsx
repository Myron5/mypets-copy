import React from 'react';
import sprite from 'assets/svg/sprite-cards.svg';
import css from './UserBtn.module.css';

const UserBtn = ({ closeBurgerMenu }) => {
  return (
    <button
      type="button"
      className={css.userBtn}
      onClick={closeBurgerMenu ? closeBurgerMenu : null}
    >
      <svg width="24" height="24">
        <use href={`${sprite}#icon-user-btn-header`}></use>
      </svg>
    </button>
  );
};

export default UserBtn;
