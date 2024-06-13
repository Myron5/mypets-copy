import React from 'react';
import { createPortal } from 'react-dom';
import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

function LoaderPortal({ strokeColor = '#54ADFF' }) {
 
  return createPortal(
    <div className={css.overlay}>
      <RotatingLines
        strokeColor={strokeColor}
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>,
    document.body
  );
}

export default LoaderPortal;
