import React from 'react';
import {  useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PlusIcon } from '../../assets/svg/plus.svg';
import { ReactComponent as PlusSmallIcon } from '../../assets/svg/plus-small.svg';
import style from './AddPetButton.module.scss';

import { authSelector } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';

const AddPetButton = ({ modalOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useSelector(authSelector);

  const handelClick = () => {
    if (!isAuth) {
      modalOpen(true);
      return;
    }
    navigate('/add-pet', {state: {from: location} });
  };

  return (
    <button
      type="button"
      state={{ from: location }}
      className={style.button}
      onClick={() => handelClick()}
    >
      <PlusIcon className={style.iconBig} width={24} height={24} />
      <span className={style.label}>Add Pet</span>
      <PlusSmallIcon className={style.iconSmall} width={24} height={24} />
    </button>
  );
};

export default AddPetButton;
