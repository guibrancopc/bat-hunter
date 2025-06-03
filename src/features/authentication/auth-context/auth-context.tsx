import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { getCurrentUserSession } from 'src/services/authentication-service';
import { UserSessionType } from 'src/services/authentication-service';

export const AuthContext = createContext(
  {} as {
    currentUser: UserSessionType | null;
    setCurrentUser: (v: UserSessionType | null) => void;
  }
);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState(getCurrentUserSession());

  useEffect(() => {
    const localStorageUserData = getCurrentUserSession();
    console.log('localStorageUserData', localStorageUserData);
    console.log('currentUser', currentUser);

    // if (currentUser && !localStorageUserData) {

    // }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
