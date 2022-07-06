import { useContext, createContext, useState } from 'react';

interface InitContext {
  activeChangeColumnMarket: boolean;
  setActiveChangeColumnMarket: any;
}
export const GlobalContext = createContext({} as InitContext);

export const GlobalContextProvider = ({ children }) => {
  const [activeChangeColumnMarket, setActiveChangeColumnMarket] =
    useState(true);
  const data: any = {
    activeChangeColumnMarket,
    setActiveChangeColumnMarket,
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
