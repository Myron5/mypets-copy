import React from 'react';
import css from './ContainerHeader.module.css';

const ContainerHeader = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default ContainerHeader;
