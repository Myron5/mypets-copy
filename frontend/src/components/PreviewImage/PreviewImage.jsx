import React, { useState } from 'react';
import css from './PreviewImage.module.css';

// import { RotatingLines } from 'react-loader-spinner';

const PreviewImage = ({ file, width, height }) => {
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };
  return (
    <>
      {/* <img className={css.previewImg} src={preview} alt={preview} width={width} height={height}/> */}
      {preview ? (
        <img
          className={css.previewPetImg}
          src={preview}
          alt={preview}
          width={width}
          height={height}
        />
      ) : (
        <div className={css.text}>Loading...</div>
      )}
    </>
  );
};

export default PreviewImage;
