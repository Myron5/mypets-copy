import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from 'components/Header/Header';
import ContainerHeader from 'components/Container/ContainerHeader/ContainerHeader';
import { useBurgerContext } from 'context/BurgerProvider';

const SharedLayout = () => {
  const { menuOpen } = useBurgerContext();

  return (
    <div>
      <ContainerHeader>
        <Header />
      </ContainerHeader>

      {!menuOpen && <Outlet />}
      <ToastContainer />
    </div>
  );
};

export default SharedLayout;
