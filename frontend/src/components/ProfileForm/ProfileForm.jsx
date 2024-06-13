import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import AvatarUpload from 'components/ProfileForm/AvatarUpload/AvatarUpload';
import LogoutProfile from 'components/Buttons/LogoutProfile/LogoutProfile';
import LoaderPet from '../LoaderPet/LoaderPet';

import { austOperationThunk } from 'pages/AuthNavPages';
import { userSelector } from 'redux/auth/selectors';

import { instance } from 'service/api/api';
import { validateProfileForm } from 'service/ValidateInForm/ValidateInForm';
import parseDate from 'service/addPetHelpers/parseDate';
import notify from 'service/addPetHelpers/toast';
import preparePutData from 'service/addPetHelpers/preparePutData';

import sprite from 'assets/svg/sprite-cards.svg';
import css from 'components/ProfileForm/ProfileForm.module.css';

const EditCloseBtn = ({ handleOnClick }) => {
  return (
    <button type="button" className={css.editBtn} onClick={handleOnClick}>
      <svg width="24" height="24">
        <use href={`${sprite}#icon-close`}></use>
      </svg>
    </button>
  );
};

const EditBtn = ({ handleOnClick }) => {
  return (
    <button type="button" className={css.editBtn} onClick={handleOnClick}>
      <svg width="24" height="24">
        <use href={`${sprite}#icon-edit`}></use>
      </svg>
    </button>
  );
};

const SaveBtn = () => {
  return (
    <button type="submit" className={css.saveBtn}>
      Save
    </button>
  );
};

const initVal = {
  name: '',
  email: '',
  city: '',
  phone: '',
  birthday: '',
  avatar: null,
};

const ProfileForm = () => {
  const dispatch = useDispatch();
  const currentUserData = useSelector(userSelector);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initVal);
  const [isUserDataPending, setIsUserDataPending] = useState(true);

  const handleOnEdit = () => {
    setIsEditing(true);
  };

  const handleOnEditClose = resetForm => {
    return () => {
      setIsEditing(false);
      resetForm();
    };
  };

  const onSubmit = async values => {
    setIsUserDataPending(true);
    try {
      const { avatar, ...putData } = parseDate(values);
      await instance.put('/users', preparePutData(putData));

      if (avatar && typeof avatar !== 'string') {
        const formData = new FormData();
        formData.append('avatar', avatar);
        await instance.put('/users/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
    } catch (error) {
      const message = error.response.data.message;
      notify.error(message);
    } finally {
      setUserData(initVal);
      dispatch(austOperationThunk({ endpoint: 'current' }));
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setUserData(prev => ({ ...prev, ...parseDate(currentUserData) }));
  }, [currentUserData]);

  useEffect(() => {
    if (userData.name) {
      setIsUserDataPending(false);
    }
  }, [userData]);

  if (isUserDataPending) {
    return (
      <div className={css.boxSimulation}>
        <LoaderPet />
      </div>
    );
  }

  return (
    <Formik
      initialValues={userData}
      validationSchema={validateProfileForm}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form className={css.section}>
          <div className={css.boxInputs}>
            <div className={css.avatar}>
              <AvatarUpload
                userFile={userData.avatar}
                isEditing={isEditing}
                setImage={value => setFieldValue('avatar', value)}
              />
              <ErrorMessage name="photo" component="div" />
            </div>

            <div className={css.profileInput}>
              <div className={css.item}>
                <div className={css.flexContainer}>
                  <label htmlFor="name" className={css.label}>
                    Name:
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className={css.input}
                    disabled={!isEditing}
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.ErrorMessage}
                />
              </div>

              <div className={css.item}>
                <div className={css.flexContainer}>
                  <label htmlFor="email" className={css.label}>
                    Email:
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className={css.input}
                    disabled={true}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.ErrorMessage}
                />
              </div>

              <div className={css.item}>
                <div className={css.flexContainer}>
                  <label htmlFor="birthday" className={css.label}>
                    Birthday:
                  </label>
                  <Field
                    className={css.input}
                    name="birthday"
                    id="birthday"
                    type="date"
                    placeholder="00.00.0000"
                    disabled={!isEditing}
                  />
                </div>
                <ErrorMessage
                  name="birthday"
                  component="div"
                  className={css.ErrorMessage}
                />
              </div>

              <div className={css.item}>
                <div className={css.flexContainer}>
                  <label htmlFor="phone" className={css.label}>
                    Phone:
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    id="phone"
                    maxLength="12"
                    className={css.input}
                    disabled={!isEditing}
                    placeholder="+380000000000"
                  />
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={css.ErrorMessage}
                />
              </div>

              <div className={css.item}>
                <div className={css.flexContainer}>
                  <label htmlFor="city" className={css.label}>
                    City:
                  </label>
                  <Field
                    type="text"
                    name="city"
                    id="city"
                    className={css.input}
                    disabled={!isEditing}
                    placeholder="Kyiv"
                  />
                </div>
                <ErrorMessage
                  name="city"
                  component="div"
                  className={css.ErrorMessage}
                />
              </div>

              {/* Кнопка Save  */}
              {isEditing && (
                <div className={css.item}>
                  <div className={css.flexContainer}>
                    <SaveBtn />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Загальне редагування  */}
          {!isEditing && <EditBtn handleOnClick={handleOnEdit} />}
          {isEditing && (
            <EditCloseBtn handleOnClick={handleOnEditClose(resetForm)} />
          )}

          {/* Кнопка Log out */}
          {!isEditing && <LogoutProfile />}
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
