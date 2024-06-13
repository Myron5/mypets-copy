import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@react-hook/media-query';
import { authSelector, userSelector } from 'redux/auth/selectors';
import UserBtn from 'components/Buttons/UserBtn/UserBtn';
import Logout from 'components/Logout/Logout';
import css from './UserNav.module.css';

const UserNav = () => {
  const isAuth = useSelector(authSelector);
  const auth = useSelector(userSelector);
  const isMediumScreen = useMediaQuery('(min-width: 768px)');
  const isBigScreen = useMediaQuery('(min-width: 1280px)');

  return (
    <>
      {isAuth && (
        <div className={css.userNavWrap}>
          {isBigScreen && <Logout />}

          <nav className={css.userNav}>
            <NavLink key={'user'} to={'user'}>
              <UserBtn />
            </NavLink>
            {isMediumScreen &&
              (auth.name ? (
                <p className={css.userName}>{auth.name}</p>
              ) : (
                <p className={css.userName}>Name</p>
              ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default UserNav;
