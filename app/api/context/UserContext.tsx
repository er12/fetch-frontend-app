// context/UserContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type UserContextType = {
  userName: string | null;
  setUserName: (name: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserNameState] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserNameState(storedName);
    setIsHydrated(true);
  }, []);
  
  
  const setUserName = (name: string |null) => {
    setUserNameState(name);
    if (name === null) {
      localStorage.removeItem('userName');
      return;
    }
    localStorage.setItem('userName', name);
  };

  if (!isHydrated) return null; 
  
  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used inside UserProvider');
  return context;
};
