import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { austOperationThunk } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import ModalVerificeteEmail from 'components/Modals/ModalVerificationEmail/ModalVerificationEmail';
import { loadingSelector } from 'redux/auth/selectors';
import LoaderPet from 'components/LoaderPet/LoaderPet';

const AfterVerifEmail = () => {
  const navigate = useNavigate();
  const { verificationToken } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);

  useEffect(() => {
    dispatch(
      austOperationThunk({
        endpoint: 'verify',
        urlToken: verificationToken,
      })
    );
  }, [dispatch, verificationToken]);
  const handleClose = () => {
    navigate('/');
  };

  const handleSuccess = () => {
    navigate('/notices');
  };

  return (
    <>
      {isLoading && <LoaderPet />}
      <ModalVerificeteEmail
        handleClose={handleClose}
        handleSuccess={handleSuccess}
      />
    </>
  );
};

export default AfterVerifEmail;
