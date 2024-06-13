import React from 'react';
import BgContainer from 'components/Container/BgContainer/BgContainer';
import AddPetForm from 'components/AddPetForm/AddPetForm/AddPetForm';
import Container from 'components/Container/Container/Container';
import { useSelector } from 'react-redux';
import { getIsLoading } from 'redux/pets/selectors';
import LoaderPet from '../../components/LoaderPet/LoaderPet';

function AddPetPage() {
  const isLoading = useSelector(getIsLoading);

  return (
    <>
      {isLoading && <LoaderPet />}
      <BgContainer>
        <Container>
          <AddPetForm />
        </Container>
      </BgContainer>
    </>
  );
}

export default AddPetPage;
