import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { css } from '../../pages/AuthNavPages/index';
export const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={field.name} />
      <input
        className={
          meta.touched && meta.error
            ? css.ErrorTextInput
            : css.ContainerForm__Imput
        }
        autoComplete="off"
        {...field}
        {...props}
      />
      <ErrorMessage
        component={'div'}
        name={field.name}
        className={css.ErrorText}
      />
    </>
  );
};

export default TextField;
