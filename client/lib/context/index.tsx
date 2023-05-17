import React, { ReactElement, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { IAppContext } from '../types/index.types';

interface IProviderProps {
  children: ReactElement | ReactElement[];
}

const AppContext = React.createContext({} as IAppContext);

export const AppProvider = (props: IProviderProps) => {
  return (
    <AppContext.Provider value={{}}>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={true}
        theme='light'
        closeButton={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      {props?.children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): IAppContext => useContext(AppContext);
