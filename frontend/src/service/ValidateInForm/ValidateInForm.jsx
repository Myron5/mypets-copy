import * as Yup from 'yup';

export const validateInRegisterForm = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Must be at least 2 characters')
    .max(16, 'Must be 16 characters or less'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,16}$/,
      'The password must consist of numbers and capital letters'
    ),
  confirmPassword: Yup.string()
    .required('Password is required')
    .oneOf([Yup.ref(`password`), null], 'Password must match'),
});

export const validateInLoginForm = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string().required('Password is required'),
});

export const validateProfileForm = Yup.object({
  avatar: Yup.mixed().test(
    'fileSize',
    'Photo must be up to 3MB',
    value => value?.size <= 3000000 || true
  ),
  name: Yup.string()
    .min(2, 'Must be at least 2 letters')
    .max(16, 'Must be less than 16 letters')
    .required('Name is required'),
  email: Yup.string()
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email address'
    )
    .required('Email is required'),
  birthday: Yup.string()
    // .matches(/^\d{2}-\d{2}-\d{4}$/, 'Invalid date')
    .test('date', "Birthday couldn't be in the future", value => {
      if (!value) {
        return true;
      }

      return new Date() - new Date(value) >= 0;
    }),
  phone: Yup.string().matches(
    /^\+\d{11,12}$/,
    'Phone number must be in the format +380XXXXXXXXX'
  ),
  city: Yup.string()
    .min(2, 'Must be at least 2 letters')
    .matches(/^[a-zA-Z]+$/, 'Ivalid city'),
});
