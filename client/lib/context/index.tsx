import React, { ReactElement, useContext } from 'react';
import { IAppContext } from '../types';

interface IProviderProps {
  children: ReactElement | ReactElement[];
}

const AppContext = React.createContext({} as IAppContext);

export const AppProvider = (props: IProviderProps) => {
  return (
    <AppContext.Provider value={{}}>{props?.children}</AppContext.Provider>
  );
};

export const useGlobalContext = (): IAppContext => useContext(AppContext);
