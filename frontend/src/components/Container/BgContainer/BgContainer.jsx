import React from 'react';
import css from './BgContainer.module.css';

const BgContainer = ({ children }) => {
  return (
    <>
      <div className={css.bgContainer}>{children}</div>
    </>
  );
};

export default BgContainer;
