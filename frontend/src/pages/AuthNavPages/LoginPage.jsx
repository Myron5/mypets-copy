import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

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
  BgContainer,
  Container,
  LoaderPet,
  validateInLoginForm,
  notify,
} from './index';

const LoginPage = () => {
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);

  useEffect(() => {
    if (!error) {
      return;
    }

    notify.error(error.data.message);
  }, [error]);

  return (
    <>
      {isLoading && <LoaderPet />}
      <BgContainer>
        <Container>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validateInLoginForm}
            onSubmit={(values, actions) => {
              const { email, password } = values;
              dispatch(
                austOperationThunk({
                  endpoint: 'login',
                  userInfo: {
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
                <h2 className={css.ContainerForm__Title}>Login</h2>
                <Form className={css.Form} onSubmit={formik.handleSubmit}>
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
                  <button
                    className={css.FormRegister__Button_Login}
                    type="submit"
                  >
                    Login
                  </button>
                  <button
                    className={css.FormRegister__Button_Login_Google}
                    type="button"
                    onClick={() =>
                      dispatch(austOperationThunk({ endpoint: 'google' }))
                    }
                  >
                    <div className={css.Container_GoogleImg}>
                      <FcGoogle size="24px" />
                    </div>
                    <p>Sign in with Google</p>
                  </button>
                  <p className={css.FormRegister__Text}>
                    Don't have an account?
                    <NavLink
                      to={`/register`}
                      className={css.FormRegister__Link}
                    >
                      Register
                    </NavLink>
                  </p>
                </Form>
              </div>
            )}
          </Formik>
        </Container>
      </BgContainer>
    </>
  );
};

export default LoginPage;
