import React, { useEffect, useRef, useState } from 'react';

import Loader from 'components/Loader/Loader';
import defaultAvatar from 'assets/images/Photodefault.jpg';

import sprite from 'assets/svg/sprite-cards.svg';
import css from 'components/ProfileForm/AvatarUpload/AvatarUpload.module.css';

const CameraSvg = () => {
  return (
    <svg width="24" height="24">
      <use href={`${sprite}#icon-camera`}></use>
    </svg>
  );
};

const ConfirmSvg = () => {
  return (
    <svg width="24" height="24">
      <use href={`${sprite}#icon-confirm`}></use>
    </svg>
  );
};

const RejectSvg = () => {
  return (
    <svg width="24" height="24">
      <use href={`${sprite}#icon-reject`}></use>
    </svg>
  );
};

const AvatarUpload = ({ userFile, isEditing, setImage }) => {
  const fileInputRef = useRef(null);

  const [newFile, setNewFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prevAvatar, setPrevAvatar] = useState(null);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);

  const chooseAvatar = () => {
    fileInputRef.current.click();
  };

  const onChange = e => {
    // const [file] = e.target;
    setIsAvatarChanged(true);
    setNewFile(e.target.files[0] || prevAvatar);
  };

  const onConfirm = () => {
    setImage(preview);
    setPrevAvatar(newFile);
    setIsAvatarChanged(false);
  };

  const onReject = () => {
    setNewFile(prevAvatar);
    setPrevAvatar(null);
    setIsAvatarChanged(false);
  };

  useEffect(() => {
    if (isEditing) {
      setIsAvatarChanged(false);
    } else {
      setNewFile(null);
    }
  }, [isEditing]);

  useEffect(() => {
    const readFileContent = () => {
      if (newFile && isEditing) {
        newFile.preview = URL.createObjectURL(newFile);
        setPreview(newFile);
      } else if (userFile) {
        setPreview({ preview: userFile });
      } else {
        setPreview({ preview: defaultAvatar });
      }
    };

    readFileContent();
  }, [userFile, newFile, isEditing]);

  return (
    <>
      <input
        hidden
        ref={fileInputRef}
        type="file"
        name="file"
        accept="image/jpeg, image/png"
        onChange={onChange}
        disabled={!isEditing || isAvatarChanged}
      />
      <div className={css.img} onClick={chooseAvatar}>
          {preview ? (
            <img
              className={css.avatarUpload}
              src={preview.preview}
              alt="Your new profile avatar"
            />
          ) : (
            <Loader className={css.center} />
          )}
      </div>

      {/* ----------------------------------------------------- */}
      {/* Кнопки загального фото редагування  */}
      {isEditing && (
        <div className={css.photoBtns}>
          {isAvatarChanged ? (
            <>
              {/* Кнопки підтвердження фото  */}
              <button
                type="button"
                className={css.confirmBtn}
                onClick={onConfirm}
              >
                <ConfirmSvg />
              </button>
              <p>Confirm</p>
              <button
                type="button"
                className={css.confirmBtn}
                onClick={onReject}
              >
                <RejectSvg />
              </button>
            </>
          ) : (
            <>
              {/* Кнопка камера  */}
              <button
                type="button"
                className={css.cameraBtn}
                onClick={chooseAvatar}
              >
                <CameraSvg /> Edit photo
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AvatarUpload;
