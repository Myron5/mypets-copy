import React from 'react';
import { Link } from 'react-router-dom';

import notFoundMob1x from '../../assets/images/cat-404-mob-1x.png';
import notFoundMob2x from '../../assets/images/cat-404-mob-2x.png';
import notFoundTab1x from '../../assets/images/cat-404-tab-1x.png';
import notFoundTab2x from '../../assets/images/cat-404-tab-2x.png';
import notFoundDesk1x from '../../assets/images/cat-404-desk-1x.png';
import notFoundDesk2x from '../../assets/images/cat-404-desk-2x.png';

import sprite from 'assets/svg/sprite-cards.svg';
import css from './PageNotFound.module.css';
import Container from 'components/Container/Container/Container';
import BgContainer from 'components/Container/BgContainer/BgContainer';
import { useMediaQuery } from '@react-hook/media-query';

const PageNotFound = () => {
  const notFoundSmall = useMediaQuery('(max-width: 767px)');
  const notFoundMedium = useMediaQuery(
    '(min-width: 768px) and (max-width: 1279px)'
    );
    const notFoundBig = useMediaQuery('(min-width: 1280px)');
  
  
  return (
    <BgContainer>
    <Container >
      <div className={css.pageNotFound}>
      <p className={css.textError}>
        <span className={css.span}>Ooops! </span>
        This page not found :(
      </p>
      <div className={css.notFoundImg}>
        {notFoundSmall && (
          <>
          <img
          loading="lazy"
          srcSet={(notFoundMob1x, notFoundMob2x)}
          scr={notFoundMob1x}
          alt="not-found-page"
          />
          </>
        )}

        {notFoundMedium && (
          <>
          <img
          loading="lazy"
          srcSet={(notFoundTab1x, notFoundTab2x)}
          scr={notFoundTab1x}
          alt="not-found-page"
          />
          </>
        )}

        {notFoundBig && (
          <>
          <img
          loading="lazy"
          srcSet={(notFoundDesk1x, notFoundDesk2x)}
          scr={notFoundDesk1x}
          alt="not-found-page"
          />
          </>
        )}
      </div>
      <Link to="/">
      <button type='button' className={css.pageNotFoundBtn} onClick="/">To main page
      <svg width="24" height="24">
        <use href={`${sprite}#icon-paw-login`}></use>
      </svg> 
      </button>
      </Link>
      </div>
    </Container>
    </BgContainer>
  );
};

export default PageNotFound;