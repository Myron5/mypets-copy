import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  css,
  Formik,
  Form,
  TextField,
  PasswordField,
  austOperationThunk,
  useSelector,
  errorSelector,
  loadingSelector,
  modalOpenSelector,
  ModalRegister,
  BgContainer,
  Container,
  LoaderPet,
  validateInRegisterForm,
  notify,
} from './index';

const RegisterPage = () => {
  const error = useSelector(errorSelector);
  const modalOpen = useSelector(modalOpenSelector);
  const isLoading = useSelector(loadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      return;
    }
    notify.error(error.data.message);
  }, [error]);

  const resentEmail = email => {
    dispatch(
      austOperationThunk({ endpoint: 'resent-email', userInfo: { email } })
    );
  };

  return (
    <>
      {isLoading && <LoaderPet />}
      <BgContainer>
        <Container>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validateInRegisterForm}
            onSubmit={async (values, actions) => {
              const { name, email, password } = values;

              dispatch(
                austOperationThunk({
                  endpoint: 'register',
                  userInfo: {
                    name,
                    email,
                    password,
                  },
                  actions,
                })
              );
            }}
          >
            {formik => (
              <div className={css.ContainerForm}>
                <h2 className={css.ContainerForm__Title}>Registration</h2>
                <Form className={css.Form} onSubmit={formik.handleSubmit}>
                  <TextField
                    placeholder="Name"
                    name="name"
                    id="name"
                    type="text"
                  />
                  <TextField
                    placeholder="Email"
                    name="email"
                    id="email"
                    type="text"
                  />
                  <PasswordField
                    placeholder="Password"
                    name="password"
                    id="imgPasswordInput"
                    type="password"
                  />
                  <PasswordField
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    id="imgConfirmPasswordInput"
                    type="password"
                  />
                  <button className={css.FormRegister__Button} type="submit">
                    Registration
                  </button>

                  <p className={css.FormRegister__Text}>
                    Already have an account?
                    <NavLink to={`/login`} className={css.FormRegister__Link}>
                      Login
                    </NavLink>
                  </p>

                  {error && (
                    <p className={css.FormRegister__Text}>
                      Problem with email verify link?
                      <a
                        className={css.FormRegister__Link}
                        onClick={() => resentEmail(formik.values.email)}
                      >
                        Send to email again
                      </a>
                    </p>
                  )}
                </Form>
                {modalOpen && <ModalRegister />}
              </div>
            )}
          </Formik>
        </Container>
      </BgContainer>
    </>
  );
};

export default RegisterPage;
