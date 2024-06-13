import React from 'react';
import css from './Container.module.css';

const Container = ({ children }) => {
  return <div className={css.containerMain}>{children}</div>;
};

export default Container;
