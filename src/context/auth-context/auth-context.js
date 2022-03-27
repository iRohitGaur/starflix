import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useAxios } from "../../utils";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const { response, operation } = useAxios();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const localToken = localStorage.getItem("starcart-user-token");
      if (localToken) {
        setToken(localToken);
        operation({
          method: "post",
          url: "/api/auth/verify",
          data: { encodedToken: localToken },
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response !== undefined && response.foundUser !== null) {
      setUser(response.foundUser);
    }
  }, [response]);

  const setUserAndToken = (user, token) => {
    if (user === null && token === null) {
      localStorage.removeItem("starflix-user-token");
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
