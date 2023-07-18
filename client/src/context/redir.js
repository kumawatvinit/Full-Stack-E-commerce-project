import { useState, useContext, createContext } from "react";

const RedirectContext = createContext();

const RedirectProvider = ({ children }) => {
    const [redir, setRedir] = useState({
        msg: ""
    });

  return (
    <RedirectContext.Provider value={[redir, setRedir]}>
      {children}
    </RedirectContext.Provider>
  );
};

// custom hook
const useRedirect = () => useContext(RedirectContext);

export { useRedirect, RedirectProvider };