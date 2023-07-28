import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import customAxios from "../pages/auth/customAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;
  customAxios.defaults.headers.common["Authorization"] = auth?.token;

  //   It will run only once when the app starts,
  // and set the auth state if there is any data in localStorage
  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   [] is a dependency array

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
