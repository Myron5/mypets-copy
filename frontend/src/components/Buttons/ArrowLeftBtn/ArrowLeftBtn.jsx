import React from 'react';
import css from './ArrowLeftBtn.module.css';
import { HiArrowLeft } from 'react-icons/hi';

const ArrowLeftBtn = ({ title, type, handleBackClick }) => {
  return (
    <button type={type} className={css.btn} onClick={handleBackClick}>
      <HiArrowLeft color="#54ADFF" size="24px" />
      <span>{title}</span>
    </button>
  );
};

export default ArrowLeftBtn;
