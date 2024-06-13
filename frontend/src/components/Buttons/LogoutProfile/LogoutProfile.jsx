import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from 'redux/auth/thunks';
import ModalApproveAction from 'components/Modals/ModalApproveAction/ModalApproveAction';
import sprite from 'assets/svg/sprite-cards.svg';
import css from 'components/Buttons/LogoutProfile/LogoutProfile.module.css';

const LogoutBtn = ({ setIsOpenModal }) => {
  const handleClick = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <button type="button" className={css.logoutBtn} onClick={handleClick}>
        <svg width="24" height="24">
          <use href={`${sprite}#icon-logout`}></use>
        </svg>
        Log Out
      </button>
    </>
  );
};

const LogoutProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleSuccess = () => {
    dispatch(logoutThunk());
    setIsOpenModal(false);
    navigate('/notices');
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <LogoutBtn setIsOpenModal={setIsOpenModal} />

      {isOpenModal && (
        <ModalApproveAction
          handleSuccess={handleSuccess}
          handleCancel={handleCancel}
          successButtonText={
            <>
              <p>Yes</p>
              <svg width="24" height="24">
                <use href={`${sprite}#icon-logout-white`}></use>
              </svg>
            </>
          }
        >
          <div>
            <p>Already leaving?</p>
          </div>
        </ModalApproveAction>
      )}
    </>
  );
};

export default LogoutProfile;
