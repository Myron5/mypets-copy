import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import noAds1x from '../../../../assets/images/no-ads-img-1x.png';
import noAds2x from '../../../../assets/images/no-ads-img-2x.png';

import { getPets } from 'redux/pets/selectors';

import CategoryItem from './NoticesCategoriesItem/NoticesCategoriesItem';
import css from './NoticesCategoriesList.module.css';

const CategoryList = () => {
  const pets = useSelector(getPets);

  const [renderImg, setRenderImg] = useState(false);
  const itemsTotal = pets.length;

  useEffect(() => {
    if (!pets) {
      return;
    }
    if (itemsTotal < 1) {
      setRenderImg(true);
    } else {
      setRenderImg(false);
    }
  }, [itemsTotal, pets]);

  return (
    <>
      {renderImg ? (
          <img
            className={css.noAdsImg}
            srcSet={(noAds1x, noAds2x)}
            src={noAds1x}
            alt="pets"
          />
      ) : (
        <ul className={css.list}>
          {pets.map(
            ({
              id,
              title,
              file,
              location,
              age,
              sex,
              category,
              noticeId,
              favorite,
              owner,
            }) => (
              <CategoryItem
                key={id}
                id={id}
                title={title}
                file={file}
                location={location}
                age={age}
                sex={sex}
                category={category}
                noticeId={noticeId}
                favorite={favorite}
                owner={owner}
              />
            )
          )}
        </ul>
      )}
    </>
  );
};

export default CategoryList;
