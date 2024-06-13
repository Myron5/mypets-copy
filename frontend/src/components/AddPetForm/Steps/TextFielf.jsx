import React from 'react';
import { ErrorMessage, useField } from 'formik';
import css from './steps.module.css';
export const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        className={meta.touched && meta.error ? css.inputError : css.input}
        {...field}
        {...props}
      />
      <ErrorMessage component={'div'} name={field.name} className={css.error} />
    </>
  );
};

export default TextField;
