import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBurgerContext } from 'context/BurgerProvider';
import sprite from 'assets/svg/sprite-cards.svg';
import css from './LoginBtn.module.css';


const LoginBtn = () => {
  const { setMenuOpen } = useBurgerContext();
  const navigate = useNavigate();

  const handleClick = () => {
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <button type="button" className={css.loginBtn} onClick={handleClick}>
      Log IN
      <svg width="24" height="24">
        <use href={`${sprite}#icon-paw-login`}></use>
      </svg>
    </button>
  );
};

export default LoginBtn;
