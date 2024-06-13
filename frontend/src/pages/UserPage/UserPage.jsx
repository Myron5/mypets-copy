import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { fetchMyPets } from 'redux/pets/operations';

import Container from 'components/Container/Container/Container';
import ProfileForm from 'components/ProfileForm/ProfileForm';
import MyPetsList from 'components/Cards/MyPets/MyPetsList/MyPetsList';

import sprite from 'assets/svg/sprite-cards.svg';
import css from 'pages/UserPage/UserPage.module.css';

const AddPetBtn = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyPets());
  }, [dispatch]);

  return (
    <Link state={{ from: location }} className={css.addPetBtn} to="/add-pet">
      Add Pet
      <svg width="24" height="24">
        <use href={`${sprite}#icon-plus-2`}></use>
      </svg>
    </Link>
  );
};

const UserPage = () => {
  return (
    <Container>
      <div className={css.container}>
        <div>
          <h2 className={css.title}> My information: </h2>
          <ProfileForm />
        </div>
        <div className={css.petListBox}>
          <h2 className={css.title}>
            My pets: <AddPetBtn />
          </h2>
          <MyPetsList />
        </div>
      </div>
    </Container>
  );
};

export default UserPage;
