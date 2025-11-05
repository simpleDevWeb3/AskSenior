import { createContext, useContext, useState } from "react";
/* eslint-disable react-refresh/only-export-components */
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(true);

  function logIn() {
    setIsAuth(true);
  }
  function logOut() {
    setIsAuth(false);
  }
  return (
    <AuthContext.Provider value={{ isAuth, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined)
    throw new Error("useAuth is used outside AuthProvider!");
  return ctx;
}

export { AuthProvider, useAuth };
