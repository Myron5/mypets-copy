
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPets, deletePet } from 'redux/pets/operations';
import { getMyPets, getError } from 'redux/pets/selectors';

import noAds1x from '../../../../assets/images/no-ads-img-1x.png';
import noAds2x from '../../../../assets/images/no-ads-img-2x.png';

import MyPetsItem from 'components/Cards/MyPets/MyPetsList/MyPetsItem/MyPetItem';

import css from 'components/Cards/MyPets/MyPetsList/MyPetsList.module.css';

const MyPetsList = () => {
  const dispatch = useDispatch();

  const notices = useSelector(getMyPets);
  const errorMyPets = useSelector(getError);

  

  const onDelete = deleteId => {
    return async () => {
      dispatch(deletePet(deleteId));
    };
  };

  const mapCallBack = ({ id, name, date, type, comments, file }) => (
    <MyPetsItem
      key={id}
      name={name}
      breed={type}
      date={date}
      comments={comments}
      image={file}
      onDelete={onDelete(id)}
    />
  );

  if (errorMyPets) {
    dispatch(fetchMyPets());
  }

  if (notices.length === 0) {
    return (
      <div className={css.centerBox}>
        <img
          className={css.noAdsImg}
          srcSet={(noAds1x, noAds2x)}
          src={noAds1x}
          alt="pets"
        />
      </div>
    );
  }

  return (
    <>
      <ul className={css.list}>{notices.map(mapCallBack)}</ul>
    </>
  );
};

export default MyPetsList;
