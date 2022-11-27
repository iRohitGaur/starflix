import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { LOCAL_STORAGE_TOKEN } from "utils/constants";
import { useAxios } from "../../utils";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const { operation } = useAxios();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const localToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);
      if (localToken) {
        setToken(localToken);
        try {
          const response = await operation({
            method: "post",
            url: "/verify",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localToken}`,
            },
          });
          const user = response.user;
          if (user) {
            setUser(user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUserAndToken = (user, token) => {
    if (user === null && token === null) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    }
    setUser(user);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ token, user, setUserAndToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
