import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import petsMobile1x from '../../../assets/images/bg-pets-mobile-1x-opt.png';
import petsMobile2x from '../../../assets/images/bg-pets-mobile-2x-opt.png';
import petsTablet1x from '../../../assets/images/bg-pets-tablet-1x-opt.png';
import petsTablet2x from '../../../assets/images/bg-pets-tablet-2x-opt.png';
import petsDesktop1x from '../../../assets/images/bg-pets-desktop-1x-opt.png';
import petsDesktop2x from '../../../assets/images/bg-pets-desktop-2x-opt.png';
import BgContainer from 'components/Container/BgContainer/BgContainer';
import css from './MainPage.module.css';

const MainPage = () => {
  const isSmallScreen = useMediaQuery('(max-width: 767px)');
  const isMediumScreen = useMediaQuery(
    '(min-width: 768px) and (max-width: 1279px)'
  );
  const isBigScreen = useMediaQuery('(min-width: 1280px)');

  return (
    <BgContainer>
      {isSmallScreen && (
        <>
          <h1 className={css.textMainPage}>
            Take good care of your small pets
          </h1>
          <img
            srcSet={(petsMobile1x, petsMobile2x)}
            src={petsMobile1x}
            alt="pets"
          />
        </>
      )}
      {isMediumScreen && (
        <>
          <h1 className={css.textMainPage}>
            Take good care of your small pets
          </h1>
          <img
            srcSet={(petsTablet1x, petsTablet2x)}
            src={petsTablet1x}
            alt="pets"
          />
        </>
      )}

      {isBigScreen && (
        <div className={css.bgWrap}>
          <h1 className={css.textMainPage}>
            Take good care of your small pets
          </h1>

          <img
            loading="lazy"
            srcSet={(petsDesktop1x, petsDesktop2x)}
            src={petsDesktop1x}
            alt="pets"
            align="right"
            className={css.imgPets}
          />
        </div>
      )}
    </BgContainer>
  );
};

export default MainPage;
