import React, { createContext, useContext, useState } from 'react';

const BurgerContext = createContext();
export const useBurgerContext = () => useContext(BurgerContext);

const BurgerProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BurgerContext.Provider
      value={{ menuOpen, setMenuOpen}}
    >
      {children}
    </BurgerContext.Provider>
  );
};

export default BurgerProvider;
