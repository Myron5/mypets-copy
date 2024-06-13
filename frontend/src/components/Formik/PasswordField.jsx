import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { css } from '../../pages/AuthNavPages/index';
import sprite from 'assets/svg/sprite-cards.svg';

export const PasswordField = ({ ...props }) => {
  const [field, meta] = useField(props);
  const inputPassword = document.querySelector('#imgPasswordInput');
  const inputConfirmPassword = document.querySelector(
    '#imgConfirmPasswordInput'
  );

  const handelChangeTypeInput = e => {
    const id = e.target.id;
    const inputValue = field.value;

    if (id === 'imgPasswordInput' && inputValue !== '') {
      if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
      } else {
        inputPassword.type = 'password';
      }
    }

    if (id === 'imgConfirmPasswordInput' && inputValue !== '') {
      if (inputConfirmPassword.type === 'password') {
        inputConfirmPassword.type = 'text';
      } else {
        inputConfirmPassword.type = 'password';
      }
    }
  };

  const handelClearInputValue = e => {
    const id = e.target.id;
    switch (id) {
      case 'imgPasswordInput':
        inputPassword.value = '';
        field.value = '';
        break;
      case 'imgConfirmPasswordInput':
        inputConfirmPassword.value = '';
        field.value = '';
        break;
      default:
        return;
    }
  };

  return (
    <>
      <label htmlFor={field.name} />
      <div
        name={field.name}
        className={
          meta.touched && meta.error
            ? css.ErrorPasswordInput
            : css.ImputContainer
        }
      >
        <input
          className={css.ContainerForm__Imput_Password}
          autoComplete="off"
          {...field}
          {...props}
        />
        <button
          type="button"
          onClick={
            meta.touched && meta.error
              ? handelClearInputValue
              : handelChangeTypeInput
          }
          className={css.Button__EyeClosedIcon}
        >
          {
            <>
              <svg id={props.id} width="24" height="24">
                <use
                  href={
                    meta.touched && meta.error
                      ? `${sprite}#icon-cross-small`
                      : `${sprite}#icon-eye-closed`
                  }
                />
              </svg>
            </>
          }
        </button>
      </div>

      <ErrorMessage
        component={'div'}
        name={field.name}
        className={css.ErrorTextPassword}
      />
    </>
  );
};

export default PasswordField;
