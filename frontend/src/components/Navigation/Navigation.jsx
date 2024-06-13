import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@react-hook/media-query';
import { authSelector } from 'redux/auth/selectors';
import Nav from './Nav/Nav';
import AuthNav from './AuthNav/AuthNav';
import UserNav from './UserNav/UserNav';
import css from './Navigation.module.css';

const Navigation = () => {
  const isAuth = useSelector(authSelector);
  const isDesktopScreen = useMediaQuery('(min-width: 1280px)');

  return (
    <>
      {isDesktopScreen && (
        <>
          <Nav />
          <div className={css.navigation}>
            {!isAuth ? <AuthNav /> : <UserNav />}
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
