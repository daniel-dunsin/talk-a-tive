import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { errorRes } from '../api/api-responses';
import { IAppContext } from '../types/index.types';
import { getUser } from '../utilities/localStorage';
import { IChat, IUser } from '../types/states.types';

interface IProviderProps {
  children: ReactElement | ReactElement[];
  user: IUser;
}

const AppContext = React.createContext({} as IAppContext);

export const AppProvider = (props: IProviderProps) => {
  // User States
  const [user, setUser] = useState<IUser | undefined>(getUser());

  const location: any =
    typeof window !== 'undefined' ? window?.location : undefined;

  if (!user && location?.pathname !== '/auth') {
    location?.replace?.('/auth');
    errorRes("You're not authorized to access this route");
  }

  // Chat states
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const [openedChat, setOpenedChat] = useState<IChat | null>(null);

  return (
    <AppContext.Provider
      value={{
        user: user as IUser,
        loadingChat,
        setLoadingChat,
        openedChat,
        setOpenedChat,
      }}
    >
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
