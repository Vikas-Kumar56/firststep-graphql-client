import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import jwt from "jwt-decode";
import Loader from "./Loader";
import { log } from "console";

interface Props {
  children: ReactNode;
}

interface User {
  username: string;
  roles: string[];
}

interface AuthContextData {
  saveToken: (token: string) => void;
  clearToken: () => void;
  user: User | null;
}

const AuthContext = React.createContext<AuthContextData | null>(null);

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    if (jwtToken != null && user == null) {
      const decodedToken = jwt<{ sub: string; roles: string[] }>(jwtToken);

      setUser({
        username: decodedToken.sub,
        roles: decodedToken.roles,
      });
    }

    // it should be outside of if condition
    setLoading(false);
  }, []);

  const clearToken = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const saveToken = (token: string) => {
    localStorage.setItem("token", token);
    const decodedToken = jwt<{ sub: string; roles: string[] }>(token);

    setUser({
      username: decodedToken.sub,
      roles: decodedToken.roles,
    });
  };

  const contextValue = useMemo(
    () => ({
      saveToken,
      clearToken,
      user,
    }),
    [user]
  );
  return (
    <AuthContext.Provider value={contextValue}>
      <>
        {loading && <Loader open={loading} />}
        {!loading && <>{children}</>}
      </>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
